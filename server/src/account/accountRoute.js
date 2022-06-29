import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();


router.get('/accounts/',controller.getAccounts);
router.post('/accounts/',controller.addAccounts);


module.exports = router;


// put more specific paths on top