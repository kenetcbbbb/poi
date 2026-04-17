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
