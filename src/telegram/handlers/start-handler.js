import Keyboard from '../../classes/Keyboard.js';
import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, firebase, id) => {
  const startOptions = {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  };
  const startKeyboard = new Keyboard(buttons.start, startOptions);
  firebase.push(id, 'users');
  await bot.sendMessage(id, prompts.start, startKeyboard);
};
