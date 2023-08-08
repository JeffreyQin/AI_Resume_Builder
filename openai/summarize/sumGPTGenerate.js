const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const promptManager = require('./sumPromptManager');

exports.summarize = async (input, option) => {
    var request;
    if (option == 0) {
        request = await promptManager.chatGetPrompt(input);
    } else {
        request = await promptManager.uploadGetPrompt(input);
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: request
    })
    const response = completion["data"]["choices"][0]["message"]["content"].replace(/\\n/g, '\\\\n');
    return JSON.parse(response);
}