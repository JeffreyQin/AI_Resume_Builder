const respondButton = document.getElementById('respondButton');
const respondField = document.getElementById('respondField');

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('http://localhost:3000/college/init');
})


respondButton.addEventListener('click', async () => {
    const result = await fetch(`http://localhost:3000/college/getinfo?input=${respondField.value}`)
        .then(res => res.json())
        .then(res => res.result);
});