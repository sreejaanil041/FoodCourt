const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    user_id : { type: Schema.Types.ObjectId, ref: 'User' },
    order_ids: String,
    shipping_address_id : { type: Schema.Types.ObjectId, ref: 'Shipping' },
    payment_type: {type:Boolean, default:0},
    order_amount: {type: Number, default: 0},
    delivery_amount: {type: Number, default: 0},
    discount_amount: {type: Number, default: 0},
    total_amount: {type: Number, default: 0},
    payment_status: {type:Boolean, default:0},
    created: {type:Date, default:Date.now()},
    modified: {type:Date, default:Date.now()}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
