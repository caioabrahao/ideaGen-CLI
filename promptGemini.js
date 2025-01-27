#!/usr/bin/env node
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { Command } from 'commander';
import chalk from 'chalk';

dotenv.config();
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error(chalk.red('Error: API_KEY is missing. Please set it in your .env file.'));
    console.error(chalk.redBright('Are you in the right directory?'));
    process.exit(1);
  }

const genAI = new GoogleGenerativeAI(apiKey);


export async function generate(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Don't try to format or use bold or italics.",
    });

    console.log(chalk.blue('Generating content...'));
    console.log(chalk.bgGreen.bold(`Prompt: ${prompt}\n`));
    const result = await model.generateContent(prompt);
    console.log(chalk.white(result.response.text()));
}

const program = new Command();

program
  .name('gemini-cli')
  .description('A CLI tool to generate content using Google Gemini')
  .version('1.0.0');

program
  .argument('<prompt>', 'The prompt to generate content')
  .action((prompt) => {
    generate(prompt);
  });

program.parse(process.argv);