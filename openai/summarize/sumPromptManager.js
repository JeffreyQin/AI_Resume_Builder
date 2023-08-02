
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
    Instruction:
    \n1. Based on user's input from the existing conversation, return a JSON that contains exactly the attributes indicated below.
    \n2. If the user did not provide any of the information, fill in the corresponding field with 'none'.
    \nAttributes
    \n1. name
    \n2. age
    \n3. personal email
    \n4. github account
    \n5. linkedin account
    \n6. high school name
    \n7. high school graduation year
    \n8. high school GPA
`

const uploadSumInstruction = 'The text below is scanned from a pdf document, where each line break represents a newline on the document. Summarize the document based on the text, and return a JSON only. The text:'