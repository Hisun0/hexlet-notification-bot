import TelegramBot from 'node-telegram-bot-api';

import Firebase from '../classes/Firebase.js';
import config from '../../config.js';
import telegramTemplates from '../../data/telegram-templates.js';

import startHandler from './handlers/start-handler.js';
import restartHandler from './handlers/restart-handler.js';
import startRestartButtonsHandler from './handlers/start-restart-buttons-handler.js';
import courseButtonsHandler from './handlers/course-buttons-handler.js';
import secondDiplomaButtonsHandler from './handlers/second-diploma-buttons-handler.js';
import registrationButtonsHandler from './handlers/registration-buttons-handler.js';

const { token } = config;

const firebase = new Firebase(config);
await firebase.auth();

const bot = new TelegramBot(token, { polling: true });

const { buttons } = telegramTemplates;
const restartSyncTriggers = buttons.start.concat(buttons.restart);

bot.on('message', async (msg) => {
  const { text, chat } = msg;
  const { id } = chat;

  switch (text) {
    case '/start':
      await startHandler(bot, firebase, id);
      break;
    case '/restart':
      await restartHandler(bot, firebase, id);
      break;
    case restartSyncTriggers.find((el) => el === text):
      // использую find вместо includes, потому что includes возвращает boolean,
      // а find элемент
      await startRestartButtonsHandler(bot, id);
      break;
    case buttons.course.find((el) => el === text):
      await courseButtonsHandler(bot, id, text);
      break;
    case buttons.secondDiploma.find((el) => el === text):
      await secondDiplomaButtonsHandler(bot, firebase, id, text);
      break;
    case buttons.registration.find((el) => el === text):
      await registrationButtonsHandler(bot, id, text);
      break;
    default:
      throw new Error('Command not found!');
    // здесь хендлер когда команды нет
  }
});
