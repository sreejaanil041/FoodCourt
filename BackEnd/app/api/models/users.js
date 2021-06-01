const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;//Define a schema

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 name: {
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
 image: String,
 phone_number: String,
 deleted: {type:Boolean, default:0},
 created: {type:Date, default:Date.now()},
 modified: {type:Date, default:Date.now()}
  
});// hash user password before saving into database

UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();

});module.exports = mongoose.model('User', UserSchema); 
