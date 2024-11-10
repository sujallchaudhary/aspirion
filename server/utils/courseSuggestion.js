require('dotenv').config();
async function courseSuggestion(sessionId,modelResponse) {
    try {
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": `The carrier recommended by the AI model for the user is ${modelResponse}. Based on this recommendation, suggest at least six relevant courses that will help the user excel in this field. For each course, include the following details in JSON array format, without any line breaks:courseName: Name of the course.courseLink: Direct link to the course page.courseDuration: Duration of the course (e.g., hours, weeks).courseDescription: Brief summary of the course content, focusing on how it supports the career path.Output in this JSON format:[{"courseName":"","courseLink":"","courseDuration":"","courseDescription":""}]
Please ensure that the course links are valid and provide comprehensive, high-quality content in alignment with the AI-recommended career field.`,
                "pluginIds": ['plugin-1730259663'],
                "responseMode": "sync"
            })
        });
        const data = await response.json();
        const answer = data.data.answer.replace(/\\/g, "").replace(/```json|```/g, "");
        const parsedData = JSON.parse(answer);
        return parsedData;
    } catch (error) {
        console.error("Error in submitQuery:", error.message);
        return { success: false, error: error.message };
    }
}
module.exports = { courseSuggestion };
