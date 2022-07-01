import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();



//router.get('/admins',controller.getAdmins);
router.get('/',controller.getCustomers);

router.post('/',controller.addCustomer);

router.put('/:id', controller.updateCustomer)
module.exports = router;


// put more specific paths on top