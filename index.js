const inquirer = require("inquirer");
const fs = require("fs");

const projectName         =  "projectName";
const projectDescription  =  "projectDescription";
const licenseType         =  "licenseType";
const installInstr        =  "installInstr";
const usageInst           =  "usageInst";
const contriGuide         =  "contriGuide";
const testInstr           =  "testInstr";

const questions = [
    {
        type: "input",
        message: "What is the name of the project?",
        name: projectName
    },
    {
        type: "input",
        message: "Give a brief description of the project:",
        name: projectDescription
    },
    {
        type: "input",
        message: "Give a brief overview of the installation instructions:",
        name: installInstr
    },
    {
        type: "input",
        message: "Give a brief overview of the usage instructions:",
        name: usageInst
    },
    {
        type: "list",
        message: "Select an open-source license type:",
        name: licenseType,
        choices: [
            "MIT",
            "Apache",
            "GPL",
        ]
    },
    {
        type: "input",
        message: "Give a brief overview of the contribution guidelines:",
        name: contriGuide
    },
    {
        type: "input",
        message: "Give a brief overview of the test instructions:",
        name: testInstr
    }
];

function writeToFileErrorHandler(error) {
    error ? console.log(error) : console.log("Success!");
}

function generateTableOfContents(linkFormat, readMeSections)
{
    let tableOfContents = "";

    for (let index = 0; index < readMeSections.length; index++) {
        const section = readMeSections[index];
        tableOfContents += `${index + 1}. [${section}](${linkFormat}${section.toLowerCase()})\n`
    }

    return tableOfContents;
}

// TODO: Create a function to write README file
function writeToFile(fileName, data, readMeSections) {
    const mdFormat_H1 = "#";
    const mdFormat_H2 = "##";
    const readMeDirectory = "./generated-readme";

    fs.mkdirSync(readMeDirectory);
    fileName = `${readMeDirectory}/${fileName}`;

    fs.writeFileSync(fileName, `${mdFormat_H1} ${data.projectName}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} Description\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.projectDescription}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} Table of Contents\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${generateTableOfContents(mdFormat_H1, readMeSections)}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[0]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.installInstr}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[1]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.usageInst}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[2]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.licenseType}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[3]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.contriGuide}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[4]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.testInstr}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[5]}\n`, writeToFileErrorHandler);
    // fs.appendFileSync(fileName, data.projectDescription, writeToFileErrorHandler);
}

// TODO: Create a function to initialize app
function init() {
    const readMeSections = ["Installation", 
                            "Usage", 
                            "License", 
                            "Contributing", 
                            "Tests", 
                            "Questions"];

    inquirer
        .prompt(questions)
        .then(response => writeToFile("README.md", response, readMeSections));
}

// Function call to initialize app
init();
