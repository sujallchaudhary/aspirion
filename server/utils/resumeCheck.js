require('dotenv').config();

async function uploadFile(sessionId,url) {
    try {
        const response = await fetch('https://api.on-demand.io/media/v1/public/file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "createdBy": "sujal",
                "updatedBy": "sujal",
                "sessionId": sessionId,
                "url": url,
                "name": "test.pdf",
                "plugins": [
                    "plugin-1713954536","plugin-1713962163","plugin-1730259663"
                ],
                "sizeBytes": 0,
                "responseMode": "sync"
            })
        });
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in uploadFile:", error.message);
        return { success: false, error: error.message };
    }
}

async function resumeCheck(sessionId,url) {
    try {
        const fileData = await uploadFile(sessionId,url);
        const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.OD_API_KEY
            },
            body: JSON.stringify({
                "endpointId": "predefined-openai-gpt4o",
                "query": `I have uploaded a resume. Please check the document for the following:
1. **Overall Formatting**: Assess if the resume follows a clear and professional layout with correct font sizes, consistent headings, alignment, and spacing.
2. **Content Structure**: Verify if the resume includes essential sections such as Contact Information, Objective or Summary, Experience, Education, Skills, and any other relevant details. Check for clarity, relevance, and structure in each section.
3. **Language and Grammar**: Ensure there are no grammatical errors, typos, or awkward phrasing, and verify that the language is formal and impactful.
4. **Relevance and Effectiveness**: Evaluate if the listed experiences and skills are presented in a way that aligns with common industry standards. Provide insights on how to enhance relevance based on common hiring preferences.

If you find any issues, please provide a clear, step-by-step feedback guide with corrections to improve the resume. If possible, suggest sample text or improvements that would make the resume more compelling for potential employers.

Output your feedback in JSON format do not add any extra information other than as mentioned with the following structure:
{
    "feedback": {
        "formatIssues": ["..."],
        "contentSuggestions": ["..."],
        "grammarIssues": ["..."],
        "effectivenessTips": ["..."]
    },
    "sampleCorrections": {
        "sectionName": "Suggested correction or sample text"
    }
}`,
                "pluginIds": ['plugin-1730259663',"plugin-1713962163"],
                "responseMode": "sync"
            })
        });
        
        const data = await response.json();
        console.log(data);
        const answer = data.data.answer.replace(/\\/g, "").replace(/```json|```/g, "");
        const parsedData = JSON.parse(answer);
        return parsedData;

    } catch (error) {
        console.error("Error in reviewResume:", error.message);
        return { success: false, error: error.message };
    }
}
module.exports = { resumeCheck };

