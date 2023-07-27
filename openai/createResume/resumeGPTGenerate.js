const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const promptManager = require('./resumePromptManager');

exports.organize = async (input) => {
    const request = await promptManager.getOrganizePrompt(input);
    console.log(request);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: request
    });

    const response = completion["data"]["choices"][0]["message"]["content"].replace(/\\n/g, '\\\\n');
    return JSON.parse(response);
}

