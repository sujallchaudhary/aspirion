require('dotenv').config();
async function collegeSuggestion(sessionId, modelResponse) {
    try {
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": `The career recommended by the AI model for the user is ${modelResponse}. Based on this recommendation, suggest at least six educational paths , including relevant degrees and colleges mainly indian, that will help the user reach this career. For each suggestion, include the following details in JSON array format, without any line breaks:
- degreeName: The name of the degree (e.g., Bachelors in Computer Science).
- collegeName: The name of a reputable college or university that offers this degree.
- location: Location of the college/university.
- degreeDuration: Duration of the degree program (e.g., years).
- degreeDescription: Brief summary of the degree program, focusing on how it supports the recommended career.

Output in this JSON format:
[{"degreeName":"","collegeName":"","location":"","degreeDuration":"","degreeDescription":""}]

Ensure that the suggestions are valid and provide high-quality educational paths aligned with the AI-recommended career field.`,
                "pluginIds": ['plugin-1726230157'],
                "responseMode": "sync"
            })
        });
        
        const data = await response.json();
        const answer = data.data.answer.replace(/\\/g, "").replace(/```json|```/g, "");
        const parsedData = JSON.parse(answer);
        return parsedData;
    } catch (error) {
        console.error("Error in suggestPath:", error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { collegeSuggestion };
