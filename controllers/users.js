const userModels = require("../models/users");
const bcrypt = require('bcrypt');
const authUserModels = require('../models/auth.model');

exports.getAllUsers = async (req, res) => {
    try {
        const user = await userModels.getAllUsers();
        res.json({
            status_code: 200,
            message: 'Get List Users Successfully',
            datas: user
        });
    } catch (error) {
        console.error('Error fetching Users', error);
        res.status(500).json({
            message: 'Error Fetching Users',
            error: error.message
        });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModels.getUserById(id);
        if (user) {
            res.json({
                status_code: 200,
                message: 'Get User By Id Successfully',
                datas: user
            });
        } else {
            res.json({
                status_code: 404,
                message: 'User Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Users', error);
        res.status(500).json({
            message: 'Error Fetching Users',
            error: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { nama, no_hp } = req.body;
        const user = await userModels.updateUser(id, nama, no_hp);
        res.json({
            status_code: 204,
            message: 'Produk Upadated Successfully',
            datas: user
        });
    } catch (error) {
        console.error('Error Updating User', error);
        res.status(500).json({
            message: 'Error Updating User',
            error: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userModels.deleteUser(id);
        res.json({
            status_code: 204,
            message: 'User Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting User', error);
        res.status(500).json({
            message: 'Error Deleting User',
            error: error.message
        });
    }
}

exports.createUser = async (req, res) => {
    const { nama, role, no_hp, email, password } = req.body;
    try {
        // Cek apakah ada email yang sama telah terdaftar
        const existingUser = await authUserModels.getUserByEmail(email);  // Check email already exists
        if (existingUser) {
            return res.json({
                status_code: 409,
                message: 'Email Already Exists'
            });
        }

        const newUser = await userModels.createUser(nama, role, no_hp, email, password);
        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        res.json({
            status_code: 201,
            message: 'User Added Successfully By Admin',
            datas: {
                id: newUser.id,
                role: newUser.role,
                nama: newUser.nama,
                no_hp: newUser.no_hp,
                email: newUser.email,
                hashedPassword
            }
        });
    } catch (error) {
        console.error('Error Creating User By Admin', error);
        res.status(500).json({
            message: 'Error Creating User By Admin',
            error: error.message
        });
    }
}