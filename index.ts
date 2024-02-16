#! /usr/bin/env node
import inquirer from 'inquirer';

console.log('Welcome to the Number Guessing Game using Typescript, Node.js and Inquirer.js\n\n\
We have chosen a number from 1 - 10. To win, you need to guess that number. Good Luck!\n');

const ranNum = Math.floor(Math.random() * 10 + 1)
const lives = 5
let tries = 0
let rounds = 1
let score = 0

console.log(`Round: ${rounds}, Score: ${score}`);

const main = () => {
    // console.log(ranNum);
    
    return inquirer.prompt([{
        type: 'input',
        name: 'userNumIn',
        message: 'Enter a number from 1 - 10',
        validate: (inputNum) => {
            const isValid = !isNaN(inputNum) && (inputNum >= 0 && inputNum <= 10)
            return isValid || 'Please enter a valid number that is between 0 & 10'
        }
    }])
}

const startGame: (num: number) => any = async (ranNum) => {
    try {
        const answer = await main()
        tries += 1
        if (+answer.userNumIn === ranNum) {  
            score += 1                                                       // use of unary operator to convert str to num
            console.log(`You got it!\nNumber of tries used ${tries}\n\nRound: ${rounds}, Score: ${score}`);
            const playAgainCorAns = await playAgainComp()

            if (playAgainCorAns.decision == 'yes') {
                const num = Math.floor(Math.random() * 10 + 1)
                rounds += 1
                tries = 0
                console.log(`\nRound: ${rounds}, Score: ${score}`);
                
                return startGame(num)
            }
            return console.log(`GAME OVER\nNumber of rounds played: ${rounds}, Score: ${score}`);
            
        } else if (Math.abs(answer.userNumIn - ranNum) <= 2 && tries != lives) {
            console.log(`You are very close! Try again.\nNumber of tries left ${lives - tries}`); 

        } else if (Math.abs(answer.userNumIn - ranNum) === 3 && tries != lives) {
            console.log(`You are close! Try again.\nNumber of tries left ${lives - tries}`); 

        } else if (tries != lives) {
            console.log(`Try again.\nNumber of tries left ${lives - tries}`);

        } else {
            console.log(`Number of tries left ${lives - tries}`);
        }

        if (tries < lives) {
            startGame(ranNum)

        } else {
            const playAgainEnd = await playAgainComp()

            if (playAgainEnd.decision == 'yes') {
                const num = Math.floor(Math.random() * 10 + 1)
                rounds += 1
                tries = 0
                console.log(`\nRound: ${rounds}, Score: ${score}`);

                return startGame(num)
            }
            return console.log(`GAME OVER\nNumber of rounds played: ${rounds}, Score: ${score}`);
        }

    } catch (error: any) {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");

          } else {
            console.error("Error during user input:", error.message);
          }
    }   
}

function playAgainComp() {
    return inquirer.prompt([{
        type: 'list',
        name: 'decision',
        message: 'Would you like to continue playing the game?',
        choices: ['yes', 'no']
    }])
}

startGame(ranNum)

