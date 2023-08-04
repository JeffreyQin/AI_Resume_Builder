
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
    \n3. If some information is not provided by user, fill in the corresponding fields with "n.a."
    \n4. Important: make sure the completion is exactly a JSON object, do not include anything else.
    \nAttributes:
    \n1. name
    \n2. field of interest
    \n3. phone number
    \n4. personal email (include domain)
    \n5. LinkedIn account username 
    \n6. GitHub account username
    \n7. personal website
    \n8. high school name (include 'Secondary School')
    \n9. high school starting year
    \n10. high school graduation year (in YYYY format)
    \n11. high school GPA (number only, to one decimal place)
    \n12. high school activities
    \n13. high school awards 
    \n14. test scores 
    \nAdditional instruction for "high school activities": return an array of JSON, each corresponds to one activity and contains exactly 5 attributes:
    \n1. organization name
    \n2. position
    \n3. start date (in MM/YYYY format)
    \n4. end date (in MM/YYYY format)
    \n5. description (an array of at most 3 strings, each of which is a resume bullet point formally written with strong verbs and vocabularies)
    \nAdditional instructions for "high school awards": return an array of JSON, each corresponds to one award and contains exactly 4 attributes:
    \n1. award name
    \n2. organization
    \n3. date attained (in MM/YYYY format)
    \n4. description (formally written with strong verbs and vocabularies)
    \nAdditional instructions for "test scores": return an array of JSON, each corresponds to one test score and contains exactly 3 attributes:
    \n1. test name
    \n2. score attained (number only)
    \n3. date attained (in MM/YYYY format)
`

const uploadSumInstruction = 'The text below is scanned from a pdf document, where each line break represents a newline on the document. Summarize the document based on the text, and return a JSON only. The text:'