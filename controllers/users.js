const userModels = require("../models/users");

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

// exports.createUser = async (req, res) => {
//     try {
//         const { nama, role, no_hp, email, password } = req.body;
//         const newUser = await userModels.createUser(nama, role, no_hp, email, password);
//         res.json({
//             status_code: 201,
//             message: 'User Added Successfully',
//             datas: newUser
//         });
//     } catch (error) {
//         console.error('Error Creating User', error);
//         res.status(500).json({
//             message: 'Error Creating User',
//             error: error.message
//         });
//     }
// }