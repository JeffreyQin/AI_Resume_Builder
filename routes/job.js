const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const infoPromptManager = require('../openai/getInfo/promptManager');
const infoGPTGenerate = require('../openai/getInfo/GPTGenerate');

router.use('/init', () => {
    infoPromptManager.resetPrompt(1);
});

module.exports = router;