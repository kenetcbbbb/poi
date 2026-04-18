/* ========== ПОДКЛЮЧАЕМ JSON ФАЙЛЫ ========== */
// Русский язык (ru)
const ruTranslations = {
    "title": "Карточки с 4 окошками",
    "save": "💾 Сохранить",
    "saved": "📦 Сохранено:",
    "placeholder": "Введите текст...",
    "section": "Секция",
    "window1": "Окошко 1 (синее)",
    "window2": "Окошко 2 (фиолетовое)",
    "window3": "Окошко 3 (зеленое)",
    "window4": "Окошко 4 (оранжевое)"
};

// Английский язык (en)
const enTranslations = {
    "title": "Cards with 4 windows",
    "save": "💾 Save",
    "saved": "📦 Saved:",
    "placeholder": "Enter text...",
    "section": "Section",
    "window1": "Window 1 (blue)",
    "window2": "Window 2 (purple)",
    "window3": "Window 3 (green)",
    "window4": "Window 4 (orange)"
};

// Немецкий язык (de)
const deTranslations = {
    "title": "Karten mit 4 Fenstern",
    "save": "💾 Speichern",
    "saved": "📦 Gespeichert:",
    "placeholder": "Text eingeben...",
    "section": "Sektion",
    "window1": "Fenster 1 (blau)",
    "window2": "Fenster 2 (lila)",
    "window3": "Fenster 3 (grün)",
    "window4": "Fenster 4 (orange)"
};

// ========== СБОРНИК ВСЕХ ПЕРЕВОДОВ ==========
const translations = {
    ru: ruTranslations,
    en: enTranslations,
    de: deTranslations
};

// Текущий язык (по умолчанию русский)
let currentLanguage = 'ru';

// ========== ФУНКЦИЯ ПРИМЕНЕНИЯ ПЕРЕВОДОВ ==========
function applyTranslations() {
    // Берём переводы для текущего языка
    const t = translations[currentLanguage];
    if (!t) return;
    
    // Переводим заголовок страницы
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) mainTitle.textContent = t.title;
    
    // Переводим поле ввода (placeholder)
    const textInput = document.getElementById('textInput');
    if (textInput) textInput.placeholder = t.placeholder;
    
    // Переводим кнопку сохранения
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.textContent = t.save;
    
    // Переводим надпись "Сохранено:"
    const savedLabel = document.getElementById('savedLabel');
    if (savedLabel) savedLabel.textContent = t.saved;
    
    // Переводим заголовки секций ("Секция 1", "Секция 2"...)
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((element, index) => {
        element.textContent = `${t.section} ${index + 1}`;
    });
    
    // Переводим подписи у 4 окошек в каждой карточке
    const windowLabels = document.querySelectorAll('.window-label');
    const windowKeys = ['window1', 'window2', 'window3', 'window4'];
    windowLabels.forEach((label, index) => {
        // index % 4 - чтобы повторять 1,2,3,4,1,2,3,4...
        const keyIndex = index % 4;
        label.textContent = t[windowKeys[keyIndex]];
    });
}

// ========== ФУНКЦИЯ СМЕНЫ ЯЗЫКА ==========
function changeLanguage(lang) {
    // Проверяем, есть ли такой язык
    if (translations[lang]) {
        currentLanguage = lang;
        applyTranslations();                    // Меняем тексты на странице
        localStorage.setItem('language', lang); // Сохраняем выбор в браузере
    }
}

// ========== ЗАГРУЗКА СОХРАНЁННОГО ЯЗЫКА ==========
const savedLanguage = localStorage.getItem('language');
if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
}

// ========== АВТОЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
});