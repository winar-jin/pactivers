const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const User = require('./models/user');
const plans = require('./routes/plans');
const Plan = require('./models/plan');
const router = express.Router();
const schedule = require('node-schedule');
// Connect to database
mongoose.connect(config.database);

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database commected error: ' + err);
});

// On Connected
mongoose.connection.on('connected', () => {
    console.log('Connect to the databse ' + config.database);
});

// Create a server
const app = express();

// PortNumber to listen
const port = 3000;

// Cors(Cross-origin resource sharing) MiddleWare 
app.use(cors());

// Static folder MiddleWare : serve static files, such as images, CSS, JavaScript, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// User route Middleware
app.use('/users', users);

// Plans route Middleware
app.use('/plans', plans);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

// Other Route will go to the Phblic folder ,after 'ng build'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

var autoInsert = schedule.scheduleJob('* * 1 * * *', () => {
    // Plan.weekInsert('58b24ad4f0624720146a3b50',(err,plan) => {
    //     if(err) throw err;
    //     console.log(plan);
    // });
    User.allUser((err, userIds) => {
        if (err) throw err;
        userIds.forEach(userId => {
            Plan.weekInsert(userId, (err, plan) => {
                let date = new Date();
                if (plan) {
                let nowWeekIndex = plan.week.weekIndex;
                    nowWeekIndex += 1;
                    Plan.insertSpecCollection(userId, date, nowWeekIndex, (err, plan) => {
                        if (err) throw err;
                        console.log('Insert success');
                    });
                }else{
                    Plan.initByRegister(userId,date,(err,plan) => {
                        if(err) throw err;
                    });
                }
            });
        });
    });

});
