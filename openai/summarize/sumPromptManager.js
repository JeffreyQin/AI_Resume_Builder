
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
    \n1. Based on user's inputs from the conversation, return a JSON that contains exactly the attributes indicated below.
    \n2. Specification on each attribute is indicated in brackets after attribute name.
    \n3. If some information is not provided by user, fill in the corresponding fields with 'n.a.'
    \n4. Important: make sure the completion is entirely a JSON object, do not include anything else.
    \nAttributes:
    \n1. name
    \n2. phone number
    \n3. personal email (include domain)
    \n4. LinkedIn account username 
    \n5. Github account username
    \n6. high school name (include 'Secondary School)
    \n7. high school graduation year (in YYYY format)
    \n8. high school GPA (a number to one decimal place)
    \n9. high school activities
    \n10. high school awards 
    \n11. test scores 
    \nAdditional instructions for "high school activities": return an array of JSON, each corresponds to one activity and contains exactly 5 attributes:
    \n1. organization name
    \n2. position
    \n3. start date (in MM/YYYY format)
    \n4. end date (in MM/YYYY format)
    \n5. description (in an array of 2 to 3 strings, each of which is formally written with professional verbs and vocabularies)
    \nAdditional instructions for "high school awards": return an array of JSON, each corresponds to one award and contains exactly 4 attributes:
    \n1. award name
    \n2. organization
    \n3. date attained (in MM/YYYY format)
    \n4. description (formally written with professional verbs and vocabularies)
    \nAdditional instructions for "test scores": return an array of JSON, each corresponds to one test score and contains exactly 3 attributes:
    \n1. test name
    \n2. score attained (number only)
    \n3. date attained (in MM/YYYY format)
`

const uploadSumInstruction = 'The text below is scanned from a pdf document, where each line break represents a newline on the document. Summarize the document based on the text, and return a JSON only. The text:'