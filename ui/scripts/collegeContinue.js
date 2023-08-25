
const chatPanel = document.getElementById('chatPanel');
const uploadPanel = document.getElementById('uploadPanel');
const fileUpload = document.getElementById('fileUpload');
const readyButton = document.getElementById('readyButton');
const textArray = [];

const respondField = document.createElement('input');
const respondButton = document.createElement('button');
respondButton.innerHTML = 'Provide info';
const returnButton = document.createElement('button');
returnButton.innerHTML = 'Go back';
const exitButton = document.createElement('button');
exitButton.innerHTML = 'Quit';


document.addEventListener('DOMContentLoaded', async () => {
    uploadPanel.removeChild(fileUpload);
    uploadPanel.removeChild(readyButton);
    const result = await fetch('http://localhost:3000/college/getchat')
        .then(res => res.json())
        .then(res => res.chat);
    
     if (result[result.length - 1]['content'].toLowerCase().includes('transcript')) {
        alert('You have finished building your last resume, start a new one?')
        window.location.href = 'index.html';
    } else {
        loadProgress(result);
    }
});

respondButton.addEventListener('click', async () => {
    input = respondField.value;
    userPanelUpdate(input);

    const result = await fetch('http://localhost:3000/college/getinfo/forward', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            input: input
        })
    })
    .then(res => res.json());

    if (result.status == 1) {
        botPanelUpdate(result.message);
    } else {
        readyPanelUpdate(result.message);
    }
});

returnButton.addEventListener('click', async () => {
    chatPanel.removeChild(textArray[0]);
    chatPanel.removeChild(textArray[1]);
    textArray.shift();
    textArray.shift();
    if (textArray.length == 1) {
        returnButton.setAttribute('disabled', true);
    }
    await fetch('http://localhost:3000/college/getinfo/backward')
});

readyButton.addEventListener('click', async () => {
    const file = fileUpload.files[0];
    if (!file) {
        alert('Please upload a valid transcript.');
    } else {
        fileUpload.setAttribute('disabled', true);
        readyButton.setAttribute('disabled', true);
        exitButton.setAttribute('disabled', true);
        const formData = new FormData();
        formData.append('transcript', file);
        await fetch('http://localhost:3000/college/summarize', {
            method: "POST",
            body: formData,
        });
    }
    window.location.href = 'collegeResume.html';
});

exitButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function loadProgress(chat) {
    for (message of chat) {
        if (message['role'] == 'assistant') {
            const botText = document.createElement('p');
            botText.innerHTML = `<b>AI: </b>${message['content']}`;
            textArray.unshift(botText);
            chatPanel.appendChild(botText);
        } else {
            const userText = document.createElement('p');
            userText.innerHTML = `<b>You: </b>${message['content']}`;
            textArray.unshift(userText);
            chatPanel.appendChild(userText);
        }
    }
    chatPanel.appendChild(respondField);
    chatPanel.appendChild(respondButton);
    chatPanel.appendChild(returnButton);
    chatPanel.appendChild(exitButton);
    if (textArray.length == 1) {
        returnButton.setAttribute('disabled', true);
    }
}

function botPanelUpdate(message) {
    const botText = document.createElement('p');
    botText.innerHTML = `<b>AI: </b>${message}`;
    textArray.unshift(botText);
    respondField.value = '';
    if (textArray.length > 1) {
        returnButton.removeAttribute('disabled');
    } else {
        returnButton.setAttribute('disabled', true);
    }
    chatPanel.appendChild(botText);
    chatPanel.appendChild(respondField);
    chatPanel.appendChild(respondButton);
    chatPanel.appendChild(returnButton);
    chatPanel.appendChild(exitButton);
}

function userPanelUpdate(message) {
    chatPanel.removeChild(respondField);
    chatPanel.removeChild(respondButton);
    chatPanel.removeChild(returnButton);
    chatPanel.removeChild(exitButton);
    const userText = document.createElement('p');
    userText.innerHTML = `<b>You: </b>${message}`;
    textArray.unshift(userText);
    chatPanel.appendChild(userText);
}

function readyPanelUpdate(message) {
    const botText = document.createElement('p');
    botText.innerHTML = `<b>AI: </b>${message}`;
    chatPanel.appendChild(botText);
    uploadPanel.appendChild(fileUpload);
    uploadPanel.appendChild(readyButton);
    uploadPanel.appendChild(exitButton);
}
