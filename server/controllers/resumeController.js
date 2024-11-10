const {resumeCheck} = require('../utils/resumeCheck');
const {createChatSession} = require('../utils/createSession');
const Resume = require('../models/resumeModel');

const checkResume = async (req, res) => {
    const {file} = req.body;
    try {
        const sessionId= await createChatSession();
        const response = await resumeCheck(sessionId,file);
        if(!response){
            return res.status(400).json({success:false,status:400,message:"Resume not created",data:null});
        }
        return res.status(201).json({success:true,status:201,message:"Resume created successfully",data:response});
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
};

const getResume = async (req, res) => {
    try {
        const resume = await Resume.find({userId:req.query.id});
        if(!resume){
            return res.status(404).json({success:false,status:404,message:"No resume found",data:null});
        }
        return res.status(200).json({success:true,status:200,message:"Resume fetched successfully",data:resume});
    }
    catch(error){
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
}

module.exports = {checkResume,getResume};