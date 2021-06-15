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
  
  
  
getById: function(req, res, next) {
  console.log(req.params);

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
