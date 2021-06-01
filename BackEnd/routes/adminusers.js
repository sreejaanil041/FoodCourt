const express = require('express');

const router = express.Router();

const adminuserController = require('../app/api/controllers/adminusers');

router.post('/create', adminuserController.create);

router.post('/authenticate', adminuserController.authenticate);

//router.get('/', adminuserController.getAll);

module.exports = router; 