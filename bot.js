import TelegramBot from 'node-telegram-bot-api';

import Keyboard from './src/classes/Keyboard.js';
import Firebase from './src/classes/Firebase.js';

import telegramTemplates from './data/telegram-templates.js';
import config from './config.js';

const { token } = config;

const firebase = new Firebase(config);
await firebase.auth();

const bot = new TelegramBot(token, { polling: true });

const { prompts, buttons } = telegramTemplates;
const restartSyncTriggers = buttons.start.concat(buttons.restart);

bot.on('message', async (msg) => {
  const { text, chat } = msg;
  const { id } = chat;

  if (text === '/start') {
    const startOptions = {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    };
    const startKeyboard = new Keyboard(buttons.start, startOptions);
    firebase.push(id, 'users');
    await bot.sendMessage(id, prompts.start, startKeyboard);
  } /* Welcome message */

  if (text === '/restart') {
    const restartKeyboard = new Keyboard(buttons.restart);
    //Removing whole user from 'Users' Collection
    //Pushing user with same ID to 'Users' Collection
    //How i think that will work:
    firebase.remove('users', id);
    firebase.push('users', id);
    await bot.sendMessage(id, prompts.restart, restartKeyboard);
  }

  if (restartSyncTriggers.includes(text)) {
    const courseKeyboard = new Keyboard(buttons.course);

    await bot.sendMessage(id, prompts.course, courseKeyboard);
  } /* User Init */

  if (buttons.course.includes(text)) {
    if (text === buttons.course[0]) {
      //Set key 'Grade' to 1 if User typed another string from keyboard
    } else if (text === buttons.course[1]) {
      //Set key 'Grade' to 2 if User typed another string from keyboard
    }
    const secondDiplomaKeyboard = new Keyboard(buttons.secondDiploma);

    await bot.sendMessage(id, prompts.secondDiploma, secondDiplomaKeyboard);
  } /* Course sync */

  if (buttons.secondDiploma.includes(text)) {
    if (text === buttons.secondDiploma[0]) {
      firebase.push();
    } else if (text === buttons.secondDiploma[1]) {
      // Запись в бд user.secondDiploma = false;
    }
    const registrationKeyboard = new Keyboard(buttons.registration);

    await bot.sendMessage(id, prompts.registration, registrationKeyboard);
  } /* SecondDiploma sync*/

  if (buttons.registration.includes(text)) {
    if (text === buttons.registration[0]) {
      bot.sendMessage(id, prompts.restart, buttons.finish[0]);
    } else if (text === buttons.registration[1]) {
      bot.sendMessage(id, prompts.finish, buttons.finish[1]);
    }
  } /* Are you sure?*/
});
