var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/index')


/* GET home page. */
router.get('/api', function(req, res, next) {
  // res.render('index', { title: 'UR Mom' });
  res.send({'name': 'hadi'})
});

router.post('/api', function(req, res, next){
  User.create(req.body).then(function(user){
    res.send(user)
  })
  console.log(req.body)

  // res.send({
  //   type: 'POST',
  //   name: req.body.name,
  //   age: req.body.rank,
  //   areYouStraight: req.body.areYouStraight

  // })
})

module.exports = router;
