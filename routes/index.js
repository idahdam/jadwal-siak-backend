var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection
var ObjectId = mongoose.Types.ObjectId();
// const { routes } = require('../app');
const User = require('../models/index')
const Upload = require('../middleware/server')
const fs = require('fs')

router.get('/api', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');    
});

router.post('/api/upload', async (req, res) => {
    try {
      const newImage = new User({
        imageUrl: req.body.imageUrl
      });
      await newImage.save();
      res.json(newImage.imageUrl);
    } catch (err) {
      console.error('Something went wrong', err);
    }
});

router.get('/api/getLatest', async (req, res) => {
    const getImage = await User.findOne().sort({ _id: -1 });
    res.json(getImage.imageUrl);
});

module.exports = router;
