import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();



router.get('/admins',controller.getAdmins);
router.get('/customers',controller.getCustomers);
router.get('/sellers',controller.getSellers);
router.get('/accounts/',controller.getAccounts);

router.post('/customers',controller.addCustomers);
router.post('/sellers',controller.addSellers);

router.put('/customers/:id', controller.updateCustomer)
router.put('/sellers/:id', controller.updateSeller)
module.exports = router;


// put more specific paths on top