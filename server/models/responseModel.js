const mongoose = require('mongoose');
const responseSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    response:{
        type:Object,
        required:true,
    },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
