const { Configuration, OpenAIApi } = require('openai');
const promptManager = require('./promptManager');
require('dotenv').config();

exports.generate = async (input) => {
    const request = await promptManager.getPrompt(input);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: request
    });
    
    const response = completion["data"]["choices"][0]["message"]["content"].replace(/\\n/g, '\\\\n');
    promptManager.updatePrompt(request, response);
    return response;
}