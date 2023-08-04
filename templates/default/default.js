const printButton = document.getElementById('printButton');
const resumePanel = document.getElementById('resumePanel');

document.addEventListener('DOMContentLoaded', async () => {
    const profile = await fetch('http://localhost:3000/college/getprofile')
        .then(res => res.json());
    
    constructResume(profile);
});

printButton.addEventListener('click', () => {
    var pdf = new jsPDF();
    pdf.addHTML($('#resumePanel')[0], function () {
        pdf.save('Test.pdf');
    });
    /*
    var doc = new jsPDF(); 
    var specialElementHandlers = { 
        '#editor': function (element, renderer) { 
           return true; 
        }    
    };
    doc.fromHTML($('#resumePanel').html(), 15, 15, { 
        'width': 190, 
        'elementHandlers': specialElementHandlers 
    }); 
    doc.save('sample-page.pdf'); 
    */
});


function constructResume(profile) {

    const contactPanel = document.getElementById('contactPanel');
    const resumeName = document.getElementById('resumeName');
    const resumeField = document.getElementById('resumeField');
    const resumePhone = document.getElementById('resumePhone');
    const resumeEmail = document.getElementById('resumeEmail');
    const resumeGithub = document.getElementById('resumeGithub');
    const resumeLinkedin = document.getElementById('resumeLinkedin');
    const resumeWebsite = document.getElementById('resumeWebsite');
    resumeName.innerHTML = profile['name'];
    resumeField.innerHTML = profile['field of interest'];
    if (profile['phone number'] == 'n.a.') {
        contactPanel.removeChild(resumePhone);
    } else {
        resumePhone.innerHTML = `<b>Phone: </b> ${profile['phone number']}`;
    }
    if (profile['personal email'] == 'n.a.') {
        contactPanel.removeChild(resumeEmail);
    } else {
        resumeEmail.innerHTML = `<b>Email: </b> ${profile['personal email']}`;
    }
    if (profile['LinkedIn account username'] == 'n.a.') {
        contactPanel.removeChild(resumeLinkedin);
    } else {
        resumeLinkedin.innerHTML = `<b>LinkedIn: </b> ${profile['LinkedIn account username']}`;
    }
    if (profile['GitHub account username'] == 'n.a.') {
        contactPanel.removeChild(resumeGithub);
    } else {
        resumeGithub.innerHTML = `<b>GitHub: </b> ${profile['GitHub account username']}`;
    }
    if (profile['personal website'] == 'n.a.') {
        contactPanel.removeChild(resumeWebsite);
    } else {
        resumeWebsite.innerHTML = `<b>Website: </b> ${profile['personal website']}`;
    }

    const resumeSchool = document.getElementById('resumeSchool');
    const resumeSchoolTime = document.getElementById('resumeSchoolTime');
    const resumeCoursework = document.getElementById('resumeCoursework');
    const resumeGPA = document.getElementById('resumeGPA');
    resumeSchool.innerHTML = profile['high school name'];
    resumeSchoolTime.innerHTML = `${profile['high school starting year']} - ${profile['high school graduation year']}`;
    resumeCoursework.innerHTML = '- <b>Coursework: </b>';
    resumeGPA.innerHTML = `- <b>GPA: </b> ${profile['high school GPA']}`;

    const activityPanel = document.getElementById('activityPanel');
    for (let index = 0; index < profile['high school activities'].length; index++) {
        const activitySubpanel = document.createElement('div');
        activitySubpanel.classList.add('yui-u');
        const activityContainer = document.createElement('div');
        activityContainer.classList.add('job');
        const organization = document.createElement('h2');
        const position = document.createElement('h3');
        const time = document.createElement('h4');
        organization.innerHTML = profile['high school activities'][index]['organization name'];
        position.innerHTML = profile['high school activities'][index]['position'];
        time.innerHTML = `${profile['high school activities'][index]['start date']} - ${profile['high school activities'][index]['end date']}`
        activityContainer.appendChild(organization);
        activityContainer.appendChild(position);
        activityContainer.appendChild(time);
        const bps = document.createElement('ul');
        for (let index2 = 0; index2 < profile['high school activities'][index]['description'].length; index2++) {
            const bp = document.createElement('li');
            bp.innerHTML = `- ${profile['high school activities'][index]['description'][index2]}`;
            bps.appendChild(bp);
        }
        activityContainer.appendChild(bps);
        activitySubpanel.appendChild(activityContainer);
        activityPanel.appendChild(activitySubpanel);
    }

    const awardPanel = document.getElementById('awardPanel');
    for (let index = 0; index < profile['high school activities'].length; index++) {
        const awardSubpanel = document.createElement('div');
        awardSubpanel.classList.add('yui-u');
        const awardContainer = document.createElement('div');
        awardContainer.classList.add('job');
        const name = document.createElement('h2');
        const organization = document.createElement('h3');
        const time = document.createElement('h4');
        const description = document.createElement('p');
        name.innerHTML = profile['high school awards'][index]['award name'];
        organization.innerHTML = profile['high school awards'][index]['organization'];
        time.innerHTML = profile['high school awards'][index]['date attained'];
        description.innerHTML = profile['high school awards'][index]['description'];
        awardContainer.appendChild(name);
        awardContainer.appendChild(organization);
        awardContainer.appendChild(time);
        awardContainer.appendChild(description);
        awardSubpanel.appendChild(awardContainer);
        awardPanel.appendChild(awardSubpanel);
    }

    const testPanel = document.getElementById('testPanel');
    for (let index = 0; index < profile['test scores'].length; index++) {
        const testSubpanel = document.createElement('div');
        testSubpanel.classList.add('yui-u');
        const testContainer = document.createElement('div');
        testContainer.classList.add('job');
        const test = document.createElement('h3');
        const time = document.createElement('h4');
        test.innerHTML = `${profile['test scores'][index]['test name']}: ${profile['test scores'][index]['score attained']}`
        time.innerHTML = profile['test scores'][index]['date attained'];
        testContainer.appendChild(test);
        testContainer.appendChild(time);
        testSubpanel.appendChild(testContainer);
        testPanel.appendChild(testSubpanel);
    }








}