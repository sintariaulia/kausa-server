const pesananModels = require("../models/pesanan.models");

exports.getAllPesanan = async (req, res) => {
    try {
        const { user_id } = req.query;
        let pesanan;

        if (user_id) {
            pesanan = await pesananModels.getPesananByUser(user_id);
        } else {
            pesanan = await pesananModels.getAllPesanans();
        }

        res.json({
            status_code: 200,
            message: 'Get List Pesanan Successfully',
            datas: pesanan
        });
    } catch (error) {
        console.error('Error Fetching Data Pesanan', error);
        res.status(500).json({
            message: 'Error Fetching Data Pesanan',
            error: error.message
        });
    }
};

exports.getPesananByUserId = async (req, res) => {
    try {
        const { user_id } = req.query;
        let pesanan;

        if (user_id) {
            // Assuming you have a function in pesananModels to get orders by user ID
            pesanan = await pesananModels.getPesananByUser(user_id);
        } else {
            // Assuming you have a function in pesananModels to get all orders
            pesanan = await pesananModels.getAllPesanans();
        }

        res.json({
            status_code: 200,
            message: 'Get List Pesanan Successfully',
            datas: pesanan
        });
    } catch (error) {
        console.error('Error Fetching Data Pesanan', error);
        res.status(500).json({
            message: 'Error Fetching Data Pesanan',
            error: error.message
        });
    }
};

exports.getPesananById = async (req, res) => {
    const { id } = req.params;
    try {
        const pesanan = await pesananModels.getPesananById(id);
        if (pesanan) {
            res.json({
                status_code: 200,
                message: 'Get Pesanan By Id Successfully',
                datas: pesanan
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Produk Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Pesanan', error);
        res.status(500).json({
            message: 'Error Fetching Pesanan',
            error: error.message
        });
    }
};

exports.createPesanan = async (req, res) => {
    try {
        const { user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan } = req.body;
        const newPesanan = await pesananModels.createPesanan(user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan);
        res.json({
            status_code: 201,
            message: "Pesanan Added Successfully",
            datas: newPesanan
        });
    } catch (error) {
        console.error('Error Creating Pesanan', error);
        res.status(500).json({
            message: 'Error Creating Pesanan',
            error: error.message
        });
    }
};

exports.updatePesanan = async (req, res) => {
    const { id } = req.params;
    try {
        const { total_harga, status_pesanan } = req.body;
        const pesanan = await pesananModels.updatePesanan(id, total_harga, status_pesanan);
        res.json({
            status_code: 204,
            message: 'Pesanan Upadated Successfully',
            datas: pesanan
        });
    } catch (error) {
        console.error('Error Updating Pesanan', error);
        res.status(500).json({
            message: 'Error Updating Pesanan',
            error: error.message
        });
    }
};

exports.deletePesanan = async (req, res) => {
    const { id } = req.params;
    try {
        await pesananModels.deletePesanan(id);
        res.json({
            status_code: 204,
            message: 'Pesanan Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting Pesanan', error);
        res.status(500).json({
            message: 'Error Deleting Pesanan',
            error: error.message
        });
    }
};