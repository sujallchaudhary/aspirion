const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    answer:{
        type:Array,
        required:true,
    },
});

const Answer = mongoose.model('answers', answerSchema);

module.exports = Answer;