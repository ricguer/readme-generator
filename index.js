// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the name of the project?",
        name: "projectName"
    },
    {
        type: "input",
        message: "Give a brief description of the project:",
        name: "projectDescription"
    },
    {
        type: "input",
        message: "Give a brief overview of the installation instructions:",
        name: "installInstr"
    },
    {
        type: "input",
        message: "Give a brief overview of the usage instructions:",
        name: "usageInstr"
    },
    {
        type: "input",
        message: "Give a brief overview of the contribution guidelines:",
        name: "contribGuide"
    },
    {
        type: "input",
        message: "Give a brief overview of the test instructions:",
        name: "testInstr"
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then(response => writeToFile(`${response.projectName}-readme.txt`, response));
}

// Function call to initialize app
init();
