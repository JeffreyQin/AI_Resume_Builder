const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const infoPromptManager = require('../openai/getInfo/promptManager');
const infoGPTGenerate = require('../openai/getInfo/GPTGenerate');

router.use('/init', (req, res) => {
    infoPromptManager.resetPrompt(0);
    const response = infoGPTGenerate.generate(infoPromptManager.collegeDefaultPrompt);
    res.json({ result: response });
});

router.use('/getinfo', (req, res) => {
    infoGPTGenerate(r)
})

module.exports = router;