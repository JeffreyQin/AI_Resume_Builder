
exports.chatGetPrompt = async (chat) => {
    chat = chat.slice(2);
    chat.push({
        "role": "user",
        "content": chatSumInstruction
    });
    return chat;
}

exports.uploadGetPrompt = async (text) => {
    var instruction = uploadSumInstruction;
    for (line of text) {
        instruction += `\n${line}`;
    }
    const prompt = [{
        "role": "user",
        "content": instruction
    }];
    return prompt;
}

const chatSumInstruction = `
    Based on user's input from the existing conversation, return a JSON that only contains the following attributes about the user.
    \nName
    \nAge
    \nHigh school name
    Do not include any additional information
`

const uploadSumInstruction = 'The text below is scanned from a pdf document, where each line break represents a newline on the document. Summarize the document based on the text, and return a JSON only. The text:'