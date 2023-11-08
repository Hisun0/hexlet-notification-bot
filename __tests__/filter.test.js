// import { expect, test } from "jest";
import filterData from "../src/filter-data.js";

const data1 = [
  {
    accessibility: false,
    due: "October 31, 2023 23:59:00",
    id: "75",
    title: "Рубежная аттестация по программированию",
    url: "https://lms.hexly.ru/courses/75/assignments/2450",
  },
  {
    accessibility: true,
    due: "December 24, 2023 23:59:00",
    id: "75",
    title: "Задание codewars.com",
    url: "https://lms.hexly.ru/courses/75/assignments/2560",
  },
];

const newData1 = [
  {
    accessibility: true,
    due: "October 31, 2023 23:59:00",
    id: "75",
    title: "Рубежная аттестация по программированию",
    url: "https://lms.hexly.ru/courses/75/assignments/2450",
  },
  {
    accessibility: true,
    due: "December 24, 2023 23:59:00",
    id: "75",
    title: "Задание codewars.com",
    url: "https://lms.hexly.ru/courses/75/assignments/2560",
  },
];

const data2 = [
  {
    accessibility: false,
    due: "October 31, 2023 23:59:00",
    id: "75",
    title: "Рубежная аттестация по программированию",
    url: "https://lms.hexly.ru/courses/75/assignments/2450",
  },
  {
    accessibility: true,
    due: "December 24, 2023 23:59:00",
    id: "75",
    title: "Задание codewars.com",
    url: "https://lms.hexly.ru/courses/75/assignments/2560",
  },
];

const newData2 = [
  {
    accessibility: false,
    due: "October 31, 2023 23:59:00",
    id: "75",
    title: "Рубежная аттестация по программированию",
    url: "https://lms.hexly.ru/courses/75/assignments/2450",
  },
  {
    accessibility: true,
    due: "December 24, 2023 23:59:00",
    id: "75",
    title: "Задание codewars.com",
    url: "https://lms.hexly.ru/courses/75/assignments/2560",
  },
  {
    accessibility: true,
    due: "October 31, 2023 23:59:00",
    id: "79",
    title: "Рубежная аттестация по администрированию",
    url: "https://lms.hexly.ru/courses/79/assignments/2467",
  },
  {
    accessibility: false,
    due: "October 11, 2023 23:59:00",
    id: "79",
    title: "Рубежная аттестация по администрированию",
    url: "https://lms.hexly.ru/courses/79/assignments/2468",
  },
];

const result1 = { 0: { accessibility: true } };
const result2 = {
  2: {
    accessibility: true,
    due: "October 31, 2023 23:59:00",
    id: "79",
    title: "Рубежная аттестация по администрированию",
    url: "https://lms.hexly.ru/courses/79/assignments/2467",
  },
  3: {
    accessibility: false,
    due: "October 11, 2023 23:59:00",
    id: "79",
    title: "Рубежная аттестация по администрированию",
    url: "https://lms.hexly.ru/courses/79/assignments/2468",
  },
};

test("simple filter", () => {
  expect(filterData(data1, newData1)).toEqual(result1);
});

test("with completely new data filter", () => {
  expect(filterData(data2, newData2)).toEqual(result2);
});
