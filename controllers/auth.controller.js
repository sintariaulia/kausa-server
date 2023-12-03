require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authUserModels = require('../models/auth.model');

// Function Register
const registerUser = async (req, res) => {
    const {
        nama,
        role = "user",
        no_hp,
        email,
        password
    } = req.body;

    try {
        const existingUser = await authUserModels.getUserByEmail(email);  // Check email already exists
        if (existingUser) {
            return res.json({
                status_code: 409,
                message: 'Email Already Exists'
            });
        }
        // Create New User
        const user = await authUserModels.createUser(nama, role, no_hp, email, password);
        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        res.json({
            status_code: 201,
            message: 'Register User Successfully',
            user: {
                id: user.id,
                role: user.role,
                nama: user.nama,
                no_hp: user.no_hp,
                email: user.email,
                hashedPassword
            }
        });
    } catch (error) {
        console.log('Error Registering User', error);
        res.json({
            status_code: 500,
            error: 'Internal server error'
        });
    }
};

// Function for Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authUserModels.getUserByEmail(email);   // Search User By Email
        if (!user) {
            return res.json({
                status_code: 404,
                message: 'User Not Found'
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);    // Compare password - hashed password in database
        console.log("Test Password", passwordValid);
        if (passwordValid) {
            const payload = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role
            }
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1d' });  // Generate token JWT When Success Login
            res.json({
                status_code: 200,
                message: 'Login successful',
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                token
            });
        } else {
            return res.json({
                status_code: 401,
                message: 'Invalid Credential (Password Wrong!!)'
            });
        }
    } catch (error) {
        console.error('Error logging in', error);
        res.json({
            status_code: 500,
            error: 'Error logging in'
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
}