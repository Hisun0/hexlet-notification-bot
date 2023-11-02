export default () => {
  const isAvailableNow = (str) => {
    const mapping = {
      "Доступно до": true,
      "Недоступно до": false,
      Закрыто: false,
    };

    return mapping[str];
  };

  const normalizeDate = (date) => {
    const dates = {
      "янв.": "January",
      "февр.": "February",
      марта: "March",
      "апр.": "April",
      мая: "May",
      июня: "June",
      июля: "July",
      "авг.": "August",
      "сент.": "September",
      "окт.": "October",
      "нояб.": "November",
      "дек.": "December",
    };

    const [number, month, , time] = date.split(" ");
    return `${dates[month]} ${number}, ${new Date().getFullYear()} ${time}:00`;
  };

  const liList = [...document.querySelectorAll(".ig-info")];

  return liList.map((li) => {
    const title = li.querySelector(".ig-title").textContent.trim();
    if (title === "Roll Call Attendance") return null; // я ненавижу человека, который добавил этот курс...
    const url = li.querySelector(".ig-title").getAttribute("href");
    const statusDescription = li
      .querySelector(".status-description")
      .textContent.trim();

    const statusDueDate =
      li.querySelector("span[data-tooltip]").dataset.htmlTooltipTitle;

    const accessibility = isAvailableNow(statusDescription);
    const date = normalizeDate(statusDueDate);

    return { title, url, due: date, accessibility };
  });
};
