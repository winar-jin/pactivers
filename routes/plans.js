const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const User = require('../models/user');

// add a new plan 
router.post('/addPlan', (req,res,next)=> {
   let userId = req.body.plannerId;
   let plan = req.body.plan;
   Plan.addPlan(userId,plan,(err,plans) => {
    if(err){
        res.json({success: false,msg:'update Error'});
    } else {
        res.json({success:true,msg:'update success'});
    }
     
   });
});

// get Plans By UserId
router.post('/getplans',(req,res,next) => {
    let userId = req.body.userId;
    // if(userId.length !== 24){
    //     res.json({success: false,msg:"please pass a right userid"});
    //     return ;
    // }
    Plan.weekInsert(userId,(err,item) => {
        if(err) throw err;
        if(item){
            res.json({success: true,plans:item});
        }else{
            res.json({success:false,msg:"don't have this user's info"});
            return ;
        }
    });
});

module.exports = router;