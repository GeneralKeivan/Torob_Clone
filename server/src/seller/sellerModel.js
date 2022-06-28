import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the seller Schema

let sellerSchema = new Schema({
    //put what needs to be saved here
},{timestamps : true});

const seller = mongoose.model('seller', sellerSchema);
module.exports = seller;
