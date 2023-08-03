
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
    \n1. Based on user's inputs from the conversation, return a JSON that contains exactly the attributes indicated below (specifications are indicated in brackets).
    \n2. If some information is not provided by user, fill in the corresponding fields with 'n.a.'
    \nAttributes:
    \n1. name
    \n2. phone number
    \n3. personal email (include domain)
    \n4. LinkedIn account username
    \n5. Github account username
    \n6. high school name
    \n7. high school graduation year (YYYY)
    \n8. high school GPA (a number to one decimal place)
    \n9. high school activities (an array of JSON, where each JSON corresponds to one activity and contains 5 attributes: "organization name", "position", "start date", "end date", "involvements")  
    \n10. high school awards (an array of JSON, where each JSON corresponds to one award and contains 4 attributes: "award name", "organization", "date attained", "description")  
    \n11. test scores (an array of JSON, where each JSON corresponds to one test score and contains 3 attributes: "test name:, "score", "date attained")                                                                    
`

const uploadSumInstruction = 'The text below is scanned from a pdf document, where each line break represents a newline on the document. Summarize the document based on the text, and return a JSON only. The text:'