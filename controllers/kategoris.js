const kategoriModels = require("../models/kategori");

exports.getAllKategori = async (req, res) => {
    try {
        const kategori = await kategoriModels.getAllKategori();
        res.json({
            status_code: 200,
            message: 'Get List Kategori Successfully',
            datas: kategori
        });
    } catch (error) {
        console.error('Error fetching Kategori', error);
        res.status(500).json({
            message: 'Error Fetching Kategori',
            error: error.message
        });
    }
};

exports.getKategoriById = async (req, res) => {
    const { id } = req.params;
    try {
        const kategori = await kategoriModels.getKategoriById(id);
        if (kategori) {
            res.json({
                status_code: 200,
                message: 'Get Kategori By Id Successfully',
                datas: kategori
            });
        } else {
            res.json({
                status_code: 404,
                message: 'Kategori Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching Kategori', error);
        res.status(500).json({
            message: 'Error Fetching Kategori',
            error: error.message
        });
    }
};

exports.createKategori = async (req, res) => {
    const { nama_kategori } = req.body;
    try {
        const kategori = await kategoriModels.createKategori(nama_kategori);
        res.json({
            status_code: 201,
            message: 'Kategori Added Successfully',
            datas: kategori
        });
    } catch (error) {
        console.error('Error Creating Kategori', error);
        res.status(500).json({
            message: 'Error Creating Kategori',
            error: error.message
        });
    }
};

exports.updateKategori = async (req, res) => {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    try {
        const kategori = await kategoriModels.updateKategori(id, nama_kategori);
        res.json({
            status_code: 204,
            message: 'Kategori Upadated Successfully',
            datas: kategori
        });
    } catch (error) {
        console.error('Error Updating Kategori', error);
        res.status(500).json({
            message: 'Error Updating Kategori',
            error: error.message
        });
    }
};

exports.deleteKategori = async (req, res) => {
    const { id } = req.params;
    try {
        await kategoriModels.deleteKategori(id);
        res.json({
            status_code: 204,
            message: 'Kategori Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting Kategori', error);
        res.status(500).json({
            message: 'Error Deleting Kategori',
            error: error.message
        });
    }
};