const express = require('express')
const router = express.Router();
const {
    getAllPesanan,
    getPesananById,
    createPesanan,
    deletePesanan,
    updatePesanan,
    getPesananByUserId,
} = require('../controllers/pesanans');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// GET
router.get('/pesanan', getAllPesanan);
// GET BY ID
router.get('/pesanan/:id', getPesananById);
// BY USER ID
router.get('/pesanan/user', verifyToken, authorizeRoles(["user", "admin", "kasir"]), getPesananByUserId);
// CREATE
router.post('/pesanan', verifyToken, authorizeRoles(["user", "admin"]), createPesanan);
// UPDATE
router.put('/pesanan/:id', verifyToken, authorizeRoles(["kasir", "admin"]), updatePesanan);
// DELETE
router.delete('/pesanan/:id', verifyToken, authorizeRoles(["kasir", "admin"]), deletePesanan);

module.exports = router;