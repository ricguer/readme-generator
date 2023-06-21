                                                                /* ===================== IMPORTS ====================== */
const inquirer = require("inquirer");
const fs = require("fs");

                                                                /* ================= GLOBAL VARIABLES ================= */
const projectName         =  "projectName";
const projectDescription  =  "projectDescription";
const licenseType         =  "licenseType";
const installInstr        =  "installInstr";
const usageInst           =  "usageInst";
const contriGuide         =  "contriGuide";
const testInstr           =  "testInstr";
const userName            =  "userName";
const userEmail           =  "userEmail";

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
        message: "Provide installation instructions:",
        name: installInstr
    },
    {
        type: "input",
        message: "Provide usage instructions:",
        name: usageInst
    },
    {
        type: "list",
        message: "Select an open-source license type:",
        name: licenseType,
        choices: [
            "MIT",
            "Apache",
            "GPL v3",
        ]
    },
    {
        type: "input",
        message: "Provide contribution guidelines:",
        name: contriGuide
    },
    {
        type: "input",
        message: "Provide utility test instructions:",
        name: testInstr
    },
    {
        type: "input",
        message: "Direct questions to this username: ",
        name: userName
    },
    {
        type: "input",
        message: "Direct questions to this email: ",
        name: userEmail
    }
];

                                                                /* ================= GLOBAL FUNCTIONS ================= */
/**
 * Error handler for README write operation.
 * @param {*} error error generated from writing to file
 */
function writeToFileErrorHandler(error) {
    error ? console.log(error) : console.log("Success!");
}


/**
 * Generates a table of contents given the predefined sections.
 * @param {*} linkFormat format of links in Table of Contents
 * @param {*} readMeSections sections of README
 * @returns formatted table of contents string
 */
function generateTableOfContents(linkFormat, readMeSections)
{
    let tableOfContents = "";

    for (let index = 0; index < readMeSections.length; index++) {
        const section = readMeSections[index];
        tableOfContents += `${index + 1}. [${section}](${linkFormat}${section.toLowerCase()})\n`
    }

    return tableOfContents;
}


/**
 * Creates the "Questions" section of README.
 * @param {*} userName author of project
 * @param {*} userEmail email of author of project
 * @returns formatted "Questions" section of README
 */
function generateQuestionsSection(userName, userEmail) {
    let questionSectionContent;

    questionSectionContent = `Any questions regarding this utility can be directed to: 
    \n- Author: ${userName} (https://github.com/${userName})
    \n- Email: ${userEmail}`;

    return questionSectionContent;
}


/**
 * Chooses a license badge depending on project license.
 * @param {*} licenseType type of license of project
 * @returns README License string
 */
function fetchLicenseBadge(licenseType) {
    let licAddition = "";

    switch (licenseType) {
        case "MIT":
            licAddition = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;

        case "Apache":
            licAddition = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;

        case "GPL v3":
            licAddition = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
    
        default:
            break;
    }

    return licAddition;
}


/**
 * Write data to README file.
 * @param {*} fileName name of README file
 * @param {*} data data to write to README
 * @param {*} readMeSections sections to create for README
 */
function writeToFile(fileName, data, readMeSections) {
    const mdFormat_H1 = "#";
    const mdFormat_H2 = "##";
    const readMeDirectory = "./generated-readme";

    fs.mkdirSync(readMeDirectory);
    fileName = `${readMeDirectory}/${fileName}`;

    fs.writeFileSync(fileName, `${fetchLicenseBadge(data.licenseType)}\n`, writeToFileErrorHandler);

    fs.appendFileSync(fileName, `${mdFormat_H1} ${data.projectName}\n`, writeToFileErrorHandler);

                                                                /* ----------- README Section: Description ------------ */
    fs.appendFileSync(fileName, `${mdFormat_H2} Description\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.projectDescription}\n`, writeToFileErrorHandler);

                                                                /* -------- README Section: Table of Contents --------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} Table of Contents\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${generateTableOfContents(mdFormat_H1, readMeSections)}\n`, writeToFileErrorHandler);

                                                                /* ----------- README Section: Installation ----------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[0]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.installInstr}\n`, writeToFileErrorHandler);

                                                                /* -------------- README Section: Usage -------------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[1]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.usageInst}\n`, writeToFileErrorHandler);

                                                                /* ------------- README Section: License ------------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[2]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.licenseType}\n`, writeToFileErrorHandler);

                                                                /* ----------- README Section: Contributing ----------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[3]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.contriGuide}\n`, writeToFileErrorHandler);

                                                                /* -------------- README Section: Tests --------------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[4]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${data.testInstr}\n`, writeToFileErrorHandler);

                                                                /* ------------ README Section: Questions ------------- */
    fs.appendFileSync(fileName, `${mdFormat_H2} ${readMeSections[5]}\n`, writeToFileErrorHandler);
    fs.appendFileSync(fileName, `${generateQuestionsSection(data.userName, data.userEmail)}\n`, writeToFileErrorHandler);
}


/**
 * Initializes the command-line application. 
 */
function init() {

                                                                /* Define the sections of the README                    */
    const readMeSections = ["Installation", 
                            "Usage", 
                            "License", 
                            "Contributing", 
                            "Tests", 
                            "Questions"];

                                                                /* Inquirer and collect user responses to add to README */
    inquirer
        .prompt(questions)
        .then(response => writeToFile("README.md", response, readMeSections));
}

// Application starting point.
init();
