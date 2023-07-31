const { modifyJsonFile } = require('modify-json-file');
const path = require('path');
const msgManager = require('../../msgManager.json');

exports.getPrompt = async (newPrompt) => {
    const prompt = require('./chat.json').prompt;
    prompt.push({ "role": "user", "content": newPrompt });
    return prompt;
}

exports.updatePrompt = async (newPrompt, newCompletion) => {
    newPrompt.push({ "role": "assistant", "content": newCompletion })
    await modifyJsonFile(
        path.join(__dirname, 'chat.json'),
        {
            prompt: newPrompt
        }
    )
}

exports.backPrompt = async () => {
    const modifiedPrompt = require('./chat.json').prompt;
    modifiedPrompt.pop();
    modifiedPrompt.pop();
    await modifyJsonFile(
        path.join(__dirname, 'chat.json'),
        { 
            prompt: modifiedPrompt
        }
    )
}

exports.resetPrompt = async (option) => {
    await modifyJsonFile(
        path.join(__dirname, 'chat.json'),
        {
            prompt: getDefaultPrompt(option)
        }
    )
}

function getDefaultPrompt(option) {
    if (option == 0) {
        return [{
            "role": "system",
            "content": "You are to help the user build their resume for college application. Be enthusiastic but concise."
        }];
    } else {
        return [{
            "role": "system",
            "content": "You are to help the user build their resume for job application. Be enthusiastic but concise."
        }]
    }
}


exports.collegeDefaultPrompt = `
        Instruction:
        \nIn the completion, proactively ask the user for the information needed (indicated below), one at a time. Ask again if the user fails to provide the required information in their next prompt.
        \nInformation needed:
        \n1. Name
        \nWhen all information is obtained, respond with'${msgManager.COLLEGE_RESUME_INFO_READY}'.
    `

exports.jobDefaultPrompt = ``