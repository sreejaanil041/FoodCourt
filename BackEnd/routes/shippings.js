const express = require('express');

const router = express.Router();

const shippingController = require('../app/api/controllers/shippings');

router.get('/', shippingController.getAll);

router.post('/create', shippingController.create);

router.get('/:shippingid', shippingController.getById);

router.put('/:shippingId', shippingController.updateById);

router.delete('/:shippingId', shippingController.deleteById);

/*

router.get('/:userId', shippingController.getById);

router.put('/:shippingId', shippingController.updateById);

router.delete('/:shippingId', shippingController.deleteById);
*/


module.exports = router; 