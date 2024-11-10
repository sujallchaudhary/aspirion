const Options = require('../models/optionModel');

const getOptions = async (req, res) => {
    try {
        const options = await Options.find();
        res.json({ success: true, status: 200, message: 'Options fetched successfully', data: options });
    } catch (error) {
        res.json({ success: false, status: 500, message: 'Internal server error', data: null });
    }
};
const addOptions = async (req, res) => {
    try {
        const options = await Options.create(req.body);
        res.json({ success: true, status: 201, message: 'Options added successfully', data: options });
    } catch (error) {
        res.json({ success: false, status: 500, message: 'Internal server error'+error, data: null });
    }
};

module.exports = { getOptions, addOptions };
