const express = require('express');
const router = express.Router();
const validateApiKey = require('../auth/auth');
const orderController = require('../controller/orderController');

router.use(validateApiKey);
router.get('/orders', orderController.fetchAll);
router.post('/orders', orderController.createOrder)

module.exports = router;