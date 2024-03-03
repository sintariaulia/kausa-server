const produkModels = require("../models/produk");
const fs = require("fs");
const upload = require('../config/multer')

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

exports.getProdukByKategori = async (req, res) => {
    const { nama_kategori } = req.params;
    try {
        const produk = await produkModels.getProdukByKategori(nama_kategori);
        if (produk.length > 0) {
            res.json({
                status_code: 200,
                message: 'Get Produk By Kategori Successfully',
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

// Controller Create Produk URL (TIDAK DIGUNAKAN LAGI)
exports.createProduk = async (req, res) => {
    try {
        const { kategori_id, nama_produk, deskripsi, harga, gambar } = req.body;
        const newProduk = await produkModels.createProduk(kategori_id, nama_produk, deskripsi, harga, gambar);
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

// Controller Create Produk Upload file
exports.createProdukNew = async (req, res) => {
    const { kategori_id, nama_produk, deskripsi, harga } = req.body;
    const produkFile = req.file;

    // Set the bukti image path in the blog data
    let produkImagePath = "";
    if (produkFile) {
        produkImagePath = `/produkGambar/${produkFile.filename}`;
    }

    try {
        const createdProducts = await produkModels.createProdukNew(kategori_id, nama_produk, deskripsi, harga, produkImagePath);
        res.status(200).json(createdProducts);
    } catch (error) {
        console.error('Error creating products:', error.message);
        res.status(500).json({
            message: 'Error creating products',
            error: error.message,
        });
    }
}

exports.updateProduk = async (req, res) => {
    const { id } = req.params;
    const { nama_produk, deskripsi, harga } = req.body;
    const produkFile = req.file;

    let produkImagePath = "";
    if (produkFile) {
        produkImagePath = `/produkGambar/${produkFile.filename}`;
    }
    try {
        const updateProduk = await produkModels.updateProduk(id, nama_produk, deskripsi, harga, produkImagePath);
        res.json({
            status_code: 204,
            message: 'Produk Upadated Successfully',
            datas: updateProduk
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