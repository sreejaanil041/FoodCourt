const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;//Define a schema

const Schema = mongoose.Schema;

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


const ShippingSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 user_id   : { type: Schema.Types.ObjectId, ref: 'User' }, 
 ordertype: {type:Boolean, default:0},
 
 /*
  * 
  * status	tinyint	1	0 -> Home , 1-> Office/Commercial		
  * */
 
 
 address: String,
  landmark: String,
  phone_number: String,
  alternative_phone_number: String,
 city: String,
 state: String,
 country: String,
 post_code: String,
 default_status: {type:Boolean, default:1}, 
   
   /*1 -> set as default address		
    * */
   
   
 deleted: {type:Boolean, default:0},
 created: {type:Date, default:Date.now()},
 modified: {type:Date, default:Date.now()}
  
});// hash user password before saving into database





module.exports = mongoose.model('Shipping', ShippingSchema); 
