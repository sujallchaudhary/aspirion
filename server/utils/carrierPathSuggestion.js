require('dotenv').config();
async function suggestCareerPath(sessionId, modelResponse) {
    try {
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": `The career recommended by the AI model for the user is ${modelResponse}. Based on this recommendation, suggest a suitable industry and break down the individuals strengths, preferences, and tendencies relevant to this industry. Organize the output in a JSON format that includes a recommended industry and an array of key points highlighting the individual's qualities. Each key point should have the following fields:
- attribute: The name of the attribute (e.g., Problem Solving Approach).
- value: The level or specific nature of this attribute (e.g., Experimental, Moderate).
- description: A brief summary of the attribute.
- industryValue: How this attribute benefits the individual in the context of the recommended industry.
include nothing other than the above-mentioned fields in the JSON array.

Output in this JSON format:
{
    "recommendedIndustry": "Suggested Industry",
    "keypoints": [
        {
            "attribute": "",
            "value": "",
            "description": "",
            "industryValue": ""
        }
    ]
}

Ensure the suggested industry and key points align with the individual's strengths and are suited for their career development.`,
                "pluginIds": ['plugin-1730259663'],
                "responseMode": "sync"
            })
        });
        
        const data = await response.json();
        const answer = data.data.answer.replace(/\\/g, "").replace(/```json|```/g, "");
        const parsedData = JSON.parse(answer);
        return parsedData;

    } catch (error) {
        console.error("Error in suggestCareerPath:", error.message);
        return { success: false, error: error.message };
    }
}
module.exports = { suggestCareerPath };