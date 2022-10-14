const express = require('express');
const router = express.Router();

const Course = require('../models/Course.model');

router.post('/courses', (req, res, next) => {

  console.log(req.body);


  Course.create({
    name: req.body.name,
    image: req.body.image,
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
    .then(createdCourse => {
      res.json({ message: 'POST courses worked', course: createdCourse });
    })
    .catch(err => res.json(err));

  
});

router.get('/courses', (req, res, next) => {
  
    Course.find()
    // .populate('scorecard')
    .then(foundCourseArray => {
      console.log(foundCourseArray);
      res.json({ message: 'GET courses worked', courses: foundCourseArray });
    })
    .catch(err => res.json(err));
  
});

router.get('/courses/:courseId', (req, res, next) => {

  const { courseId } = req.params;

  Course.findById(courseId)
    .then(foundCourse => {
      res.json({ message: 'GET projects/:courseId worked ' + courseId, course: foundCourse });
    })
    .catch(err => res.json(err));
  
});



router.put('/courses/:courseId', (req, res, next) => {
  const { courseId } = req.params;

  Course.findByIdAndUpdate(courseId, req.body, { new: true })
    .then(updatedCourse => {
      console.log(updatedCourse);
      res.json({ message: 'PUT courses/:courseId worked ' + courseId, course: updatedCourse });
    })
    .catch(err => res.json(err));

});



router.delete('/courses/:courseId', (req, res, next) => {
  const { courseId } = req.params;

  Course.findByIdAndDelete(courseId)
    .then(deletedCourse => {
      Task.deleteMany({ project: courseId }).then(() => {})
      res.json({ message: 'DELETE courses/:courseId worked ' + courseId, course: deletedCourse });
    })
    .catch(err => res.json(err));
  
});

module.exports = router;