import  accountModel  from "./accountModel";

class Account {

} 

Account.prototype.getAccounts = (req,res) => {
    accountModel.find({},(err,accounts) => {
        if(err){
            res.send(err);
        }else{
            console.log("all accounts: ", accounts);
            res.send({'success':true,'message':'Accounts fetched successfully',accounts});
        }
    })
}

Account.prototype.addAccount = (req,res) => {
    let obj = req.body;
    console.log("obj ", obj);
    let model = new accountModel(obj);
    console.log("model ", model);
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({'success':true,'message':'Account fetched successfully',result});
        }
    })
}


