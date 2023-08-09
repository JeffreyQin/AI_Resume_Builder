# AI_Resume_Builder

This is an AI-powered resume building app. An AI agent will proactively guide you and ask you for personal information until it gathers the mandatory data to build the resume. You may also supplement your profile by uploading files (e.g. transcript), which will be processed using OCR (optical character recognition).

- Frontend: HTML, CSS, JavaScript (Electron.js)
- Backend: JavaScript (Node.js, Express.js, OpenAI API (GPT-4)), Python (OpenCV, Pytesseract OCR)


## How to use

1. Clone the repository
2. Install Node.js and run "npm install", "touch .env" in the console.
3. Type in "OPENAI_API_KEY = {{your api key}}" in .env
4. Run "npm run start" in the console.


## Features & functionalities 

What you can do:

1. Provide your information to the AI agent through human-like conversation.
2. Undo your previous responses or ask the AI agent to skip current questions.
3. Supplement your academic profile by uploading your school transcript (in .jpeg or .png).
4. Edit any parts of your profile as summarized by the AI agent.
5. Choose a template of your choice to view or download your finalized resume.

What the AI does:

1. Proactively guides you in the conversation and prompts you for any information needed.
2. Summarizes your profile and creates formally written resume bullet points based on the conversation.
3. Extracts and summarizes your courseworks and GPA based on transcript upload.
4. Generates a complete resume based on your summarized profile and your choice of template. 
