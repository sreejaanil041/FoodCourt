const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    user_id : { type: Schema.Types.ObjectId, ref: 'User' },
    product_id : { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: {type: Number, default: 0},
    quantity: {type: Number, default: 0},
    discount_amount: {type: Number, default: 0},
    total_amount: {type: Number, default: 0},
    status: {type:Boolean, default:1},
    deleted: {type:Boolean, default:0},
    created: {type:Date, default:Date.now()},
    modified: {type:Date, default:Date.now()}
});

module.exports = mongoose.model('Order', OrderSchema);