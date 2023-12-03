const express = require('express');
const router = express.Router();
const kategoriControllers = require('../controllers/kategoris');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// GET
router.get('/kategori', kategoriControllers.getAllKategori);
// GET BY ID
router.get('/kategori/:id', kategoriControllers.getKategoriById);
// POST
router.post('/kategori', verifyToken, authorizeRoles(["admin"]), kategoriControllers.createKategori);
// UPDATE
router.put('/kategori/:id', verifyToken, authorizeRoles(["admin"]), kategoriControllers.updateKategori);
// DELETE
router.delete('/kategori/:id', verifyToken, authorizeRoles(["admin"]), kategoriControllers.deleteKategori);

module.exports = router;