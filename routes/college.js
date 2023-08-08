const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const { PythonShell } = require('python-shell');
const { modifyJsonFile } = require('modify-json-file');
const path = require('path');
const fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'opencv/')
    },
    filename: function(req, file, cb) {
        cb(null, 'transcript.jpeg');
    }
});
const upload = multer({ storage: storage });

const infoPromptManager = require('../openai/getInfo/infoPromptManager');
const infoGPTGenerate = require('../openai/getInfo/infoGPTGenerate');
const sumGPTGenerate = require('../openai/summarize/sumGPTGenerate');

router.use('/init', async (req, res) => {
    await infoPromptManager.resetPrompt(0);
    const response = await infoGPTGenerate.generate(infoPromptManager.collegeDefaultPrompt);
    res.json({ status: 1, message: response });
});

router.post('/getinfo/forward', async (req, res) => {
    const response = await infoGPTGenerate.generate(req.body.input);
    if (response.toLowerCase().includes('transcript')) {
        res.json({ status: 0, message: response });
    } else {
        res.json({ status: 1, message: response });
    }
});

router.use('/getinfo/backward', async (req, res) => {
    infoPromptManager.backPrompt();
    res.end();
});

router.post('/summarize', upload.single('transcript'), async (req, res) => {
    const transcriptText = await PythonShell.run('./opencv/preprocessing.py', null);
    const infoChatStr = fs.readFileSync(path.join(__dirname, '../openai/getInfo/chat.json'), 'utf8');
    const infoChat = JSON.parse(infoChatStr).prompt;

    const summaryReq = [
        sumGPTGenerate.summarize(infoChat, 0),
        sumGPTGenerate.summarize(transcriptText, 1)
    ]
    const summaryRes = await Promise.all(summaryReq);
    chatSummary = summaryRes[0];
    uploadSummary = summaryRes[1];

    await modifyJsonFile(
        path.join(__dirname, '../openai/summarize/summary.json'),
        {
            profile: chatSummary,
            transcript: uploadSummary
        }
    );
    res.end();
});

router.get('/getsummary', (req, res) => {
    const summaryStr = fs.readFileSync(path.join(__dirname, '../openai/summarize/summary.json'), 'utf8');
    const summary = JSON.parse(summaryStr);
    const profile = summary.profile;
    const transcript = summary.transcript;
    res.send({ profile: profile, transcript: transcript });
});


module.exports = router;