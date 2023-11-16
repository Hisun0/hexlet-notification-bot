import TelegramBot from 'node-telegram-bot-api';
import Sinon from 'sinon';
import config from '../config.js';
import telegramTemplates from '../data/telegram-templates.js';

const { token } = config;
const { prompts } = telegramTemplates;

const handleCommand = async (bot, update) => {
  const chatId = update.message.chat.id;
  const command = update.message.text;

  switch (command) {
    case '/start':
      await bot.sendMessage(chatId, prompts.start);
      break;

    case '/help':
      await bot.sendMessage(chatId, 'Список доступных команд: /start, /help');
      break;

    default:
      await bot.sendMessage(
        chatId,
        'Неизвестная команда. Введите /help для списка команд.'
      );
  }
};

let bot;

beforeAll(() => {
  bot = new TelegramBot(token, { polling: false });
});

test('should handle start text', async () => {
  const chatId = 515693556;

  const update = {
    message: {
      chat: {
        id: chatId,
      },
      text: '/start',
    },
  };

  const sendMessageMock = Sinon.stub(bot, 'sendMessage');

  await handleCommand(bot, update);

  await expect(sendMessageMock.calledOnce).toBeTruthy();
  await expect(sendMessageMock.calledWith(chatId, prompts.start)).toBeTruthy();

  const sentMessage = await sendMessageMock.getCall(0).args[1];
  await expect(sentMessage).toEqual(prompts.start);

  sendMessageMock.restore();
});
