import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let accountSchema = new Schema({
    userName    : {type:String, default : null},
    password    : {type:String, default : null},
    email       : {type:String, default : null},
    type        : {type:String, default : null},

},{timestamps : true
});

accountSchema.plugin(AutoIncrement, {inc_field: '_id'});
const account = mongoose.model('account', accountSchema);
module.exports = account;