const collegeButton = document.getElementById('collegeButton');
const jobButton = document.getElementById('jobButton');

collegeButton.addEventListener('click', async () => {
    window.location.href = 'college.html';
})

jobButton.addEventListener('click', async () => {
    window.location.href = 'job.html';
})