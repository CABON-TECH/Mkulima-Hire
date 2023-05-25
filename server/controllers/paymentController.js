const Payment = require('../models/paymentModel');

//const paymentController = {};

const getAllPayments = async (req, res) => {
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

// create payment
const createPayment = async (req, res) => {
    try {
        const { user, onModel, amount, paymentMethod, paymentResult } = req.body;
        const payment = await Payment.create({
            user,
            onModel,
            amount,
            paymentMethod,
            paymentResult
        });
        res.status(201).json({
            status: 'success',
            payment
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

//get payment by id
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            payment
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

//update payment
const updatePayment = async (req, res) => {
    try {
        const { user, onModel, amount, paymentMethod, paymentResult } = req.body;
        const payment = await Payment.findById(req.params.id);
        if (payment) {
            payment.user = user;
            payment.onModel = onModel;
            payment.amount = amount;
            payment.paymentMethod = paymentMethod;
            payment.paymentResult = paymentResult;
            const updatedPayment = await payment.save();
            res.status(200).json({
                status: 'success',
                payment: updatedPayment
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}



module.exports = {
    getAllPayments,
    createPayment,
    getPaymentById,
    updatePayment
}