const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/'});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


const infoPromptManager = require('../openai/getInfo/infoPromptManager');
const infoGPTGenerate = require('../openai/getInfo/infoGPTGenerate');
const resumePromptManager = require('../openai/createResume/resumePromptManager');
const resumeGPTGenerate = require('../openai/createResume/resumeGPTGenerate')
const msgManager = require('../msgManager.json');

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


router.post('/createresume', upload.single('transcript'), async (req, res) => {
    console.log('success')
    res.end();
    //const infoChat = require('../openai/getInfo/chat');
    //const resumeJson = await resumeGPTGenerate.organize(infoChat.prompt)
});

module.exports = router;