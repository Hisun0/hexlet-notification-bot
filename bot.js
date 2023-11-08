import TelegramBot from "node-telegram-bot-api";

import config from "./config.js"; 
import { Keyboard } from "./src/classes.js";

const token = config.token;

const bot = new TelegramBot(token, {polling: true});

bot.on ('message', async msg => {

  const { text, chat }  = msg;  
  const { id } = chat;

  const user = {
    id: id,
  };

  const buttons = {
    start: ['Окей'],
    course: ['Первый курс', 'Второй курс'],
    secondDiploma: ['Да, я получаю второй диплом', 'Нет, не получаю'],
  };

  if (text === '/start') {
    const startText =
`*Добро пожаловать в бота-напоминалку!* Здесь вы можете следить за всем своим LMS: Дедлайны по ДЗ, экзамены, всё-всё-всё)

Этот телеграм-бот разработали студенты второго курса Хекслета [Родион Волков](https://github.com/Hisun0) и [Антон Грейвер](https://github.com/antoshhkii).

Ну что, давай приступим?)`;

    
    const startOptions = { parse_mode: "Markdown", disable_web_page_preview: true };
    const startKeyboard = new Keyboard(buttons.start, startOptions);
    
    await bot.sendMessage(id, startText, startKeyboard);
  };


  if (text === 'Окей') {
    
    const courseText = 'Теперь давай определимся с твоим курсом. Какой ты курс сейчас проходишь?';
    const courseKeyboard = new Keyboard(buttons.course)

    await bot.sendMessage(id, courseText, courseKeyboard);
  };


  if (buttons.course.includes(text)) {
    if (text === buttons.course[0]) {
      // Запись в бд user.course = 1;
    } else if (text === buttons.course[1]) {
      // Запись в бд user.couse = 2;
    }

    const secondDiplomaText = 'Отлично. Кажется последний вопрос. Ты получаешь второй диплом?'
    const secondDiplomaKeyboard = new Keyboard(buttons.secondDiploma);

    await bot.sendMessage(id, secondDiplomaText, secondDiplomaKeyboard);
  };

  if (buttons.secondDiploma.includes(text)) {
    if (text === buttons.secondDiploma[0]) {
      // Запись в бд user.secondDiploma = true;
    } else if (text === buttons.secondDiploma[1]) {
      // Запись в бд user.secondDiploma = false;
    }
    console.log(user);
  }
});

