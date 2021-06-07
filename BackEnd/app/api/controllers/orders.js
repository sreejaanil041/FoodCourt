const productModel = require('../models/products');
const cartModel = require('../models/carts');

module.exports = {
    addToCart: function(req, res, next) {
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
    },
    create: function(req, res, next) {
        shippingModel.findById(req.body.shipping_address_id).exec(function(err, data){
            if(!data){
                res.json({status: "error", message: "No shipping address found!!!", data: null});
            }
        });

        cartModel.find({user_id:req.body.user_id}).exec(function(err, cartdata){
            if(!cartdata){
                res.json({status: "error", message: "Cart empty for this User!!!", data: null});
            }else{
                var order_fullamount = 0;
                var order_fulldeliveryamount = 0;
                var order_fulldiscount_amount = 0;
                var orderids="";

                noofcart=cartdata.length;
                index = 0;

                for (let cart of cartdata) {
                    var saveorderobj = {
                        user_id: req.body.user_id,
                        product_id : cart.product_id,
                        quantity: cart.quantity,
                        amount: cart.amount,
                        discount_amount: cart.discount_amount,
                        total_amount: cart.total_amount,
                        status: cart.status
                    }

                    orderModel.create(saveorderobj, function (err, result) {
                        if(err){
                            next(err);
                        }else{
                            orderids = orderids+result._id+",";
                            order_fullamount =  parseFloat(order_fullamount) + parseFloat(result.total_amount);
                            order_fulldiscount_amount = 0;
                            index++;
                            if (index === noofcart){
                                order_fullamount = parseFloat(order_fullamount) +  parseFloat(req.body.delivery_amount);
                                
                                orderids = orderids.replace(/,\s*$/, "");
                                var savetransobj = {
                                    user_id: req.body.user_id,
                                    order_ids : orderids,
                                    order_amount: order_fullamount,
                                    shipping_address_id :req.body.shipping_address_id,
                                    delivery_amount: req.body.delivery_amount,
                                    discount_amount: 0,
                                }

                                transactionModel.create(savetransobj, function (err, result1) {
                                    if(err){
                                        next(err);
                                    }else{
                                        cartModel.find({user_id:req.body.user_id}).remove().exec(function(err, data) {
                                        });
                                        res.json({status: "success", message: "order placed successfully!!!", data: null});
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    getAll: function(req, res, next) {
        let ordersList = [];
        transactionModel.find().populate({path: 'user_id', select:['name']}).sort({"created": 1}).exec(function(err, orders){
            if (err){
                next(err);
            } else{
                for (let order of orders) {
                    ordersList.push({
                        id: order._id,
                        payment_type: order.payment_type,
                        payment_status: order.payment_status,
                        created: order.created,
                        modified: order.modified,
                        user_id: order.user_id,
                        order_ids: order.order_ids,
                        order_amount: order.order_amount,
                        shipping_address_id: order.shipping_address_id,
                        delivery_amount: order.delivery_amount,
                        discount_amount: order.discount_amount
            
                    });
                }
                res.json({status:"success", message: "orders list found!!!", data:{orders: orders}});
            }
        });
    },
    getOrder: function(req, res, next) {
        let ordersList = [];
        transactionModel.find({user_id:req.body.user_id}).sort({"created": 1}).exec(function(err, orders){
            if (err){
                next(err);
            } else{
                for (let order of orders) {
                    ordersList.push({
                        id: order._id,
                        payment_type: order.payment_type,
                        payment_status: order.payment_status,
                        created: order.created,
                        modified: order.modified,
                        user_id: order.user_id,
                        order_ids: order.order_ids,
                        order_amount: order.order_amount,
                        shipping_address_id: order.shipping_address_id,
                        delivery_amount: order.delivery_amount,
                        discount_amount: order.discount_amount
                    });
                }
                res.json({status:"success", message: "orders list found!!!", data:{orders: orders}});
            }
        });
    },
}