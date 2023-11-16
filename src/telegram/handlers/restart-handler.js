import Keyboard from '../../classes/Keyboard.js';
import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, firebase, id) => {
  const restartKeyboard = new Keyboard(buttons.restart);
  //Removing whole user from 'Users' Collection
  //Pushing user with same ID to 'Users' Collection
  //How i think that will work:
  firebase.remove('users', id);
  firebase.push('users', id);
  await bot.sendMessage(id, prompts.restart, restartKeyboard);
};
