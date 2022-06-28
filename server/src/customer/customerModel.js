import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Defines the customer Schema

let customerSchema = new Schema({
    //put what needs to be saved here
},{timestamps : true});

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;
