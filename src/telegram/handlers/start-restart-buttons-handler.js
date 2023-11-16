import Keyboard from '../../classes/Keyboard.js';
import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, id) => {
  const courseKeyboard = new Keyboard(buttons.course);
  await bot.sendMessage(id, prompts.course, courseKeyboard);
};
