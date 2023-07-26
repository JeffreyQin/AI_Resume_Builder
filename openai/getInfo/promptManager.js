const { modifyJsonFile } = require('modify-json-file');
const path = require('path');
const chat = require('./chat.json');

exports.getPrompt = async (newPrompt) => {
    const prompt = chat.prompt;
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
        \n2. Social profile (Email, LinkedIn, GitHub)
        \n3. Education background (Highschool name, graduation year, diploma obtained)
    `

exports.jobDefaultPrompt = ``