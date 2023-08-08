const defaultButton = document.getElementById('defaultButton');
const editInfoButton = document.getElementById('editInfoButton');
const infoPanel = document.getElementById('infoPanel');

defaultButton.addEventListener('click', () => {
    window.location.href = '../../templates/default/default.html';
});

editInfoButton.addEventListener('click', async () => {
    infoPanel.removeChild(editInfoButton);
    const summary = await fetch('http://localhost:3000/college/getsummary')
        .then(res => res.json());
    
    constructInfoPanel(summary);
});

function constructInfoPanel(summary) {
    const personalPanel = document.createElement('div');
    const educationPanel = document.createElement('div');
    const activityPanel = document.createElement('div');
    const awardPanel = document.createElement('div');
    const testPanel = document.createElement('div');
    
    const personalLabel = document.createElement('h4');
    const educationLabel = document.createElement('h4');
    const activityLabel = document.createElement('h4');
    const awardLabel = document.createElement('h4');
    const testLabel = document.createElement('h4');

    personalLabel.innerHTML = 'Personal information';
    educationLabel.innerHTML = 'Education';
    activityLabel.innerHTML = 'Extra-curricular activities';
    awardLabel.innerHTML = 'Awards';
    testLabel.innerHTML = 'Test scores';

    personalPanel.appendChild(personalLabel);
    educationPanel.appendChild(educationLabel);
    activityPanel.appendChild(activityLabel);
    awardPanel.appendChild(awardLabel);
    testPanel.appendChild(testLabel);

    infoPanel.appendChild(personalPanel);
    infoPanel.appendChild(educationPanel);
    infoPanel.appendChild(activityPanel);
    infoPanel.appendChild(awardPanel);
    infoPanel.appendChild(testPanel);

    for (attribute of mapping.personal) {
        const infoSubpanel = document.createElement('div');
        const keyLabel = document.createElement('label');
        const valueLabel = document.createElement('label');
        const changeButton = document.createElement('button');
        keyLabel.innerHTML = `<b>${attribute[1]}: </b>`;
        valueLabel.innerHTML = summary[attribute[0]][attribute[1]];
        changeButton.innerHTML = "Change"
        infoSubpanel.appendChild(keyLabel);
        infoSubpanel.appendChild(valueLabel);
        infoSubpanel.appendChild(changeButton);
        personalPanel.appendChild(infoSubpanel);
    }

    for (attribute of mapping.education) {
        const infoSubpanel = document.createElement('div');
        const keyLabel = document.createElement('label');
        const valueLabel = document.createElement('label');
        const changeButton = document.createElement('button');
        keyLabel.innerHTML = `<b>${attribute[1]}: </b>`;
        if (attribute[1] == 'courses_taken') {
            valueLabel.innerHTML = JSON.stringify(summary[attribute[0]][attribute[1]]);
        } else {
            valueLabel.innerHTML = summary[attribute[0]][attribute[1]];
        }
        changeButton.innerHTML = "Change"
        infoSubpanel.appendChild(keyLabel);
        infoSubpanel.appendChild(valueLabel);
        infoSubpanel.appendChild(changeButton);
        educationPanel.appendChild(infoSubpanel);
    }

    for (activity of summary["profile"]["high school activities"]) {
        const activitySubpanel = document.createElement('div');
        Object.keys(activity).forEach((key, index) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            if (key == 'description') {
                valueLabel.innerHTML = JSON.stringify(activity[key]);
            } else {
                valueLabel.innerHTML = activity[key];
            }
            changeButton.innerHTML = "Change"
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            activitySubpanel.appendChild(infoSubpanel);
        });
        activityPanel.appendChild(activitySubpanel);
    }

    for (award of summary["profile"]["high school awards"]) {
        const awardSubpanel = document.createElement('div');
        Object.keys(award).forEach((key, index) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            valueLabel.innerHTML = award[key];
            changeButton.innerHTML = "Change"
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            awardSubpanel.appendChild(infoSubpanel);
        });
        awardPanel.appendChild(awardSubpanel);
    }

    for (test of summary["profile"]["test scores"]) {
        const testSubpanel = document.createElement('div');
        Object.keys(test).forEach((key, index) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            valueLabel.innerHTML = test[key];
            changeButton.innerHTML = "Change"
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            testSubpanel.appendChild(infoSubpanel);
        });
        testPanel.appendChild(testSubpanel);
    }
    
}

const mapping = {
    personal: [
        ["profile", "name"],
        ["profile", "field of interest"],
        ["profile", "phone number"],
        ["profile", "personal email"],
        ["profile", "LinkedIn account username"],
        ["profile", "GitHub account username"],
        ["profile", "personal website"],
    ],
    education: [
        ["profile", "high school name"],
        ["profile", "high school starting year"],
        ["profile", "high school graduation year"],
        ["profile", "high school diploma"],
        ["transcript", "courses_taken"],
        ["transcript", "GPA"]
    ]
}