import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

const execPromise = promisify(exec);
const PROBLEMS_DIR=`${__dirname}/problems`;
// Get a list of problem directories
const problems = fs.readdirSync(PROBLEMS_DIR).filter(file => fs.statSync(`${PROBLEMS_DIR}/${file}`).isDirectory());

async function runProblem(problem: string) {
  try {
    console.log(`Running ${problem}...`);
    const { stdout, stderr } = await execPromise(`ts-node ${PROBLEMS_DIR}/${problem}/index.ts`);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Error running ${problem}:`, error);
  }
}

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'problem',
      message: 'Select a problem to run:',
      choices: problems
    }
  ]);

  await runProblem(answers.problem);
}

main().catch(error => {
  console.error('Error:', error);
});
