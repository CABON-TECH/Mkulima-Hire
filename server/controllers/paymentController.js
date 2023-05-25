const Payment = require('../models/paymentModel');

const paymentController = {};

paymentController.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.status(200).json({
            status: 'success',
            results: payments.length,
            payments
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

module.exports = paymentController;