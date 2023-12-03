const express = require('express')
const router = express.Router();
const {
    getAllPesanan,
    getPesananById,
    createPesanan,
    deletePesanan,
    updatePesanan,
} = require('../controllers/pesanans');

router.get('/pesanan', getAllPesanan);
router.get('/pesanan/:id', getPesananById);
router.delete('/pesanan/:id', deletePesanan);
router.post('/pesanan', createPesanan);
router.put('/pesanan/:id', updatePesanan);

module.exports = router;