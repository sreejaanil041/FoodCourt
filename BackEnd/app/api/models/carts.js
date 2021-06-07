const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: {type: Number, default: 0},
    quantity: {type: Number, default: 0},
    created_at: {type:Date, default:Date.now()},
    updated_at: {type:Date, default:Date.now()}
})

module.exports = mongoose.model('Cart', CartSchema) 