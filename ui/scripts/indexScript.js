const collegeButton = document.getElementById('collegeButton');
const jobButton = document.getElementById('jobButton');
const viewButton = document.getElementById('viewButton');

collegeButton.addEventListener('click', async () => {
    window.location.href = 'collegeChat.html';
});

jobButton.addEventListener('click', async () => {
    window.location.href = 'jobChat.html';
});

viewButton.addEventListener('click', async () => {
    window.location.href = 'collegeResume.html';
});