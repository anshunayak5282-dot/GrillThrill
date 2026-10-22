const OrderModel = require('../models/orderModel');

const OrderController = {
  async placeOrder(req, res) {
    try {
      const userId = req.user.id;
      const { items, delivery_address, promo_code } = req.body;

      const order = await OrderModel.createOrder({
        userId,
        items,
        deliveryAddress: delivery_address,
        promoCode: promo_code
      });

      return res.status(201).json({
        success: true,
        message: `Order #${order.id} placed successfully!`,
        order
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || 'Failed to place order.'
      });
    }
  },

  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await OrderModel.getOrdersByUser(userId);
      return res.json({
        success: true,
        count: orders.length,
        orders
      });
    } catch (error) {
      console.error('getMyOrders error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch your order history.'
      });
    }
  }
};

module.exports = OrderController;
