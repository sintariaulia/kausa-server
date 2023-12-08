const aboutUsModels = require('../models/aboutus.models');

exports.getAllAboutUs = async (req, res) => {
    try {
        const aboutus = await aboutUsModels.getAllAboutUs();
        res.json({
            status_code: 200,
            message: 'Get List About Us Successfully',
            datas: aboutus
        });
    } catch (error) {
        console.error('Error fetching About Us', error);
        res.status(500).json({
            message: 'Error Fetching About Us',
            error: error.message
        });
    }
}

exports.createAboutUs = async (req, res) => {
    const { title, story, gambar } = req.body;
    try {
        const aboutus = await aboutUsModels.createAboutUs(title, story, gambar);
        res.json({
            status_code: 201,
            message: 'About Us Added Successfully',
            datas: aboutus
        });
    } catch (error) {
        console.error('Error fetching About Us', error);
        res.status(500).json({
            message: 'Error Fetching About Us',
            error: error.message
        });
    }
}

exports.updateAboutUs = async (req, res) => {
    const { id } = req.params;
    const { story, gambar } = req.body;
    try {
        const aboutus = await aboutUsModels.updateAboutUs(id, story, gambar);
        res.json({
            status_code: 204,
            message: 'About Us Upadated Successfully',
            datas: aboutus
        });
    } catch (error) {
        console.error('Error Updating About Us', error);
        res.status(500).json({
            message: 'Error Updating About Us',
            error: error.message
        });
    }
}

exports.deleteAboutUs = async (req, res) => {
    const { id } = req.params;
    try {
        await aboutUsModels.deleteAboutUs(id);
        res.json({
            status_code: 204,
            message: 'About Us Deleted Successfully'
        });
    } catch (error) {
        console.error('Error Deleting About Us', error);
        res.status(500).json({
            message: 'Error Deleting About Us',
            error: error.message
        });
    }
}