const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;//Define a schema

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({

  

/*  
first_name
last_name
email
password
phone_number
created
modified
*/
 first_name: {
  type: String,
  trim: true,  
  required: true,
 },
 
 last_name: {
  type: String,
  trim: true,  
  required: true,
 },
 
 
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 profile_image: String,
 phone_number: String,
 active: {type:Boolean, default:1},
 deleted: {type:Boolean, default:0},
 created: {type:Date, default:Date.now()},
 modified: {type:Date, default:Date.now()}
  
});// hash user password before saving into database

AdminUserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();

});


module.exports = mongoose.model('Adminuser', AdminUserSchema); 
