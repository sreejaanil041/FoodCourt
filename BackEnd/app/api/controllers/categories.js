const categoryModel = require('../models/categories');
var multer  = require('multer')

var fileUpload = require('../middlewares/upload');

module.exports = {

    getById: function(req, res, next) {
        console.log(req.body);
        categoryModel.findById(req.params.categoryId, function(err, categoryInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Category found!!!", data:{categories: categoryInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        let categoriesList = [];categoryModel.find({status:1, deleted:0}, function(err, categories){
            if (err){
                next(err);
            } else{
                for (let category of categories) {
                    categoriesList.push({id: category._id, name: category.name, image: category.image, description: category.name});
                }
                res.json({status:"success", message: "Categories list found!!!", data:{categories: categoriesList}});
                
            }
        });
    },

    updateById: function(req, res, next) {
        // var data = {
        //     category: req.body.category,
        //     name: req.body.name,
        //     image:  req.body.image,
        //     description: req.body.description,
        //     created_by: req.body.created_by,
        //     updated_by: req.body.updated_by
        // };
        // categoryModel.findByIdAndUpdate(req.params.categoryId, data, function(err, categoryInfo){
        //     if(err){
        //         next(err);
        //     }else {
        //         res.json({status:"success", message: "Category updated successfully!!!", categories: categoryInfo});
        //     }
        // });
        var upload = multer({
            storage: fileUpload.files.storage(), 
            limits: {
                fileSize: 2000000 // 1000000 Bytes = 1 MB
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(png|jpg)$/)) { 
                    // upload only png and jpg format
                    return cb(new Error('Please upload a Image'))
                }
                cb(undefined, true)
            }
        }).single('image');

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({status: "failed", message: "Something went wrong", error: err});
            } else if (err) {
                res.json({status: "failed", message: "Something went wrong", error: err});
            }else{
                var data = {
                    category: req.body.category,
                    name: req.body.name,
                    image: req.file ? req.file.filename : null,
                    description: req.body.description
                };
                categoryModel.findByIdAndUpdate(req.params.categoryId, data, function(err, categoryInfo){
                    if(err){
                        next(err);
                    }else {
                        res.json({status:"success", message: "Category updated successfully!!!", categories: categoryInfo});
                    }
                });
            }
        });
    },

    deleteById: function(req, res, next) {
        categoryModel.findByIdAndRemove(req.params.categoryId, function(err, categoryInfo){
            if(err){
                next(err);
            }else {
                res.json({status:"success", message: "Category deleted successfully!!!", data:null});
            }
        });
    },

    create: function(req, res, next) {
        var upload = multer({
            storage: fileUpload.files.storage(), 
            limits: {
                fileSize: 2000000 // 1000000 Bytes = 1 MB
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(png|jpg)$/)) { 
                    // upload only png and jpg format
                    return cb(new Error('Please upload a Image'))
                }
                cb(undefined, true)
            }
        }).single('image');

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({status: "failed", message: "Something went wrong", error: err});
            } else if (err) {
                res.json({status: "failed", message: "Something went wrong", error: err});
            }else{
                var saveobj = {
                    category: req.body.category,
                    name: req.body.name,
                    description : req.body.description,
                    image: req.file ? req.file.filename : null,
                }
                categoryModel.create(saveobj, function (err, result) {
                    if(err){
                        next(err);
                    }else{
                        res.json({status: "success", message: "Category added successfully!!!", data: null});
                    }
                });
            }
        });
    }
}
