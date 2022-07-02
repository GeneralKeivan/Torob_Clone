import express from "express";
import accountController from "./accountController";

const router = express.Router();
const controller = new accountController();



//router.get('/admins',controller.getAdmins);
router.get('/',controller.getSellers);

router.post('/',controller.addSeller);

router.put('/', controller.updateSeller)

module.exports = router;


// put more specific paths on top