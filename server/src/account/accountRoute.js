import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();



router.get('/accounts/admins',controller.getAdmins);
router.get('/accounts/customers',controller.getCustomers);
router.get('/accounts/sellers',controller.getSellers);
router.get('/accounts/',controller.getAccounts);

router.post('/accounts/customers',controller.addCustomers);
router.post('/accounts/sellers',controller.addSellers);


module.exports = router;


// put more specific paths on top