const express = require('express');
const router = express.Router();
const validateApiKey = require('../auth/auth');
const productController = require('../controller/productController');
router.use(validateApiKey);
router.get('/products', productController.fetchAll);

module.exports = router;