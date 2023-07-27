const respondButton = document.getElementById('respondButton');
const respondField = document.getElementById('respondField');
const chatPanel = document.getElementById('chatPanel');
const returnButton = document.getElementById('returnButton');
const exitButton = document.getElementById('exitButton');
const textArr = [];

document.addEventListener('DOMContentLoaded', async () => {
    respondField.value = 'Please hold';
    respondField.setAttribute('disabled', true);
    respondButton.setAttribute('disabled', true);
    returnButton.setAttribute('disabled', true);
    exitButton.setAttribute('disabled', true);

    const result = await fetch('http://localhost:3000/college/init')
        .then(res => res.json())
        .then(res => res.message);
    
    botPanelUpdate(result);
})

respondButton.addEventListener('click', async () => {
    input = respondField.value;
    userPanelUpdate(input);

    const result = await fetch(`http://localhost:3000/college/getinfo/forward`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            input: input
        })
    })
    .then(res => res.json())

    if (result.status == 1) {
        botPanelUpdate(result.message);
    } else {
        readyPanelUpdate(result.message);
    }
});

returnButton.addEventListener('click', async () => {
    chatPanel.removeChild(textArr[0]);
    chatPanel.removeChild(textArr[1]);
    textArr.shift();
    textArr.shift();
    if (textArr.length == 1) {
        returnButton.setAttribute('disabled', true);
    }
    await fetch('http://localhost:3000/college/getinfo/backward');
});

exitButton.addEventListener('click', async () => {
    window.location.href = 'index.html';
});

function botPanelUpdate(message) {
    chatPanel.removeChild(respondField);
    chatPanel.removeChild(respondButton);
    chatPanel.removeChild(returnButton);
    chatPanel.removeChild(exitButton);
    const botText = document.createElement('p');
    botText.innerHTML = `<b>AI: </b>${message}`;
    textArr.unshift(botText);
    respondField.value = '';
    respondField.removeAttribute('disabled');
    respondButton.removeAttribute('disabled');
    if (textArr.length > 1) {
        returnButton.removeAttribute('disabled');
    }
    exitButton.removeAttribute('disabled');
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
    textArr.unshift(userText);
    respondField.value = 'Please hold';
    respondField.setAttribute('disabled', true);
    respondButton.setAttribute('disabled', true);
    returnButton.setAttribute('disabled', true);
    chatPanel.appendChild(userText);
    exitButton.setAttribute('disabled', true);
    chatPanel.appendChild(respondField);
    chatPanel.appendChild(respondButton);
    chatPanel.appendChild(returnButton);
    chatPanel.appendChild(exitButton);
}

function readyPanelUpdate(message) {
    chatPanel.removeChild(respondField);
    chatPanel.removeChild(respondButton);
    chatPanel.removeChild(returnButton);
    chatPanel.removeChild(exitButton);
    const botText = document.createElement('p');
    botText.innerHTML = `<b>AI: </b>${message}`;
    const readyButton = document.createElement('button');
    readyButton.innerHTML = 'Create my resume!';
    returnButton.removeAttribute('disabled');
    exitButton.removeAttribute('disabled');
    chatPanel.appendChild(botText);
    chatPanel.appendChild(readyButton);

    readyButton.addEventListener('click', async () => {
        await fetch('http://localhost:3000/college/createresume');
    })
}