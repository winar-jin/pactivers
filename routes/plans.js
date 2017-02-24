const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const User = require('../models/user');

// add a new plan 
router.post('/add', (req,res,next)=> {
   let newPlan = {
    content: req.body.content,
    score: req.body.score
   };
});

module.exports = router;