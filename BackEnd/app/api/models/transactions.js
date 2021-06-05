const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;//Define a schema

const Schema = mongoose.Schema;



const TransactionSchema = new Schema({

 user_id   : { type: Schema.Types.ObjectId, ref: 'User' }, 
 
 order_ids: String,
 
 shipping_address_id   : { type: Schema.Types.ObjectId, ref: 'Shipping' }, 

 payment_type: {type:Boolean, default:0},
 //payment_type	tinyint	1	0->COD, 1->Online	

 order_amount: Number,
 delivery_amount: Number,
 discount_amount: Number,
 total_amount: Number,
 
 payment_status: {type:Boolean, default:0},
 /*
  * 
  * payment_status	tinyint	3	"0 -> inprogress
1 -> success
2 -> failed"		

*/
 
 
 created: {type:Date, default:Date.now()},
 modified: {type:Date, default:Date.now()}
  
});// hash user password before saving into database





module.exports = mongoose.model('Transaction', TransactionSchema); 
