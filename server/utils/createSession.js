async function createChatSession() {
    const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey':"sbWeRardowbFXliIC7FJEiCU3qYXUcIm"
        },
        body: JSON.stringify({
            "pluginIds": ['plugin-1730259663','plugin-1730259808','plugin-1730259134','plugin-1726230157'],
            "externalUserId": "plugin-1730259663"
        })
    });

    const data = await response.json();
    console.log(data.data.id)
    return data.data.id;
}
module.exports = { createChatSession };