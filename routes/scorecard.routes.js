const express = require('express');

const { DateTime } = require("luxon");

const mongoose = require('mongoose');

const router = express.Router();



const Scorecard = require('../models/Scorecard.model');
const Course = require('../models/Course.model');
const User = require('../models/User.model');

router.post('/scorecards/:courseId', (req, res, next) => {


  console.log(req.payload)
  console.log(req.payload.username)

  let newScorecard;

  Scorecard.create({
    course: req.params.courseId,
    date: req.body.date,
    hole1: req.body.hole1,
    hole2: req.body.hole2,
    hole3: req.body.hole3,
    hole4: req.body.hole4,
    hole5: req.body.hole5,
    hole6: req.body.hole6,
    hole7: req.body.hole7,
    hole8: req.body.hole8,
    hole9: req.body.hole9,
    hole10: req.body.hole10,
    hole11: req.body.hole11,
    hole12: req.body.hole12,
    hole13: req.body.hole13,
    hole14: req.body.hole14,
    hole15: req.body.hole15,
    hole16: req.body.hole16,
    hole17: req.body.hole17,
    hole18: req.body.hole18
  })
    .then(createdScorecard => {
      console.log(createdScorecard);
      newScorecard = createdScorecard;
      return User.findByIdAndUpdate(req.payload._id, {
        $push: { scorecards: createdScorecard._id }
      }, {
        new: true
      });
    })
    .then(updatedUser => {
      console.log(updatedUser);
      res.json({ message: 'POST scorecards worked', scorecard: newScorecard, user: updatedUser });
    })
    .catch(err => res.json(err));

  
});



router.get('/scorecards', (req, res, next) => {
  
  console.log(req.payload)

  User.findById(req.payload._id)
  .populate({
    path: 'scorecards',
    populate: {
        path: 'course', 
        model: 'Course'
    }
})
    .then(foundUserArray => {
      console.log(foundUserArray);
      foundUserArray.scorecards.sort((a, b) => -a.date.localeCompare(b.date))

      foundUserArray.scorecards.forEach(function (scorecard) {
        scorecard.date = DateTime.fromISO(scorecard.date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)

    })
      res.json({ message: 'GET scorecards worked', user: foundUserArray });
    })
    .catch(err => res.json(err));
  
});

router.get('/scorecards/:scorecardId', (req, res, next) => {

  const { scorecardId } = req.params;

  console.log(scorecardId);

  Scorecard.findById(scorecardId)
    .populate('course')
    .then(foundScorecard => {
      res.json({ message: 'GET scorecards/:scorecardId worked ' + scorecardId, scorecard: foundScorecard });
    })
    .catch(err => res.json(err));
  
});


// router.put('/scorecards/:scorecardId', (req, res, next) => {
//     const { scorecardId } = req.params;
  
//     Scorecard.findByIdAndUpdate(scorecardId, req.body, { new: true })
//       .then(updatedScorecard => {
//         console.log(updatedScorecard);
//         res.json({ message: 'PUT scorecards/:scorecardId worked ' + scorecardId, scorecard: updatedScorecard });
//       })
//       .catch(err => res.json(err));
  
//   });



router.delete('/scorecards/:scorecardId', (req, res, next) => {
    // const { scorecardId } = req.params;
    // Scorecard.findByIdAndDelete(scorecardId)
    //   .then(deletedScorecard => {
    //     Task.deleteMany({ project: scorecardId }).then(() => {})
    //     res.json({ message: 'DELETE scorecards/:scorecardId worked ' + scorecardId, scorecard: deletedScorecard });
    //   })
    //   .catch(err => res.json(err));
    



      let objectId = mongoose.Types.ObjectId(`${req.params.scorecardId}`);

    

      User.findOneAndUpdate({ _id: req.payload._id }, { $pull: { scorecards: objectId } }, { new: true })
      .then((updatedUser) => {
        console.log(updatedUser, 'this is what we want hopefully')
      })


  
  
  
      Scorecard.findByIdAndDelete(req.params.scorecardId)
      .then((updatedUser) => {
        console.log(updatedUser);
      })

  });



  

module.exports = router;