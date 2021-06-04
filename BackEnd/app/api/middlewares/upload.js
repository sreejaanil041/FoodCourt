var multer = require('multer');
const path = require('path');

module.exports.files = {
    storage:function(){
        var storage = multer.diskStorage({
            // Destination to store image     
            destination: 'public/files', 
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
            }
        })

      return storage;
    },
    allowedFile:function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only  files are allowed!';
            return cb(new Error('Only  files are allowed!'), false);
        }
        cb(null, true);
    }
}