require('dotenv').config();
async function submitQuery(query,sessionId) {
    const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.OD_API_KEY
        },
        body: JSON.stringify({
            "endpointId": "predefined-openai-gpt4o",
            "query": query,
            "pluginIds": ["plugin-1730259134"],
            "responseMode": "sync"
        })
    });

    const data = await response.json();
    return data.data.answer;
}

module.exports = { submitQuery };
