const productModel = require('../models/products');
var multer  = require('multer')

var fileUpload = require('../middlewares/upload');

module.exports = {

    getById: function(req, res, next) {
        productModel.findById(req.params.productId, function(err, productInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Product found!!!", data:{products: productInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        let productsList = [];

        productModel.find({status:1, deleted:0}).populate({path: 'category_id', select:['name', 'category']}).exec(function(err, products){
            if (err){
                next(err);
            } else{
                for (let product of products) {
                    productsList.push({
                        id: product._id,
                        name: product.name,
                        image: (product.image != null) ? "/files/"+product.image : null,
                        short_description: product.short_description,
                        description: product.description,
                        amount: product.amount,
                        discount_percentage: product.discount_percentage,
                        net_amount: product.net_amount,
                        order_count: product.order_count
                    });
                }
                res.json({status:"success", message: "Products list found!!!", data:{products: products}});
                
            }
        });
    },

    updateById: function(req, res, next) {
        var upload = multer({
            storage: fileUpload.files.storage(), 
            limits: {
                fileSize: 2000000 // 1000000 Bytes = 1 MB
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(png|jpg)$/)) { 
                    // upload only png and jpg format
                    return res.json({status: "failed", message: "Please upload a Image"});
                    //return cb(new Error('Please upload a Image'), false);
                    
                }
                cb(undefined, true);
            }
        }).single('image');

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({status: "failed", message: "Something went wrong", error: err});
            } else if (err) {
                res.json({status: "failedss", message: "Something went wrong", error: err});
            }else{
                var netAmount = 0;
                if(req.body.discount_percentage) {
                    var percentageAmount = ((req.body.amount * req.body.discount_percentage) / 100).toFixed(2);
                    netAmount = req.body.amount - percentageAmount;
                }else{
                    netAmount = req.body.amount;
                }

                var saveobj = {
                    category_id: req.body.category_id,
                    name: req.body.name,
                    short_description: req.body.short_description,
                    description : req.body.description,
                    image: req.file ? req.file.filename : null,
                    amount: req.body.amount,
                    discount_percentage: req.body.discount_percentage,
                    order_count: req.body.order_count,
                    net_amount: netAmount
                }
                productModel.findByIdAndUpdate(req.params.productId, saveobj, function(err, productInfo){
                    if(err){
                        next(err);
                    }else {
                        res.json({status:"success", message: "Product updated successfully!!!", products: productInfo});
                    }
                });
            }
        });
    },

    deleteById: function(req, res, next) {
        productModel.findByIdAndUpdate(req.params.productId, {deleted:1}, function(err, productInfo){
            if(err){
                next(err);
            }else {
                res.json({status:"success", message: "Product deleted successfully!!!", data:null});
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
                    return res.json({status: "failed", message: "Please upload a Image"});
                    //return cb(new Error('Please upload a Image'))
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
                var netAmount = 0;
                if(req.body.discount_percentage) {
                    var percentageAmount = ((req.body.amount * req.body.discount_percentage) / 100).toFixed(2);
                    netAmount = req.body.amount - percentageAmount;
                }else{
                    netAmount = req.body.amount;
                }

                var saveobj = {
                    category_id: req.body.category_id,
                    name: req.body.name,
                    short_description: req.body.short_description,
                    description : req.body.description,
                    image: req.file ? req.file.filename : null,
                    amount: req.body.amount,
                    discount_percentage: req.body.discount_percentage,
                    order_count: req.body.order_count,
                    net_amount: netAmount
                }

                productModel.create(saveobj, function (err, result) {
                    if(err){
                        next(err);
                    }else{
                        res.json({status: "success", message: "Product added successfully!!!", data: null});
                    }
                });
            }
        });
    }
}
