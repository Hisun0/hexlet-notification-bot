import TelegramBot from "node-telegram-bot-api";

import { token } from "./config"; 

const bot = new TelegramBot(token, {polling: true});

// Для запуска бота пишем в консоль npm run dev (нужен nodemon потому что он удобный, я его по-моему на прод депенденси случайно записал)
// https://t.me/HexletNotifyBot

// Спойлер: ты будешь ебаться с закидыванием в бд либо объяснять мне

// В планах проснуться к трем ХОТЯ БЫ


const testAssignments = [
    {
      title: "Задание 1",
      status: "Доступно до 2023-11-15",
      due: "Срок 2023-11-20",
      url: "https://example.com/assignment1",
      accessibility: true,
    },
    {
      title: "Задание 2",
      status: "Недоступно до 2023-11-16",
      due: "Срок 2023-11-21",
      url: "https://example.com/assignment2",
      accessibility: false,
    },
    {
      title: "Задание 3",
      status: "Доступно до 2023-11-17",
      due: "Срок 2023-11-22",
      url: "https://example.com/assignment3",
      accessibility: true,
    },
  ]; /* тут объяснять не надо, но мне нравится отправлять тебе послания в будущее*/
  
bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id; /* Получаем информацию о входящих сообщениях и их отправителях */

  if (text === '/start') {

    await bot.sendMessage(chatId, '*Добро пожаловать в бота-напоминалку!* Здесь вы можете следить за всем своим LMS: Дедлайны по ДЗ, экзамены, всё-всё-всё)',
      { parse_mode: "Markdown" });

    await new Promise(resolve => setTimeout(resolve, 3000));
    await bot.sendMessage(chatId,
      'Этот телеграм-бот разработали студенты второго курса Хекслета [Родион Волков](https://github.com/Hisun0) и [Антон Грейвер](https://github.com/antoshhkii).',
      { parse_mode: "Markdown", disable_web_page_preview: true });

    await new Promise(resolve => setTimeout(resolve, 3000));
    await bot.sendMessage(chatId,
      'Чем могу вам помочь?');
    
    
    const setupKeyboard = {
      keyboard: [
        ['Первый курс', 'Второй курс']
      ],

      resize_keyboard: true,
      one_time_keyboard: true,
    }
    
    const initSetupKeyboard = {
      reply_markup: JSON.stringify(setupKeyboard),
    };
    
    await bot.sendMessage(chatId, 'Давай определимся с твоим курсом', initSetupKeyboard); 

    if (text === 'Первый курс') {
      //Запись в бд, открываются уроки первого курса, как их правда отличать я не ебу
      //
      //Я рассматриваю вариант, что на тестовом LMS аккаунте у нас будет сразу доступ ко всем
      //Можно два тестовых на каждый курс, со вторым дипломом на каждом, там в опциях выбрать
      await bot.sendMessage(chatId, 'Первачок, выбирай свои курсы:');
  }}; /* Железно похуй алгоритму на текст "первый курс", кидаю на ветку и спать, время кстати 5:37 */


  
//  if (text === '/subscriptions') {
//    await bot.sendMessage(chat,id,
//      `Вы подписаны на:`)
//  }; <- Тут подтягивать с бд у юзера лист подписок

//  if (text === '/subscribe') {
//    await bot.sendMessage(chat,id,
//      `Выберите курс:`)
//  }; <- Тут подтягивать с бд у юзера лист подписок

//  if (text === '/unsubscribe') {
//    await bot.sendMessage(chat,id,
//      `Выберите курс:`)
//  }; <- Тут подтягивать с бд у юзера лист подписок

// Здесь же еще должен быть чек на выбор

}); // Тело всех алгоритмов

