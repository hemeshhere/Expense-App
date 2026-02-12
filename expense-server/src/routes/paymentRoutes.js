const express=require('express');
const router=express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const paymentsController=require('../controllers/paymentsController');
const authorize = require('../middlewares/authorizeMiddleware');

// We need raw request data (without any modification in the structure of the data)
// in order to reconstruct the signature and verify it.
router.post('/webhook', express.raw({type: 'application/json'}), paymentsController.handleWebhookEvents);


router.use(authMiddleware.protect);
router.post('/create-order', authorize('payment:create'), paymentsController.createOrder);
router.post('/verify-order', authorize('payment:create'), paymentsController.verifyOrder);
router.post('/create-subscription', authorize('payment:create'), paymentsController.createSubscription);
router.post('/capture-subscription', authorize('payment:create'), paymentsController.captureSubscription);
module.exports=router;