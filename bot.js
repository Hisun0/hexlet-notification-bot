import TelegramBot from "node-telegram-bot-api";

import { Keyboard } from "./src/Keyboard.js";
import { Firebase } from './src/classes/Firebase.js';

import telegramTemplates from "./data/telegram-templates.js";
import config from "./config.js"; 

const { token } = config;

const firebase = new Firebase(config);
await firebase.auth();

const bot = new TelegramBot(token, {polling: true});

const { prompts, buttons } = telegramTemplates;
const restartSyncTriggers = buttons.start.concat(buttons.restart);

bot.on ('message', async msg => {
  const coll = firebase.get(id);
  const { text, chat }  = msg;  
  const { id } = chat;
  
  if (text === '/start') {
    const startOptions = { parse_mode: "Markdown", disable_web_page_preview: true };
    const startKeyboard = new Keyboard(buttons.start, startOptions);
    firebase.push(id, 'users');
    await bot.sendMessage(id, prompts.start, startKeyboard);
  }; /* Welcome message */

  const firebaseID = getId

  if (text === '/restart') {
    const restartKeyboard = new Keyboard(buttons.restart);
 
    //Removing whole user from 'Users' Collection
    //Pushing user with same ID to 'Users' Collection
    //How i think that will work:
    const coll = firebase.get(id);
    firebase.remove('users', id);
    firebase.push('users', id);
    await bot.sendMessage(id, prompts.restart, restartKeyboard);
  }

  if (restartSyncTriggers.includes(text)) {
    const courseKeyboard = new Keyboard(buttons.course)

    await bot.sendMessage(id, prompts.course, courseKeyboard);
  }; /* Course sync */


  if (buttons.course.includes(text)) {
    
    if (text === buttons.course[0]) {
      firebase.update(course, 'users', )
    } else if (text === buttons.course[1]) {
      //Set key 'Grade' to 2 if User typed another string from keyboard
    }
    const secondDiplomaKeyboard = new Keyboard(buttons.secondDiplom a);

    await bot.sendMessage(id, prompts.secondDiploma, secondDiplomaKeyboard);
  }; /* Course sync */

  if (buttons.secondDiploma.includes(text)) {
    if (text === buttons.secondDiploma[0]) {
      firebase.push()
    } else if (text === buttons.secondDiploma[1]) {
      // Запись в бд user.secondDiploma = false;
    }
    const registrationKeyboard = new Keyboard(buttons.registration);
    
    await bot.sendMessage(id, prompts.registration, registrationKeyboard);
  }; /* SecondDiploma sync*/

  if(buttons.registration.includes(text)) {
    if(text === buttons.registration[1]) {
      bot.sendMessage(id, prompts.restart, buttons.restart)
    } else if (text === buttons.registration[0]) {
      bot.sendMessage(id, prompts.finish, buttons.finish[0])
    }
  } /* Are you sure?*/
});

