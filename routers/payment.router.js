const express = require('express')
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');
const {
    getAllPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentByPesananId,
} = require('../controllers/payment.controller');
const upload = require("../middleware/multerConfig")

// GET
router.get('/payment', getAllPayment);
// GET BY ID
router.get('/payment/:id', getPaymentById);
// GET BY Pesanan ID
router.get('/payment/pesanan/:pesananId', getPaymentByPesananId);
// POST
router.post('/payment', verifyToken, authorizeRoles(["admin", "user"]), upload.single("bukti_bayar"), createPayment);
// PUT
router.put('/payment/:id', updatePayment);
// DELETE
router.delete('/payment/:id', verifyToken, authorizeRoles(["admin"]), deletePayment);

module.exports = router;