const { writeFile, copyFile } = require('./utils/generate-site');

const inquirer = require('inquirer');

const generatePage = require('./src/page-template');


const promptUser = () => {

  return inquirer.prompt([

    {

      type: 'input',

      name: 'name',

      message: 'What is your name?',

      validate: nameInput => {

        if (nameInput) {

          return true;

        } else {

          console.log('Please enter your name!');

          return false;

        }

      }

    },

    {

      type: 'input',

      name: 'Github username',

      message: 'Enter your GitHub Username',

      validate: githubUsernameInput => {

        if (githubUsernameInput) {

          return true;

        } else {

          console.log('Please enter your Github username!');

          return false;

        }

      }

    },

    {

      type: 'confirm',

      name: 'confirmAbout',

      message: 'Would you like to enter some information about yourself for an "About" section?',

      default: true

    },

    {

      type: 'input',

      name: 'about',

      message: 'Provide some information about yourself:',

      when: ({ confirmAbout }) => confirmAbout

    }

  ]);

};

const promptProject = portfolioData => {
  console.log(`

=================
Add a New Project
=================

`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {

    portfolioData.projects = [];

  }

  return inquirer.prompt([

    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectNameInput => {

        if (projectNameInput) {

          return true;

        } else {

          console.log('Please enter your project name!');

          return false;

        }

      }
    },

    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {

        if (descriptionInput) {

          return true;

        } else {

          console.log('Please enter a description!');

          return false;

        }

      }
    },

    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },

    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {

        if (linkInput) {

          return true;

        } else {

          console.log('Please enter your Github project link!');

          return false;

        }

      }
    },

    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },

    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }

  ])

    .then(projectData => {

      portfolioData.projects.push(projectData);

      if (projectData.confirmAddProject) {

        return promptProject(portfolioData);

      } else {

        return portfolioData;

      }

    });

};

promptUser()

  .then(promptProject)

  .then(portfolioData => {


    return generatePage(portfolioData);

  })

  .then(pageHTML => {

    return writeFile(pageHTML);

  })

  .then(writeFileResponse => {

    console.log(writeFileResponse);

    return copyFile();

  })

  .then(copyFileResponse => {

    console.log(copyFileResponse);

  })

  .catch(err => {

    console.log(err);

  });