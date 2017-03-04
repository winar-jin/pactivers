const mongoose = require('mongoose');
const User = require('./user');
// Plan Schems
const PlanSchema = mongoose.Schema({
    planer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    week: {
        weekIndex: Number,
        weekDate: {
            type: Date
        }
    },
    plans: [
        {
            content: {
                type: String
            },
            score: {
                type: Number
            }
        }
    ],
    averageScore: {
        type: Number,
        default: 0
    },
    summaryContent: {
        type: String
    }
});

const Plan = module.exports = mongoose.model('Plan', PlanSchema);

// init By register
module.exports.initByRegister = function (uid, weekdate, callback) {
    let partweek = {
        weekIndex: 1,
        weekDate: weekdate
    };
    let plan = new Plan({
        planer: uid,
        week: partweek
    });
    plan.save(callback);
}


// find planner by _id
module.exports.findPlannerByid = function (planerID, callback) {
    return this
        .findOne({ _id: planerID }).populate('planner')
        .exec(callback);
}


// Add a Plan
module.exports.addPlan = function (uid, plan, callback) {
    // this.findOne({"planer":uid}, {},{sort:{$natural:-1}},(err,plans) => {
    this.findOne({ "planer": uid }).sort({ $natural: -1 }).exec((err, plans) => {
        if (err) throw err;
        plans.plans.push(plan);
        plans.save(callback);
    });
}

// 返回某一用户的最近的一条记录 
module.exports.weekInsert = function (planerId, callback) {
    this.findOne({ "planer": planerId }, {}, { sort: { $natural: -1 } }, callback);
}

// insert the specific weekIndex colletion
module.exports.insertSpecCollection = function(uid,date,weekIndex,callback){
    let partweek = {
        weekIndex: weekIndex,
        weekDate: date
    };
    let plan = new Plan({
        planer: uid,
        week: partweek
    });
    plan.save(callback);
}