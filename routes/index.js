var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection
const { routes } = require('../app');
const User = require('../models/index')
const Upload = require('../middleware/server')
const fs = require('fs')

router.get('/api', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

router.get('/api/photos', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
    
          const imgArray= result.map(element => element._id);
                console.log(imgArray);
    
       if (err) return console.log(err)
       res.send(imgArray)
    
    })
});

router.get('/api/photo/:id', (req, res) => {
    var filename = req.params.id;
    
    db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
    
        if (err) return console.log(err)
    
       res.contentType('image/jpeg');
       res.send(result.image.buffer)
      
       
    })
})


router.post('/api/upload', Upload.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
 
 var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
db.collection('quotes').insertOne(finalImg, (err, result) => {
  	// console.log(result)

    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/api')
  
    
  })
})

module.exports = router;
