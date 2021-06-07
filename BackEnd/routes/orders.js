const express = require('express');

const router = express.Router();

const orderController = require('../app/api/controllers/orders');

router.post('/create', orderController.create);

router.get('/cart', orderController.getCartAll);

router.post('/add-to-cart', orderController.addToCart);

router.delete('/cart/:productId', orderController.deleteCartById);

router.get('/getallorders', orderController.getAll);

router.post('/getorders', orderController.getOrder);

module.exports = router; 
