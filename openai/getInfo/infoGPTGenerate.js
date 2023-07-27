const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const promptManager = require('./infoPromptManager');

exports.generate = async (input) => {
    const request = await promptManager.getPrompt(input);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: request
    });

    const response = completion["data"]["choices"][0]["message"]["content"].replace(/\\n/g, '\\\\n');
    promptManager.updatePrompt(request, response);
    return response;
}