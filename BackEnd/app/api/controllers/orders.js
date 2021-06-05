const productModel = require('../models/products');
const cartModel = require('../models/carts');

module.exports = {
    addToCart: function(req, res, next) {console.log()
        if(req.body.products){
            req.body.products.forEach(function(product) {
                var status = "success";

                cartModel.findOne({product_id: product.id, user_id: req.body.userId}).exec(function(err, data){
                    if(data) {
                        cartModel.updateOne({_id:data._id}, {quantity:data.quantity+1},{
                            new: true
                        }, function(err, response){
                            status = "failed";
                        });
                    }else{
                        productModel.findById(product.id, function(error, response){
                            console.log('response.net_amount',response.net_amount)
                            var saveobj = {
                                user_id: req.body.userId,
                                product_id: product.id,
                                amount: response.net_amount,
                                quantity: product.quantity
                            }
                            cartModel.create(saveobj, function (err, result) {
                                console.log('my result',result);
                                if(err){
                                    next(err);
                                }else{
                                    status = "success";
                                }
                            });
                        });
                    }
                });

                res.json({status: status, message: "Cart added successfully!!!"});
            });
        }else{
            res.json({status: "failed", message: "No products found"});
        }
    },
    getCartAll: function(req, res, next) {
        let cartList = [];

        cartModel.find({user_id: req.body.userId}).select(["amount", "quantity"]).populate({path: 'product_id', select:'name', populate: {
            path: 'category_id',
            model: 'Category',
            select:'name'
        } }).exec(function(err, products){
            if (err){
                next(err);
            } else{
                res.json({status:"success", message: "Products list found!!!", data:{cart: products}});
            }
        });
    },
    deleteCartById: function(req, res, next) {
        cartModel.findByIdAndRemove(req.params.cartId, function(err, categoryInfo){
            if(err){
                next(err);
            }else {
                res.json({status:"success", message: "Cart deleted successfully!!!", data:null});
            }
        });
    }
}
