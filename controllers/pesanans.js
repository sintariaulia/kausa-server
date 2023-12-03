const pesananModels = require("../models/pesanan.models");

exports.getAllPesanan = async (req, res) => {
    try {
        const produk = await pesananModels.getAllPesanans();
        res.json({
            status_code: 200,
            message: 'Get List Pesanan Successfully',
            datas: produk
        });
    } catch (error) {
        console.error('Error Fetching Data Pesanan', error);
        res.status(500).json({
            message: 'Error Fetching Data Pesanan',
            error: error.message
        });
    }
};

exports.getPesananById = (req, res) => {

};

exports.createPesanan = (req, res) => {

};

exports.updatePesanan = (req, res) => {

};

exports.deletePesanan = (req, res) => {

};