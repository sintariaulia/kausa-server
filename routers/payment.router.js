const express = require('express')
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');
const {
    getAllPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} = require('../controllers/payment.controller');

// GET
router.get('/payment', getAllPayment);
// GET BY ID
router.get('/payment/:id', getPaymentById);
// POST
router.post('/payment', createPayment);
// PUT
router.put('/payment/:id', updatePayment);
// DELETE
router.delete('/payment/:id', verifyToken, authorizeRoles(["admin"]), deletePayment);

module.exports = router;