const {createChatSession} = require('../utils/createSession');
const {chatBot} = require('../utils/chatBot');
const chatSession = async (req, res) => {
    try {
        const sessionId= await createChatSession();
        if(!sessionId){
            return res.status(400).json({success:false,status:400,message:"session not created"});
        }
        return res.status(200).json({success:true,status:200,message:"session created successfully",sessionId});
        
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:"internal server error"+error});
        
    }
};

const chatQuery = async (req, res) => {
    try {
        const {sessionId,query}=req.body;
        if(!sessionId || !query){
            return res.status(400).json({success:false,status:400,message:"sessionId and query are required"});
        }
        const response= await chatBot(sessionId,query);
        if(!response){
            return res.status(400).json({success:false,status:400,message:"response not found"});
        }
        return res.status(200).json({success:true,status:200,message:"response get successfully.","response":response});
        
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:"internal server error"+error});
        
    }
};

module.exports = { chatSession,chatQuery };