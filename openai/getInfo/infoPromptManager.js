const { modifyJsonFile } = require('modify-json-file');
const path = require('path');

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
        \n2. phone number
        \n3. personal email
        \n4. LinkedIn account username
        \n5. GitHub account username
        \n6. high school name
        \n7. high school graduation year
        \n8. high school GPA
        \n9. high school activity. For each activity, separately ask for
        \na. name of organization
        \nb. position in organization
        \nc. start month and year
        \nd. end month and year
        \ne. contribution and involvements
        \nf. ask if user wants to add another high school activity. If so, ask the previous questions again. If not, proceed to high school awards
        \n10. high school award. For each award, separately ask for
        \na. name of award
        \nb. issuing organization
        \nc. month and year attained
        \nd. award description
        \ne. ask if user wants to add another high school award. If so, ask the previous questions again. If not, proceed to test scores.
        \n11. test score. For each test score, separately ask for
        \na. name of test
        \nb. score attained
        \nc. month and year attained
        \nd. ask if user wants to add another test score. If so, ask the previous questions again
    `


exports.jobDefaultPrompt = ``