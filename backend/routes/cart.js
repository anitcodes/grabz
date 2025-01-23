const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    addToCart,
    updateQuantity,
    removeFromCart,
    getCart
} = require('../controllers/cartController');

router.use(protect); // Protect all cart routes

router.route('/')
    .get(getCart)
    .post(addToCart);

router.route('/update-quantity')
    .put(updateQuantity);

router.route('/:productId')
    .delete(removeFromCart);

module.exports = router; 