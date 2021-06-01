const adminuserModel = require('../models/adminusers');

const bcrypt = require('bcrypt'); 

const jwt = require('jsonwebtoken');

/*
first_name
last_name
email
password
phone_number
created
modified
*/



module.exports = {

  create: function(req, res, next) {
  adminuserModel.findOne({email:req.body.email}, function(err, userInfo)
  {
    
     if(userInfo){ 
       res.json({status: "error", message: "Admin User already exists!!!", data: null});
     }
     else
     {
      adminuserModel.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, phone_number: req.body.phone_number, created: req.body.created, modified: req.body.modified }, function (err, result) {
	  if (err) 
	  next(err);
	  else
	  res.json({status: "success", message: "Admin User added successfully!!!", data: null});
	  
	});
     }
  });
 },
 
 
 
 authenticate: function(req, res, next) {
  adminuserModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } else {
       
       
       if(bcrypt.compareSync(req.body.password, userInfo.password)) {
	 
	 
	 const token = jwt.sign({id: userInfo._id}, 
				req.app.get('secretKey1'), { expiresIn: '1h' });
	 
	 res.json({status:"success", message: "Admin user found!!!", data:{user: userInfo, token:token}});
	 
      }
      else
      {
	res.json({status:"error", message: "Invalid email/password!!!", data:null});      
       }
     }
    });
 },
   
 
 
} 
