const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      var name = `IMAGE-SIAKNG-` + Date.now()
      // cb(null, file.fieldname + `-SIAKNG-TEST-` + Date.now())
      cb(null, name)
    }
  })
  
var upload = multer({ storage: storage })
module.exports = upload;