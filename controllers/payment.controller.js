const paymentModels = require("../models/payment.models");
const upload = require('../config/multer')
const fs = require("fs");


exports.getAllPayment = async (req, res) => {
    try {
        const { pesanan_id } = req.query;
        payment = await paymentModels.getAllPayments(pesanan_id);
        res.json({
            status_code: 200,
            message: 'Get All List Payment Successfully',
            datas: payment
        });
    } catch (error) {
        console.error('Error Fetching Data Payment', error);
        res.status(500).json({
            message: 'Error Fetching Data Payment',
            error: error.message
        });
    }
}

exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await paymentModels.getPaymentById(id);
        if (payment) {
            res.json({
                status_code: 200,
                message: 'Get Payment By Id Successfully',
                datas: payment
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Payment Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Payment', error);
        res.status(500).json({
            message: 'Error Fetching Payment',
            error: error.message
        });
    }
}

exports.getPaymentByPesananId = async (req, res) => {
    const { pesananId } = req.params;
    try {
        const payment = await paymentModels.getPaymentByPesananId(pesananId);
        if (payment.length > 0) {
            res.json({
                status_code: 200,
                message: 'Get Payment By Pesanan Id Successfully',
                datas: payment
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Payment Not Found for the specified Pesanan Id',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Payment', error);
        res.status(500).json({
            message: 'Error Fetching Payment',
            error: error.message
        });
    }
};

// exports.createPayment = async (req, res) => {
//     try {
//         const { pesanan_id, bukti_bayar, status } = req.body;
//         const newPayment = await paymentModels.createPayment(pesanan_id, bukti_bayar, status);
//         res.json({
//             status_code: 201,
//             message: "Payment Added Successfully",
//             datas: newPayment
//         });
//     } catch (error) {
//         console.error('Error Creating Payment', error);
//         res.status(500).json({
//             message: 'Error Creating Payment',
//             error: error.message
//         });
//     }
// }

exports.createPayment = async (req, res) => {
    const { pesanan_id, status } = req.body;
    const buktiFile = req.file;

    // Set the bukti image path in the blog data
    let buktiImagePath = "";
    if (buktiFile) {
        buktiImagePath = `/buktiPembayaran/${buktiFile.filename}`;
    }

    try {
        const createdPayment = await paymentModels.createPayment(pesanan_id, buktiImagePath, status);
        res.status(200).json(createdPayment);
    } catch (error) {
        // Delete the uploaded thumbnail image if there is an error
        if (buktiFile) {
            fs.unlinkSync(buktiFile.path);
        }

        console.error('Error creating payment:', error.message);

        res.status(500).json({
            message: 'Error creating payment',
            error: error.message,
        });
    }

};


exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const payment = await paymentModels.updatePayment(id, status);
        res.json({
            status_code: 204,
            message: 'Payment Upadated Successfully',
            datas: payment
        });
    } catch (error) {
        console.error('Error Updating Payment', error);
        res.status(500).json({
            message: 'Error Updating Payment',
            error: error.message
        });
    }
}

exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        await paymentModels.deletePayments(id);
        res.json({
            status_code: 204,
            message: 'Payment Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting Payment', error);
        res.status(500).json({
            message: 'Error Deleting Payment',
            error: error.message
        });
    }
}