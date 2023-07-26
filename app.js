const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const college = require('./routes/college');
const job = require('./routes/job');

app.use('/college', college);
app.use('/job', job);

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});