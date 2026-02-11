const express=require('express');
const router=express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const paymentsController=require('../controllers/paymentsController');
const authorize = require('../middlewares/authorizeMiddleware');

router.use(authMiddleware.protect);
router.post('/create-order', authorize('payment:create'), paymentsController.createOrder);
router.post('/verify-order', authorize('payment:create'), paymentsController.verifyOrder);
module.exports=router;