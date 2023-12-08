const express = require('express');
const router = express.Router();
const produkControllers = require('../controllers/produks');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// GET
router.get('/produk', produkControllers.getAllProduk);
// GET BY ID
router.get('/produk/:id', produkControllers.getProdukById);
// GET BY Kategori
router.get('/produk/kategori/:nama_kategori', produkControllers.getProdukByKategori);
// POST
router.post('/produk', verifyToken, authorizeRoles(["admin"]),  produkControllers.createProduk);
// UPDATE
router.put('/produk/:id', verifyToken, authorizeRoles(["admin"]), produkControllers.updateProduk);
// DELETE
router.delete('/produk/:id', verifyToken, authorizeRoles(["admin"]), produkControllers.deleteProduk);

module.exports = router;