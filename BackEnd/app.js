const express = require('express');
const path = require('path');
const app = express()
const port = process.env.PORT || 5000
const multer = require('multer')
app.use(express.static('public')); //public folder as static folder


const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/files', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});


const imageUpload = multer({
      storage: imageStorage,
      limits: {
        fileSize: 5000000 // 1000000 Bytes = 1 MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
}) 



app.post('/uploadImage', imageUpload.single('image'), (req, res) => {
     res.send(req.file)
}, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
})
app.get('/', function(req, res){
    res.json({"tutorial" : "Build REST API with node.js"});
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
