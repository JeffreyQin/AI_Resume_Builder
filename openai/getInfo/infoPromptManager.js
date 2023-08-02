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
            "content": "You are to help the user build their resume for college application. Be enthusiastic but short."
        }];
    } else {
        return [{
            "role": "system",
            "content": "You are to help the user build their resume for job application. Be enthusiastic but short."
        }]
    }
}

exports.collegeDefaultPrompt = `
        Instruction:
        \n1. In the completion, proactively ask the user for the information needed (indicated below), one at a time.
        \n2. Offer user the option to skip the current question by typing 'skip'.
        \n3. Ask the question again if the user fails to provide the required information.
        \n4. When all unskipped questions are answered, respond with'${msgManager.COLLEGE_RESUME_INFO_READY}'.
        \nInformation needed:
        \n1. name
        \n2. age
        \n3. personal email
        \n4. github account
        \n5. linkedin account
        \n6. high school name
        \n7. high school graduation year
        \n8. high school GPA
    `

exports.jobDefaultPrompt = ``