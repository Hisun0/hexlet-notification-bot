import Keyboard from '../../classes/Keyboard.js';
import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, firebase, id, text) => {
  const [withSecondDiploma, withoutSecondDiploma] = buttons.secondDiploma;
  if (text === withSecondDiploma) {
    firebase.push();
  } else if (text === withoutSecondDiploma) {
    // Запись в бд user.secondDiploma = false;
  }
  const registrationKeyboard = new Keyboard(buttons.registration);

  await bot.sendMessage(id, prompts.registration, registrationKeyboard);
};
