require('dotenv').config();

async function chatBot(sessionId, query) {
    try {
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": `You are an intelligent career guidance bot designed to assist users with all types of career-related queries. Respond accurately and thoughtfully to each user query related to career paths, job opportunities, skill-building, industry insights, education, and professional development. The user's query is: ${query}`,
                "responseMode": "sync"
            })
        });
        
        const data = await response.json();
        const answer = data.data.answer
        return answer;

    } catch (error) {
        console.error("Error in chatBot:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { chatBot };