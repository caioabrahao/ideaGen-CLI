#!/usr/bin/env node
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

dotenv.config();
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);


let areaOfInterest = "";
let skillLevel = "";
let projectScope = "";


export async function generateIdea(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Don't use bold or italics. Keep it short but creative.",
    });

    const spinner = ora(chalk.blue('Generating content...')).start();
    console.log(chalk.bgGreen.bold(`Prompt: ${prompt}\n`));
    const result = await model.generateContent(prompt);
    console.log(chalk.white(result.response.text()));
    spinner.succeed('Content generated!');
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'areaOfInterest',
      message: chalk.black('IdeaGen>') + chalk.yellow(' What area would you like to work on?'),
      choices: ['Web Development', 'Artificial Intelligence', 'Low Level Programming', 'Other'],
    },
    {
      type: 'list',
      name: 'skillLevel',
      message: chalk.black('IdeaGen>') + chalk.greenBright(' What is your skill level?'),
      choices: ['Beginner', 'Intermediate', 'Advanced'],
    },
    {
        type: 'list',
        name: 'projectScope',
        message: chalk.black('IdeaGen>') + chalk.blue(' What is your preferred project scope?'),
        choices: ['Learning Project', 'Fun Weekend Project', 'Startup Potential'],
      }
  ])
  .then((answers) => {
    areaOfInterest = answers.areaOfInterest;
    skillLevel = answers.skillLevel;
    projectScope = answers.projectScope;

    const prompt = `Create a brief proposal for a project based on the preferences below. 
    Be creative and unique!
    Area of Interest: ${areaOfInterest}
    Skill Level: ${skillLevel}
    Project Scope: ${projectScope}`;
    generateIdea(prompt);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt could not be rendered in the current environment.');
    } else {
      console.error('An error occurred:', error);
    }
  });




