const shippingModel = require('../models/shippings');

const bcrypt = require('bcrypt'); 

const jwt = require('jsonwebtoken');

/*
name
user_id
address
landmark
phone_number
alternative_phone_number
city
state
country
post_code
created
modified
*/


 
 
module.exports = {
  
  
getAll: function(req, res, next) {
    let shippingList = [];
    shippingModel.find({user_id:req.body.userId, deleted:0}, function(err, address){
        if (err){
            next(err);
        } else{
            for (let addr of address) {
                shippingList.push({
                  id: addr._id, 
                  ordertype: addr.ordertype, 
                  address: addr.address, 
                  landmark: addr.landmark, 
                  phone_number: addr.phone_number, 
                  alternative_phone_number: addr.alternative_phone_number, 
                  city: addr.city, 
                  state: addr.state,
                  country: addr.country, 
                  post_code: addr.post_code,
                  default_status: addr.default_status
                });
            }
            res.json({status:"success", message: "Categories list found!!!", data:{shipping: shippingList}});
            
        }
    }).sort({ default_status: 1 });
},
getById: function(req, res, next) {
  shippingModel.find({user_id:req.params.shippingid,default_status:1}, function(err, shippingInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "user Default shipping details found!!!", data:{shipping: shippingInfo}});
   }
  });
 },
 
   
 /*
getById: function(req, res, next) {
  console.log(req.params);

  shippingModel.findById(req.params.shippingid, function(err, shippingInfo){
   if (err) {
    next(err);
   } else {
    res.json({status:"success", message: "user shipping details found!!!", data:{shipping: shippingInfo}});
   }
  });
 },
 
 */

 
 
 create: function(req, res, next) {
   
      shippingModel.create({ name: req.body.name, user_id: req.body.userId, address: req.body.address, landmark: req.body.landmark, phone_number: req.body.phone_number, 
	alternative_phone_number: req.body.alternative_phone_number,
	city: req.body.city,
	state: req.body.state,
	country: req.body.country,
	post_code: req.body.post_code,
	phone_number: req.body.phone_number,
	created: req.body.created, modified: req.body.modified }, function (err, result) {
	  if (err) 
	  next(err);
	  else
	  res.json({status: "success", message: "Shipping details added successfully!!!", data: null});
	  

 
  });
 },
 
 
 updateById: function(req, res, next) {
  shippingModel.findByIdAndUpdate(req.params.shippingId,{name:req.body.name,
    
    address: req.body.address, landmark: req.body.landmark, phone_number: req.body.phone_number, 
	alternative_phone_number: req.body.alternative_phone_number,
	city: req.body.city,
	state: req.body.state,
	country: req.body.country,
	post_code: req.body.post_code,
	phone_number: req.body.phone_number, modified: req.body.modified
    
  }, function(err, shippingInfo){if(err)
    next(err);
   else {
    res.json({status:"success", message: "Shipping details updated successfully!!!", data:null});
   }
  });
 },
 
 
 deleteById: function(req, res, next) {
  shippingModel.findByIdAndUpdate(req.params.shippingId, {deleted:1}, function(err, shippingInfo){
   if(err)
    next(err);
   else {
    res.json({status:"success", message: "Shipping details deleted successfully!!!", data:null});
   }
  });
 },
 
 

 
 
} 
