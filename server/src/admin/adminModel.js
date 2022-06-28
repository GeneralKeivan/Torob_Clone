import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the admin Schema

let adminSchema = new Schema({
    //put what needs to be saved here
},{timestamps : true});

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
