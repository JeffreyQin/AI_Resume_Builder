const collegeButton = document.getElementById('collegeButton');
const continueButton = document.getElementById('continueButton');
const viewButton = document.getElementById('viewButton');

collegeButton.addEventListener('click', async () => {
    window.location.href = 'collegeChat.html';
});

continueButton.addEventListener('click', async () => {
    window.location.href = 'collegeContinue.html';
});

viewButton.addEventListener('click', async () => {
    window.location.href = 'collegeResume.html';
});