import express from 'express';
//import studentRoute from "../student/studentRoute";
import accountRoute from "../account/accountRoute";
import adminRoute from "../admin/accountRoute";
import customerRoute from "../customer/customerRoute";
import sellerRoute from "../seller/sellerRoute";

const app = express();

//app.use('/students',studentRoute);
app.use('/accounts', accountRoute);
app.use('/admin', adminRoute);
app.use('/customers', customerRoute);
app.use('/sellers', sellerRoute);


module.exports = app;