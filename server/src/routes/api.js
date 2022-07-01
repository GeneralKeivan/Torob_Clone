import express from 'express';
//import studentRoute from "../student/studentRoute";
import accountRoute from "../account/accountRoute";
import productRoute from "../account/productRoute";
import customerRoute from "../account/customerRoute";
import sellerRoute from "../account/sellerRoute";

const app = express();

//app.use('/students',studentRoute);
app.use('/accounts', accountRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/sellers', sellerRoute);


module.exports = app;