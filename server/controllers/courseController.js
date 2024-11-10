async function submitQuery(apiKey, sessionId, query) {
    try {
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": query,
                "pluginIds": ['plugin-1730259663'],
                "responseMode": "sync"
            })
        });
        return response.json();
    } catch (error) {
        console.error("Error in submitQuery:", error.message);
        return { success: false, error: error.message };
    }
}

const getResponse = async (req, res) => {
    try{
        const response = await submitQuery("zFiOXe4nSsuWMKbdHAJFVZ01nxnglqTC","6721ae68b0153989ce7ff3e1",`the user is interested in software engineering and has experience in Java and Python programming languages. Suggest a suitable suitable course for the user.just give the output in json array format do not add any new line character it should be in proper json format. format {"courseName":"","courseLink":"","courseDuration":"","courseDescription":""} recommend atleast 3 courses the links should be working.`);
        const parsedData = JSON.parse(response.data.answer.replace(/\\/g, ""));

        if(!response){
            return res.status(404).json({success:false,status:404,message:"No response found",data:null});
        }

        return res.status(200).json({success:true,status:200,message:"Response fetched successfully",data:parsedData});

    }
    catch(error){
        return res.status(500).json({success:false,status:500,message:'Internal Server error'+error,data:null});
    }
};

module.exports = { getResponse };