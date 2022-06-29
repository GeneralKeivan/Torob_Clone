import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the admin Schema

let adminSchema = new Schema({
    //put what needs to be saved here
    userName : {type:String, default : null},
    password : {type:String, default : null},
    email    : {type:String, default : null},
},{timestamps : true});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
