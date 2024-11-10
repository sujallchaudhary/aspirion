const Answer = require("../models/answerModel");
const fetchAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        const answer = await Answer.findById(id);
        if (!answer) {
            return res.status(404).json({ success: false, status: 404, message: "Answer not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Answer fetched successfully", data: answer });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};
const fetchAnswers = async (req, res) => {
    try{
        const answers = await Answer.find({userId:req.query.id});
        if(!answers){
            return res.status(404).json({success:false,status:404,message:"No answers found",data:null});
        }
        return res.status(200).json({success:true,status:200,message:"Answers fetched successfully",data:answers});
    }
    catch(error){
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
};

const createAnswer = async (req, res) => {
    try {
        const { _id,answer} = req.body;
        const answerCreated = await Answer.create({ userId:_id,answer});
        if (!answerCreated) {
            return res.status(400).json({ success: false, status: 400, message: "Answer not created", data: null });
        }
        return res.status(201).json({ success: true, status: 201, message: "Answer created successfully", data: answerCreated });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message:'internal sever error'+error, data: null });
        
    }
};
const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findByIdAndUpdate(id, req.body);
        if (!answer) {
            return res.status(404).json({ success: false, status: 404, message: "Answer not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Answer updated successfully", data: answer });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
        
    }
};
const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findByIdAndDelete(id);
        if (!answer) {
            return res.status(404).json({ success: false, status: 404, message: "Answer not found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Answer deleted successfully", data: answer });
    } catch(error){
        return res.status(500).json({ success: false, status: 500, message: error, data: null });
    }
};

module.exports = { fetchAnswer, fetchAnswers, createAnswer, updateAnswer, deleteAnswer };