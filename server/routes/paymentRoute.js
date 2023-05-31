const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, paymentController.getAllPayments);
router.post('/', protect, paymentController.createPayment);
router.get('/:id', protect, paymentController.getPaymentById);
router.put('/:id', protect, paymentController.updatePayment);
router.delete('/:id', protect, paymentController.deletePayment);

module.exports = router;