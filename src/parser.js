import puppeteer from "puppeteer";
import config from "../config.js";

const courses = {
  "Менеджмент в профессиональной деятельности": "68",
  "Операционные системы и компьютерные сети": "66",
  "Поддержка и тестирование программных модулей": "71",
  "Структура отрасли": "67",
  "Прикладное программирование": "75",
};

const login = async (page) => {
  await page.goto(`https://lms.hexly.ru/`, {
    waitUntil: "domcontentloaded",
  });

  await page.type("#username", config.lmsAuth.email, { delay: 100 });
  await page.type("#password", config.lmsAuth.password, { delay: 100 });
  await page.click("#kc-login", { delay: 200 });

  await page.waitForSelector("#dashboard_header_container");
};

const getCourseAssignments = async (page, course) => {
  await page.goto(`https://lms.hexly.ru/courses/${course}/assignments`, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector("#assignment_group_upcoming_assignments");

  const assignment = await page.evaluate(() => {
    const ulContainer = document.querySelector(
      "#assignment_group_upcoming_assignments"
    );
    const ul = ulContainer.querySelector(".collectionViewItems");
    const liList = ul.querySelectorAll(".assignment");

    return Array.from(liList).map((li) => {
      const dateContainer = li.querySelector(".assignment-date-available");
      const title = li.querySelector(".ig-title").textContent.trim();
      const url = li.querySelector(".ig-title").getAttribute("href");
      const statusDescription = dateContainer
        .querySelector(".status-description")
        .textContent.trim();

      const statusDate = dateContainer
        .querySelector("span[data-tooltip]")
        .textContent.trim();
      
      const status = `${statusDescription} ${statusDate}`;
      const dueDateContainer = li.querySelector(".assignment-date-due");
      const statusDueDate = dueDateContainer
        .querySelector("span[data-tooltip]")
        .textContent.trim();
      
      const due = `Срок ${statusDueDate}`;

      const isAvailableNow = (str) => {
        const mapping = {
          "Доступно до": true,
          "Недоступно до": false,
        };

        return mapping[str];
      };

      const accessibility = isAvailableNow(statusDescription);

      return { title, status, due, url, accessibility };
    });
  });

  return assignment;
};

const func = async (courseName) => {
  const course = courses[courseName];

  const browser = await puppeteer.launch({
    headless: false, // значение false чисто для дебага // хорош
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await login(page);
  const assignment = await getCourseAssignments(page, course);

  await browser.close();
  return assignment;
};

console.log(await func("Прикладное программирование"));

