/* языки */

// Русский язык
const langRu = {
    title: "Карточки с 4 окошками",
    save: "Сохранить",
    saved: "Сохранено:",
    placeholder: "Введите текст...",
    section: "Секция",
    window1: "Окошко 1 (синее)",
    window2: "Окошко 2 (фиолетовое)",
    window3: "Окошко 3 (зеленое)",
    window4: "Окошко 4 (оранжевое)"
};

// Английский язык
const langEn = {
    title: "Cards with 4 windows",
    save: "Save",
    saved: "Saved:",
    placeholder: "Enter text...",
    section: "Section",
    window1: "Window 1 (blue)",
    window2: "Window 2 (purple)",
    window3: "Window 3 (green)",
    window4: "Window 4 (orange)"
};

// Немецкий язык
const langDe = {
    title: "Karten mit 4 Fenstern",
    save: "Speichern",
    saved: "Gespeichert:",
    placeholder: "Text eingeben...",
    section: "Sektion",
    window1: "Fenster 1 (blau)",
    window2: "Fenster 2 (lila)",
    window3: "Fenster 3 (grün)",
    window4: "Fenster 4 (orange)"
};

// Все переводы
const translations = { ru: langRu, en: langEn, de: langDe };
let currentLang = 'ru';

/* ФУНКЦИЯ ПРИМЕНЕНИЯ ПЕРЕВОДОВ */
function applyTranslations() {
    const t = translations[currentLang];
    if (!t) return;
    
    document.getElementById('mainTitle').textContent = t.title;
    document.getElementById('textInput').placeholder = t.placeholder;
    document.getElementById('saveBtn').textContent = t.save;
    document.getElementById('savedLabel').textContent = t.saved;
    
    // Заголовки секций
    document.querySelectorAll('.section-title').forEach((el, i) => {
        el.textContent = `${t.section} ${i + 1}`;
    });
    
    // Окошки
    const windowLabels = document.querySelectorAll('.window-label');
    const keys = ['window1', 'window2', 'window3', 'window4'];
    windowLabels.forEach((label, i) => {
        label.textContent = t[keys[i % 4]];
    });
}

/* СМЕНА ЯЗЫКА */
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        applyTranslations();
        localStorage.setItem('language', lang);
    }
}

// Загружаем сохраненный язык
const savedLang = localStorage.getItem('language');
if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
}
