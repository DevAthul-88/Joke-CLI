#!/usr/bin/env node
import kleur from "kleur";
import boxen from "boxen";
import inquirer from "inquirer";
import axios from "axios";

const welcomeMessage = kleur.bold().green("Welcome to joke CLI");

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#000",
};

const msg = boxen(welcomeMessage, boxenOptions);

console.log(msg);

inquirer
  .prompt([
    {
      type: "list",
      name: "theme",
      message: "What kind of joke do you want?",
      choices: ["Any", "Programming", "Misc", "Dark", "Pun" , "Spooky" , "Christmas"],
    },
  ])
  .then((answers) => {
    axios
      .get(`https://v2.jokeapi.dev/joke/${answers.theme}`)
      .then((e) => {
       if(e.data){
        const joke = kleur.bold(e.data.joke ? e.data.joke : e.data.setup + ". " + e.data.delivery );
        console.log("Joke:" + " " + joke);
       }
      })
      .catch((error) => {
        const j = kleur.bold().red("Error:" + " " + error.message);
        console.log(j);
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      const e = kleur.bold().red("Error:" + " " + error.isTtyError);
      console.log(e);
    }
  });
