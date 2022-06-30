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
    cheap: {type:String, default : null},
    expensive: {type:String, default : null},
    sellers    : [
        {
            name : {type:String, default : null},
            phone: {type:String, default : null},
            price: {type:String, default : null},
            link:  {type:String, default : null}
        }
    ],
},{timestamps : true});

const product = mongoose.model('product', productSchema);
module.exports = product;
