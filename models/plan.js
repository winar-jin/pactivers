const mongoose = require('mongoose');

// Plan Schems
const PlanSchema = mongoose.Schema({
    planerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    week: {
        type: Date,
        unique: true,
        default: Date.now
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

const Plan = module.exports = mongoose.model('Plan',PlanSchema);


// find planner by _id
module.exports.findPlannerByid = function(plannerId,callback){
    return this.findOne({planerID:plannerId}).populate('planerID').exec(callback);
}


// Add a Plan
module.exports.addPlan = function(planerID,plan,callback){

}