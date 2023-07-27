

exports.getOrganizePrompt = async (chat) => {
    chat = chat.slice(2);
    chat.push({
        "role": "user",
        "content": organizeIns
    });
    return chat;
}


const organizeIns = `
        Based on user's input from the existing conversation, return a JSON that contains the following attributes about the user.
        \nName
        \nAge
        \nHigh school name
        Do not include anything else in the completion
    `