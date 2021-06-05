const express = require('express');

const router = express.Router();

const orderController = require('../app/api/controllers/orders');


router.get('/cart', orderController.getCartAll);

router.post('/add-to-cart', orderController.addToCart);

router.delete('/cart/:productId', orderController.deleteCartById);

module.exports = router; 
