import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();



//router.get('/admins',controller.getAdmins);
router.get('/', controller.getProducts);
router.post('/', controller.addProduct);
router.put('/:id', controller.updateProduct);
module.exports = router;


// put more specific paths on top