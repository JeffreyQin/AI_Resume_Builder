const profilePanel = document.getElementById('profilePanel');
const transcriptPanel = document.getElementById('transcriptPanel');
const resumeButton = document.getElementById('resumeButton');

document.addEventListener('DOMContentLoaded', async () => {
    const result = await fetch('http://localhost:3000/college/getsummary')
        .then(res => res.json());
    
    Object.keys(result.profile).forEach((key, index) => {
        constructInfoPanel(result.profile, key, 0);
    });
    Object.keys(result.transcript).forEach((key, index) => {
        constructInfoPanel(result.transcript, key, 1);
    });
});

resumeButton.addEventListener('click', async () => {
    await fetch('http://localhost:3000/college/createresume');
    

});




function constructInfoPanel(summary, key, option) {
    var panel;
    if (option == 0) {
        panel = profilePanel;
    } else {
        panel = transcriptPanel;
    }
    const infoPanel = document.createElement('div');
    const keyLabel = document.createElement('label');
    keyLabel.innerHTML = `<b>${key}: </b>`;
    const valueLabel = document.createElement('label');
    valueLabel.innerHTML = summary[key];
    const changeButton = document.createElement('button');
    changeButton.innerHTML = 'Change';
    infoPanel.appendChild(keyLabel);
    infoPanel.appendChild(valueLabel);
    infoPanel.appendChild(changeButton);
    panel.appendChild(infoPanel);

    changeButton.addEventListener('click', () => {
        infoPanel.removeChild(changeButton);
        infoPanel.removeChild(valueLabel);
        const valueField = document.createElement('input');
        const confirmButton = document.createElement('button');
        confirmButton.innerHTML = 'Confirm';
        const backButton = document.createElement('button');
        backButton.innerHTML = 'Cancel';
        infoPanel.appendChild(valueField);
        infoPanel.appendChild(confirmButton);
        infoPanel.appendChild(backButton);

        confirmButton.addEventListener('click', async () => {
            valueLabel.innerHTML = valueField.value;
            await fetch(`http://localhost:3000/college/changeinfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    option: option,
                    key: key,
                    info: valueField.value
                })
            });
            infoPanel.removeChild(confirmButton);
            infoPanel.removeChild(backButton);
            infoPanel.removeChild(valueField);
            infoPanel.appendChild(valueLabel);
            infoPanel.appendChild(changeButton);
        });
        backButton.addEventListener('click', async () => {
            infoPanel.removeChild(confirmButton);
            infoPanel.removeChild(backButton);
            infoPanel.removeChild(valueField);
            infoPanel.appendChild(valueLabel);
            infoPanel.appendChild(changeButton);
        })
        
    })
}