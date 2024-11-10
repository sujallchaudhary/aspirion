const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText:{
        type:String,
        required:true,
        trim:true,
    },
    parameter:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    explanation:{
        type:String,
        required:true,
    },
    options:{
        type:Array,
        required:true,
    },
    correctAnswer:{
        type:String,
        required:false,
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;