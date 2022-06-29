import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the seller Schema

let sellerSchema = new Schema({
    //put what needs to be saved here
    userName : {type:String, default : null},
    password : {type:String, default : null},
    email    : {type:String, default : null},
    phone    : {type:Number, default : null},
    count    : {type:Number, default : null},
    store    : [
        {
            name        : {type:String, default : null, unique : true},
            id          : {type:String, default : null, unique : true},
            products    : [
                {
                    id   : {type:String, default : 0, unique : true},
                    name : {type:String, default : null},
                    price : {type:Number, default : null},
                    link : {type:String, default : null},
                    generalType : {type:String, default : null},
                    detailedTyped : {type:String, default : null},
                }
            ]
        }
    ],
},{timestamps : true});

const seller = mongoose.model('seller', sellerSchema);
module.exports = seller;
