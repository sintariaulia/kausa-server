const produkModels = require("../models/produk");

exports.getAllProduk = async (req, res) => {
    try {
        const produk = await produkModels.getAllProduk();
        res.json({
            status_code: 200,
            message: 'Get List Produk Successfully',
            datas: produk
        });
    } catch (error) {
        console.error('Error Fetching Product', error);
        res.status(500).json({
            message: 'Error Fetching Product',
            error: error.message
        });
    }
};

exports.getProdukById = async (req, res) => {
    const { id } = req.params;
    try {
        const produk = await produkModels.getProdukById(id);
        if (produk) {
            res.json({
                status_code: 200,
                message: 'Get Produk By Id Successfully',
                datas: produk
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Produk Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Produk', error);
        res.status(500).json({
            message: 'Error Fetching Produk',
            error: error.message
        });
    }
};

exports.createProduk = async (req, res) => {
    try {
        const { kode_produk, kategori_id, nama_produk, deskripsi,  harga, gambar } = req.body;
        const newProduk = await produkModels.createProduk(kode_produk, kategori_id, nama_produk, deskripsi,  harga, gambar);
        res.json({
            status_code: 201,
            message: 'Produk Added Successfully',
            datas: newProduk
        });
    } catch (error) {
        console.error('Error Creating Produk', error);
        res.status(500).json({
            message: 'Error Creating Produk',
            error: error.message
        });
    }
};

exports.updateProduk = async (req, res) => {
    const { id } = req.params;
    try {
        const { nama_produk, deskripsi, harga, gambar } = req.body;
        const produk = await produkModels.updateProduk(id, nama_produk, deskripsi, harga, gambar);
        res.json({
            status_code: 204,
            message: 'Produk Upadated Successfully',
            datas: produk
        });
    } catch (error) {
        console.error('Error Updating Produk', error);
        res.status(500).json({
            message: 'Error Updating Produk',
            error: error.message
        });
    }
};

exports.deleteProduk = async (req, res) => {
    const { id } = req.params;
    try {
        await produkModels.deleteProduk(id);
        res.json({
            status_code: 204,
            message: 'Produk Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting Produk', error);
        res.status(500).json({
            message: 'Error Deleting Produk',
            error: error.message
        });
    }
};