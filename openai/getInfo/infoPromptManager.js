const { modifyJsonFile } = require('modify-json-file');
const path = require('path');
const fs = require('fs');

exports.getPrompt = async (newPrompt) => {
    const promptStr = fs.readFileSync(path.join(__dirname, 'chat.json'), 'utf8');
    const prompt = JSON.parse(promptStr).prompt;
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
    const modifiedPromptStr = fs.readFileSync(path.join(__dirname, 'chat.json'), 'utf8');
    const modifiedPrompt = JSON.parse(modifiedPromptStr).prompt;
    modifiedPrompt.pop();
    modifiedPrompt.pop();
    await modifyJsonFile(
        path.join(__dirname, 'chat.json'),
        { 
            prompt: modifiedPrompt
        }
    );
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
        \n1. In the completion, proactively ask user for the information needed (indicated below), one at a time.
        \n2. Ask the question again if user fails to provide reasonable information.
        \n3. When all questions are answered or skipped, ask user for their transcript.
        \nInformation needed:
        \n1. name
        \n2. field of interest
        \n3. phone number
        \n4. personal email
        \n5. LinkedIn account username
        \n6. GitHub account username
        \n7. personal website
        \n8. high school name
        \n9. high school starting year
        \n10. high school graduation year
        \n11. name of graduation diploma
        \n12. high school activities. For each activity, separately ask for
        \na. name of organization
        \nb. position in organization
        \nc. start month and year
        \nd. end month and year
        \ne. contribution and involvements
        \nf. ask if user wants to add another high school activity. If so, ask the previous questions again. If not, proceed to high school awards.
        \n13. high school awards. For each award, separately ask for
        \na. name of award
        \nb. issuing organization
        \nc. month and year attained
        \nd. award description
        \ne. ask if user wants to add another high school award. If so, ask the previous questions again. If not, proceed to test scores.
        \n14. test scores. For each test score, separately ask for
        \na. name of test
        \nb. score attained
        \nc. month and year attained
        \nd. ask if user wants to add another test score. If so, ask the previous questions again. If not, proceed to transcript.
    `


exports.jobDefaultPrompt = ``