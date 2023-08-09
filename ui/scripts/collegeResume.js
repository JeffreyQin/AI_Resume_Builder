const defaultButton = document.getElementById('defaultButton');
const exitButton = document.getElementById('exitButton');
const editInfoButton = document.getElementById('editInfoButton');
const infoPanel = document.getElementById('infoPanel');

defaultButton.addEventListener('click', () => {
    window.location.href = '../../templates/default/default.html';
});

exitButton.addEventListener('click', () => {
    window.location.href = 'index.html';
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

        changeButton.addEventListener('click', async () => {
            infoSubpanel.removeChild(valueLabel);
            infoSubpanel.removeChild(changeButton);
            const valueField = document.createElement('input');
            valueField.value = valueLabel.innerHTML;
            const confirmButton = document.createElement('button');
            confirmButton.innerHTML = 'Confirm';
            infoSubpanel.appendChild(valueField);
            infoSubpanel.appendChild(confirmButton);
            confirmButton.addEventListener('click', async () => {
                const gfa = getFieldAttribute(summary, keyLabel.innerHTML);
                await fetch('http://localhost:3000/college/editinfobasic', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        field: gfa[0],
                        attribute: gfa[1],
                        array: false,
                        value: valueField.value
                    })
                });
                infoSubpanel.removeChild(confirmButton);
                infoSubpanel.removeChild(valueField);
                valueLabel.innerHTML = valueField.value;
                infoSubpanel.appendChild(valueLabel);
                infoSubpanel.appendChild(changeButton);
            });
        });
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

        changeButton.addEventListener('click', async () => {
            infoSubpanel.removeChild(valueLabel);
            infoSubpanel.removeChild(changeButton);
            const valueField = document.createElement('input');
            valueField.value = valueLabel.innerHTML;
            const confirmButton = document.createElement('button');
            confirmButton.innerHTML = 'Confirm';
            infoSubpanel.appendChild(valueField);
            infoSubpanel.appendChild(confirmButton);
            confirmButton.addEventListener('click', async () => {
                const gfa = getFieldAttribute(summary, keyLabel.innerHTML);
                let isArray;
                if (gfa[1] == 'courses_taken') {
                    isArray = true;
                } else {
                    isArray = false;
                }
                await fetch('http://localhost:3000/college/editinfobasic', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        field: gfa[0],
                        attribute: gfa[1],
                        array: isArray,
                        value: valueField.value
                    })
                });
                infoSubpanel.removeChild(confirmButton);
                infoSubpanel.removeChild(valueField);
                valueLabel.innerHTML = valueField.value;
                infoSubpanel.appendChild(valueLabel);
                infoSubpanel.appendChild(changeButton);
            });
        });
    }

    const activities = summary["profile"]["high school activities"];
    const awards = summary["profile"]["high school awards"];
    const tests = summary["profile"]["test scores"];

    for (let index = 0; index < activities.length; index++) {
        const activitySubpanel = document.createElement('div');
        Object.keys(activities[index]).forEach((key, ind) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            if (key == 'description') {
                valueLabel.innerHTML = JSON.stringify(activities[index][key]);
            } else {
                valueLabel.innerHTML = activities[index][key];
            }
            changeButton.innerHTML = "Change"
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            activitySubpanel.appendChild(infoSubpanel);

            changeButton.addEventListener('click', async () => {
                infoSubpanel.removeChild(valueLabel);
                infoSubpanel.removeChild(changeButton);
                const valueField = document.createElement('input');
                valueField.value = valueLabel.innerHTML;
                const confirmButton = document.createElement('button');
                confirmButton.innerHTML = 'Confirm';
                infoSubpanel.appendChild(valueField);
                infoSubpanel.appendChild(confirmButton);
                confirmButton.addEventListener('click', async () => {
                    let isArray;
                    if (key == 'description') {
                        isArray = true;
                    } else {
                        isArray = false;
                    }
                    await fetch('http://localhost:3000/college/editinfoadvanced', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                            attribute: 'high school activities',
                            subattribute: key,
                            index: index,
                            value: valueField.value,
                            array: isArray
                        })
                    });
                    infoSubpanel.removeChild(confirmButton);
                    infoSubpanel.removeChild(valueField);
                    valueLabel.innerHTML = valueField.value;
                    infoSubpanel.appendChild(valueLabel);
                    infoSubpanel.appendChild(changeButton);
                });
            });
        });
        const separateLabel = document.createElement('p');
        separateLabel.innerHTML = '---';
        activityPanel.appendChild(activitySubpanel);
        activityPanel.appendChild(separateLabel);
    }

    for (let index = 0; index < awards.length; index++) {
        const awardSubpanel = document.createElement('div');
        Object.keys(awards[index]).forEach((key, ind) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            valueLabel.innerHTML = awards[index][key];
            changeButton.innerHTML = "Change";
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            awardSubpanel.appendChild(infoSubpanel);

            changeButton.addEventListener('click', async () => {
                infoSubpanel.removeChild(valueLabel);
                infoSubpanel.removeChild(changeButton);
                const valueField = document.createElement('input');
                valueField.value = valueLabel.innerHTML;
                const confirmButton = document.createElement('button');
                confirmButton.innerHTML = 'Confirm';
                infoSubpanel.appendChild(valueField);
                infoSubpanel.appendChild(confirmButton);
                confirmButton.addEventListener('click', async () => {
                    await fetch('http://localhost:3000/college/editinfoadvanced', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                            attribute: 'high school awards',
                            subattribute: key,
                            index: index,
                            value: valueField.value,
                            array: false
                        })
                    });
                    infoSubpanel.removeChild(confirmButton);
                    infoSubpanel.removeChild(valueField);
                    valueLabel.innerHTML = valueField.value;
                    infoSubpanel.appendChild(valueLabel);
                    infoSubpanel.appendChild(changeButton);
                });
            });
        });
        const separateLabel = document.createElement('p');
        separateLabel.innerHTML = '---';
        awardPanel.appendChild(awardSubpanel);
        awardPanel.appendChild(separateLabel);
    }

    for (let index = 0; index < tests.length; index++) {
        const testSubpanel = document.createElement('div');
        Object.keys(tests[index]).forEach((key, ind) => {
            const infoSubpanel = document.createElement('div');
            const keyLabel = document.createElement('label');
            const valueLabel = document.createElement('label');
            const changeButton = document.createElement('button');
            keyLabel.innerHTML = `<b>${key}: </b>`;
            valueLabel.innerHTML = tests[index][key];
            changeButton.innerHTML = "Change"
            infoSubpanel.appendChild(keyLabel);
            infoSubpanel.appendChild(valueLabel);
            infoSubpanel.appendChild(changeButton);
            testSubpanel.appendChild(infoSubpanel);

            changeButton.addEventListener('click', async () => {
                infoSubpanel.removeChild(valueLabel);
                infoSubpanel.removeChild(changeButton);
                const valueField = document.createElement('input');
                valueField.value = valueLabel.innerHTML;
                const confirmButton = document.createElement('button');
                confirmButton.innerHTML = 'Confirm';
                infoSubpanel.appendChild(valueField);
                infoSubpanel.appendChild(confirmButton);
                confirmButton.addEventListener('click', async () => {
                    await fetch('http://localhost:3000/college/editinfoadvanced', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                            attribute: 'test scores',
                            subattribute: key,
                            index: index,
                            value: valueField.value,
                            array: false
                        })
                    });
                    infoSubpanel.removeChild(confirmButton);
                    infoSubpanel.removeChild(valueField);
                    valueLabel.innerHTML = valueField.value;
                    infoSubpanel.appendChild(valueLabel);
                    infoSubpanel.appendChild(changeButton);
                });
            });
        });
        const separateLabel = document.createElement('p');
        separateLabel.innerHTML = '---';
        testPanel.appendChild(testSubpanel);
        testPanel.appendChild(separateLabel);
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

function getFieldAttribute(summary, str) {
    attribute = str.replaceAll("<b>", "").replaceAll(": </b>", "");
    if (summary.profile.hasOwnProperty(attribute)) {
        return ['profile', attribute];
    } else {
        return ['transcript', attribute];
    }
}