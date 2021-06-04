const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    category: {
        type: String,
        trim: true,  
        required: true,
    },
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    image: String,
    description: String,
    status: {type:Boolean, default:1},
    deleted: {type:Boolean, default:0},
    created_by: {type:String, default:null},
    updated_by: {type:String, default:null},
    created_at: {type:Date, default:Date.now()},
    updated_at: {type:Date, default:Date.now()}
});
module.exports = mongoose.model('Category', CategorySchema) 
