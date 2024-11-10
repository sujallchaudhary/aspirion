const Question = require("../models/questionModel");
const fetchQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        if (!questions) {
            return res.status(404).json({ success: false, status: 404, message: "No questions found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Questions fetched successfully", data: questions });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};
const fetchQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ success: false, status: 404, message: "Question not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Question fetched successfully", data: question });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
        
    }
};
const createQuestion = async (req, res) => {
    const { questionText,type,category,explaination } = req.body;
    try {
        const question = await Question.create({ questionText, type, category, explaination });
        return res.status(201).json({ success: true, status: 201, message: "Question created successfully", data: question });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndUpdate(id, req.body);
        if (!question) {
            return res.status(404).json({ success: false, status: 404, message: "Question not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Question updated successfully", data: question });
    } catch(error){
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};
const deleteQuestion = async (req, res) => {
    try{
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ success: false, status: 404, message: "Question not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Question deleted successfully", data: question });

    }catch(error){
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};

module.exports = { fetchQuestions, fetchQuestion, createQuestion, updateQuestion, deleteQuestion };