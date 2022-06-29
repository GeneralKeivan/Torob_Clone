import sellerModel  from "./sellerModel";
import customerModel from "./customerModel"
import adminModel from "./adminModel"
class Account {

} 

Account.prototype.getAccounts = (req,res) => {
    var allAccounts;
    adminModel.find({},(err,accounts) => {
        if(err){
            res.send(err);
        }else{
            allAccounts += accounts;
        }
    })

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

