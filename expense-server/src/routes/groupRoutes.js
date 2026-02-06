const express = require('express');
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/create', authorize('group:create'), groupController.create);
router.put('/update', authorize('group:update'), groupController.update);
router.patch('/members/add', authorize('group:update'), groupController.addMembers);
router.patch('/members/remove', authorize('group:update'), groupController.removeMembers);
router.get('/my-groups', authorize('group:update'), groupController.getGroupsByUser);
router.get('/status', authorize('group:view'), groupController.getGroupsByPaymentStatus);
router.get('/:groupId/audit', authorize('group:view'), groupController.getAudit);

module.exports = router;