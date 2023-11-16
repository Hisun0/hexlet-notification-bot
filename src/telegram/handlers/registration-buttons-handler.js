import telegramTemplates from '../../../data/telegram-templates.js';

const { prompts, buttons } = telegramTemplates;

export default async (bot, id, text) => {
  const [success, unsuccess] = buttons.registration;
  const [restart, cron] = buttons.finish;
  if (text === success) {
    bot.sendMessage(id, prompts.restart, restart);
  } else if (text === unsuccess) {
    bot.sendMessage(id, prompts.finish, cron);
  }
};
