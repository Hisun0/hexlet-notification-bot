import puppeteer from 'puppeteer';
import config from '../../config.js';
import parseLogic from './parse-logic.js';
import Firebase from '../Firebase.js';
import courses from '../../data/courses.js';

const firebase = new Firebase(config);
await firebase.auth();

const login = async (page) => {
  await page.goto(`https://lms.hexly.ru/`, {
    waitUntil: 'domcontentloaded',
  }); // заходим на страницу лмс

  await page.type('#username', config.lmsAuth.email, { delay: 100 }); // вводим email
  await page.type('#password', config.lmsAuth.password, { delay: 100 }); // вводим пароль
  await page.click('#kc-login', { delay: 200 }); // нажимаем на кнопку логина

  await page.waitForSelector('#dashboard_header_container'); // ждем пока прогрузится страница
};

const getCourseAssignments = async (page, id) => {
  await page.goto(`https://lms.hexly.ru/courses/${id}/assignments`, {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForSelector('.collectionViewItems');

  const assignments = await page.evaluate(parseLogic); // получаем список заданий

  const filteredAssignments = assignments.filter((el) => el !== null); // фильтруем от заданий, которые нам не подходят
  filteredAssignments.forEach((element) => {
    element.courseId = id;
    return;
  });
  return filteredAssignments;
};

const parser = async (courses) => {
  const parsedData = await Promise.all(
    courses.map(async ({ id }) => {
      const browser = await puppeteer.launch({
        headless: 'new', // false - debug
        defaultViewport: null,
      });

      const page = await browser.newPage();

      await login(page);
      const assignment = await getCourseAssignments(page, id);

      await browser.close();
      return assignment;
    })
  );

  return parsedData.reduce((acc, el) => acc.concat(el)); // убираем лишнюю вложенность
};

export default parser;

const result = await parser(courses);
result.forEach((el) => firebase.push(el, 'assignments'));
