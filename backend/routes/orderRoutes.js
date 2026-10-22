const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/', requireAuth, OrderController.placeOrder);
router.get('/my-orders', requireAuth, OrderController.getMyOrders);

module.exports = router;
