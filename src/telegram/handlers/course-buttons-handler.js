import Keyboard from '../../classes/Keyboard.js';
import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, id, text) => {
  const [firstCourse, secondCourse] = buttons.course;
  if (text === firstCourse) {
    //Set key 'Grade' to 1 if User typed another string from keyboard
  } else if (text === secondCourse) {
    //Set key 'Grade' to 2 if User typed another string from keyboard
  }
  const secondDiplomaKeyboard = new Keyboard(buttons.secondDiploma);

  await bot.sendMessage(id, prompts.secondDiploma, secondDiplomaKeyboard);
};
