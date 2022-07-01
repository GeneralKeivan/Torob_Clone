import sellerModel  from "./sellerModel";
import customerModel from "./customerModel"
//import adminModel from "./adminModel"
import productModel from "./productModel"
class Account {

} 

Account.prototype.getAccounts = (req,res) => {
    var allAccounts;
    /*adminModel.find({},(err,accounts) => {
        if(err){
            res.send(err);
        }else{
            allAccounts += accounts;
        }
    })*/

    customerModel.find({},(err,accounts) => {
        if(err){
            res.send(err);
        }else{
            allAccounts += accounts;
        }
    })

    sellerModel.find({},(err,accounts) => {
        if(err){
            res.send(err);
        }else{
            allAccounts += accounts;
            res.send({'success':true,'message':'Accounts fetched successfully',allAccounts});
        }
    })
}

Account.prototype.addCustomer = (req,res) => {
    let obj = req.body;
    console.log("obj ", obj);
    let model = new customerModel(obj);
    console.log("model ", model);
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Customer fetched successfully',result});
        }
    })
}
Account.prototype.addSeller = (req,res) => {
    let obj = req.body;
    console.log("obj ", obj);
    let model = new sellerModel(obj);
    console.log("model ", model);
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Admin fetched successfully',result});
        }
    })
}


Account.prototype.updateSeller = (req,res) => {
    let id = req.body._id;
    sellerModel.findByIdAndUpdate(id,{ userName : req.body.userName, email : req.body.email, phone : req.body.phone, stores : req.body.stores, reviews : req.body.reviews},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

Account.prototype.updateCustomer = (req,res) => {
    let id = req.body._id;
    
    while(req.body.favorites.length > 5){
        req.body.favorites.shift();
    }

    customerModel.findByIdAndUpdate(id,{ favorites : req.body.favorites, recents : req.body.recents},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

Account.prototype.getProducts = (req, res) => {
    productModel.find({},(err,products) => {
        if(err){
            res.send(err);
        }else{
            console.log("result products", products);
            res.send({'success':true,'message':'Products fetched successfully',products});
        }
    })
}

Account.prototype.addProduct = (req, res) => {
    let obj = req.body;
    console.log("obj ", obj);
    let model = new productModel(obj);
    console.log("model ", model);
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Admin fetched successfully',result});
        }
    })
}

Account.prototype.updateProduct = (req, res) => {
    let id = req.body._id;

    var prices = [];

    for(var i = 0; i < req.body.sellers.id; i++){
        prices.push(parseInt(sellers[i].price))
    }
    prices = prices.sort(function(a, b){
        return a - b;
    });

    var cheap = prices[0];
    var expensive = prices.slice(-1);
    productModel.findByIdAndUpdate(id,{cheap: cheap, expensive: expensive, last_updated: req.body.last_updated, sellers : req.body.sellers},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

Account.prototype.getCustomers = (req,res) => {
    customerModel.find({},(err,customers) => {
        if(err){
            res.send(err);
        }else{
            console.log("result customers", customers);
            res.send({'success':true,'message':'Customers fetched successfully',customers});
        }
    })
}

Account.prototype.getSellers = (req,res) => {
    sellerModel.find({},(err,sellers) => {
        if(err){
            res.send(err);
        }else{
            console.log("result sellers", sellers);
            res.send({'success':true,'message':'Seller fetched successfully',sellers});
        }
    })
}


module.exports = Account;