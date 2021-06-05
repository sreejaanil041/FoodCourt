const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: {
        type: String,
        required: true,
    },
    image: String,
    short_description: String,
    description: String,
    amount: {type: Number, default: 0},
    discount_percentage: {type: Number, default: 0},
    net_amount: {type: Number, default: 0},
    order_count: {type: Number, default:0},
    status: {type:Boolean, default:1},
    deleted: {type:Boolean, default:0},
    created_by: { type: Schema.Types.ObjectId, ref: 'AdminUser', default: null },
    updated_by: { type: Schema.Types.ObjectId, ref: 'AdminUser', default: null },
    created_at: {type:Date, default:Date.now()},
    updated_at: {type:Date, default:Date.now()}
})

module.exports = mongoose.model('Product', ProductSchema) 