const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    resumeLink:{
        type:String,
        required:true
    },
    modelResponse:{
        type:Object,
        required:true
    }
});

const Resume = mongoose.model('Resume',resumeSchema);

module.exports = Resume;
