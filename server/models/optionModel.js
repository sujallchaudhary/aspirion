const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
    options:{
        type:Array,
        required:true,
    }
});

const Options = mongoose.model('Options', optionsSchema);

module.exports = Options;