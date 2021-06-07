const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;//Define a schema

const Schema = mongoose.Schema;


const OrderSchema = new Schema({

 user_id   : { type: Schema.Types.ObjectId, ref: 'User' }, 
 
 product_id   : { type: Schema.Types.ObjectId, ref: 'Product' }, 
  
// payment_status: {type:Boolean, default:0},
 /*
  "0 -> inprogress
1 -> success
2 -> failed"						
  */

 
 quantity: Number,
 amount: Number,
 discount_amount: Number,
 total_amount: Number,
 
 status: {type:Boolean, default:1},
 /*
  * status	tinyint	2	0-> inprogress, 1 -> ordered , 2 -> cancelled
  */
 
 
 
 deleted: {type:Boolean, default:0},
 created: {type:Date, default:Date.now()},
 modified: {type:Date, default:Date.now()}
  
});// hash user password before saving into database




module.exports = mongoose.model('Order', OrderSchema); 

