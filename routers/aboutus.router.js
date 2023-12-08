const express = require('express');
const router = express.Router();
const {
    getAllAboutUs,
    createAboutUs,
    updateAboutUs,
    deleteAboutUs
} = require('../controllers/aboutus.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

// GET
router.get('/aboutus', getAllAboutUs);
// POST
router.post('/aboutus', createAboutUs);
// UPDATE
router.put('/aboutus/:id', updateAboutUs);
// DELETE
router.delete('/aboutus/:id', deleteAboutUs);

module.exports = router;