import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the customer Schema

let customerSchema = new Schema({
    //put what needs to be saved here
    userName : {type:String, default : null},
    password : {type:String, default : null},
    email    : {type:String, default : null},
    favorites: [
        {
            name        : {type:String, default : null, unique : true},
            link        : {type:String, default : null, unique : true},
        }
    ],
    recents  : [
        {
            name        : {type:String, default : null, unique : true},
            link        : {type:String, default : null, unique : true},
        }
    ],
},{timestamps : true});

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;
