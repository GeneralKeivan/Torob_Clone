import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the product Schema

let productSchema = new Schema({
    name : {type:String, default : null},
    id : {type:String, default : null},
    model    : {type:String, default : null},
    brand    : {type:String, default : null},
    last_updated: {type:String, default : null},
    minimum_price: {type:String, default : null},
    maximum_price: {type:String, default : null},
    sellers    : [
        {
            name : {type:String, default : null},
            phoneNumber: {type:String, default : null},
            price: {type:String, default : null},
        }
    ],
},{timestamps : true});

const preoduct = mongoose.model('product', sellerSchema);
module.exports = seller;
