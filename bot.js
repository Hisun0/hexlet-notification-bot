import TelegramBot from 'node-telegram-bot-api';
// import Assignments from "./src/classes/Assignment.js";
import Keyboard from './src/classes/Keyboard.js';
import Firebase from './src/classes/Firebase.js';

import telegramTemplates from './data/telegram-templates.js';
import config from './config.js';

const { token } = config;

const firebase = new Firebase(config);
await firebase.auth();

// const coll = await firebase.get('assignments');
// console.log(coll)
// const assignments = new Assignments(coll);
// console.log(assignments.getAvailableAssignments().createPrompts());

const bot = new TelegramBot(token, {polling: true});

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
    const [firstCourse, secondCourse] = buttons.course;
    if (text === firstCourse) {
      //Set key 'Grade' to 1 if User typed another string from keyboard
    } else if (text === secondCourse) {
      //Set key 'Grade' to 2 if User typed another string from keyboard
    }
    const secondDiplomaKeyboard = new Keyboard(buttons.secondDiploma);

    await bot.sendMessage(id, prompts.secondDiploma, secondDiplomaKeyboard);
  } /* Course sync */

  if (buttons.secondDiploma.includes(text)) {
    const [withSecondDiploma, withoutSecondDiploma] = buttons.secondDiploma;
    if (text === withSecondDiploma) {
      firebase.push();
    } else if (text === withoutSecondDiploma) {
      // Запись в бд user.secondDiploma = false;
    }
    const registrationKeyboard = new Keyboard(buttons.registration);

    await bot.sendMessage(id, prompts.registration, registrationKeyboard);
  } /* SecondDiploma sync*/

  if (buttons.registration.includes(text)) {
    const [success, unsuccess] = buttons.registration;
    const [restart, cron] = buttons.finish;
    if (text === success) {
      bot.sendMessage(id, prompts.restart, restart);
    } else if (text === unsuccess) {
      bot.sendMessage(id, prompts.finish, cron);
    }
  } /* Are you sure?*/
});
