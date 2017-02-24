const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const plans = require('./routes/plans');
const router = express.Router();
const nodeSchedule = require('node-schedule');
// Connect to database
mongoose.connect(config.database);

// On error
mongoose.connection.on('error',(err) =>{
    console.log('Database commected error: ' + err);
});

// On Connected
mongoose.connection.on('connected',() => {
    console.log('Connect to the databse ' + config.database);
});

// On Disconnected
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});  

// Create a server
const app = express();

// PortNumber to listen
const port = 3000;

// Cors(Cross-origin resource sharing) MiddleWare 
app.use(cors());

// Static folder MiddleWare : serve static files, such as images, CSS, JavaScript, etc.
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// User route Middleware
app.use('/users',users);

// Plans route Middleware
app.use('/plans',plans);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index Route
app.get('/', (req,res) => {
    res.send("Invalid Endpoint");
});

// Other Route will go to the Phblic folder ,after 'ng build'
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

// Timer Module "node-schedule"
function scheduleCronstyle(){
    var j = nodeSchedule.scheduleJob('0-59 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
    }); 
    setTimeout(() => {
        console.log('定时器取消！');
        j.cancel();
    },6000);
}

scheduleCronstyle();