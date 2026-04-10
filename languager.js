const i18n = {
  ru: {
    basket: "Корзина",
    window1: "Окно 1",
    window2: "Окно 2",
    window3: "Окно 3",
    window4: "Окно 4",
    section: "Секция"
  },
  en: {
    basket: "Basket",
    window1: "Window 1",
    window2: "Window 2",
    window3: "Window 3",
    window4: "Window 4",
    section: "Section"
  }
};

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = i18n[lang][key];
  });
}

applyLang("ru"); // язык по умолчанию
