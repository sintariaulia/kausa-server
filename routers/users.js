const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/users');
const { verifyToken, authorizeRoles } = require('../middleware/auth.middleware');

router.get('/user', verifyToken, authorizeRoles(["admin", "user"]), userControllers.getAllUsers);
router.get('/user/:id', verifyToken, authorizeRoles(["admin"]), userControllers.getUserById);
router.delete('/user/:id', verifyToken, authorizeRoles(["admin"]), userControllers.deleteUser);
router.put('/user/:id', verifyToken, authorizeRoles(["admin"]), userControllers.updateUser);

module.exports = router;