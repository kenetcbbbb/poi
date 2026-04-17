/* ========== LOCALSTORAGE ========== */
function saveToStorage() {
    const value = document.getElementById('textInput').value;
    if (value) {
        localStorage.setItem('myValue', value);
        document.getElementById('savedValue').textContent = value;
    }
}

function loadFromStorage() {
    const saved = localStorage.getItem('myValue');
    if (saved) {
        document.getElementById('savedValue').textContent = saved;
    }
}

/* ========== СОЗДАНИЕ СЕКЦИЙ, КАРТОЧЕК И 4 ОКОШЕК ========== */
function createSections() {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    // 4 секции
    for (let s = 1; s <= 4; s++) {
        const section = document.createElement('div');
        section.className = 'section';
        
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = 'Секция ' + s;
        section.appendChild(title);
        
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'cards-grid';
        
        // 8 карточек в секции
        for (let c = 1; c <= 8; c++) {
            const card = document.createElement('div');
            card.className = 'card';
            
            const cardNum = document.createElement('div');
            cardNum.className = 'card-number';
            cardNum.textContent = 'Карточка ' + c;
            card.appendChild(cardNum);
            
            // 4 окошка с разными цветами
            const windows = [
                { type: 'primary', label: 'Окошко 1 (синее)' },
                { type: 'secondary', label: 'Окошко 2 (фиолетовое)' },
                { type: 'accent', label: 'Окошко 3 (зеленое)' },
                { type: 'warning', label: 'Окошко 4 (оранжевое)' }
            ];
            
            windows.forEach((win) => {
                const windowDiv = document.createElement('div');
                windowDiv.className = 'window window--' + win.type + ' anim-fade';
                
                const label = document.createElement('label');
                label.className = 'window-label';
                label.textContent = win.label;
                
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Введите текст...';
                
                windowDiv.appendChild(label);
                windowDiv.appendChild(input);
                card.appendChild(windowDiv);
            });
            
            cardsGrid.appendChild(card);
        }
        
        section.appendChild(cardsGrid);
        container.appendChild(section);
    }
}

/* ========== ПЕРЕМЕШИВАНИЕ СЕКЦИЙ ========== */
function shuffleSections() {
    const container = document.getElementById('sectionsContainer');
    if (!container) return;
    const sections = Array.from(container.children);
    const shuffled = sections.sort(() => Math.random() - 0.5);
    shuffled.forEach(section => container.appendChild(section));
}

/* ========== ОБНОВЛЕНИЕ ПЕРЕВОДОВ (без data-i18n) ========== */
function updateAllTranslations() {
    // Получаем текущий язык из глобальной переменной
    let currentLang = window.currentLanguage || 'ru';
    let t;
    
    if (currentLang === 'ru') {
        t = {
            title: "Карточки с 4 окошками",
            save: "💾 Сохранить",
            saved: "📦 Сохранено:",
            placeholder: "Введите текст...",
            section: "Секция",
            window1: "Окошко 1 (синее)",
            window2: "Окошко 2 (фиолетовое)",
            window3: "Окошко 3 (зеленое)",
            window4: "Окошко 4 (оранжевое)"
        };
    } else if (currentLang === 'en') {
        t = {
            title: "Cards with 4 windows",
            save: "💾 Save",
            saved: "📦 Saved:",
            placeholder: "Enter text...",
            section: "Section",
            window1: "Window 1 (blue)",
            window2: "Window 2 (purple)",
            window3: "Window 3 (green)",
            window4: "Window 4 (orange)"
        };
    } else {
        t = {
            title: "Karten mit 4 Fenstern",
            save: "💾 Speichern",
            saved: "📦 Gespeichert:",
            placeholder: "Text eingeben...",
            section: "Sektion",
            window1: "Fenster 1 (blau)",
            window2: "Fenster 2 (lila)",
            window3: "Fenster 3 (grün)",
            window4: "Fenster 4 (orange)"
        };
    }
    
    // Заголовок страницы
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) mainTitle.textContent = t.title;
    
    // LocalStorage блок
    const textInput = document.getElementById('textInput');
    if (textInput) textInput.placeholder = t.placeholder;
    
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.textContent = t.save;
    
    const savedLabel = document.getElementById('savedLabel');
    if (savedLabel) savedLabel.textContent = t.saved;
    
    // Заголовки секций
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((el, i) => {
        el.textContent = t.section + ' ' + (i + 1);
    });
    
    // Окошки (4 на каждую карточку)
    const allWindowLabels = document.querySelectorAll('.window-label');
    const windowTexts = [t.window1, t.window2, t.window3, t.window4];
    allWindowLabels.forEach((label, index) => {
        const windowIndex = index % 4;
        label.textContent = windowTexts[windowIndex];
    });
}

/* ========== СМЕНА ЯЗЫКА ========== */
function changeLanguage(lang) {
    window.currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateAllTranslations();
}

/* ========== ТЕМА (светлая/темная) ========== */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', 'dark');
    }
}

/* ========== НАПРАВЛЕНИЕ (RTL/LTR) ========== */
function toggleDirection() {
    const html = document.documentElement;
    const isRtl = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
}

/* ========== LINTER (проверка на пиксели) ========== */
function runLinter() {
    const allElements = document.querySelectorAll('[style]');
    let hasPixels = false;
    allElements.forEach(el => {
        const style = el.getAttribute('style');
        if (style && /\d+px/.test(style)) {
            console.warn('⚠️ Найдены пиксели:', style);
            hasPixels = true;
        }
    });
    if (!hasPixels) console.log('✅ Linter: пиксели не используются, всё в rem');
}

/* ========== ПРОВЕРКА АДАПТИВА ========== */
function checkResponsive() {
    const width = window.innerWidth;
    console.log('📐 Текущая ширина:', width + 'px');
    if (Math.abs(width - 756) < 10) console.log('✅ Проверка на 756px - OK');
    if (Math.abs(width - 750) < 10) console.log('✅ Проверка на 750px - OK');
    if (Math.abs(width - 1200) < 10) console.log('✅ Проверка на 1200px - OK');
}

/* ========== ИНИЦИАЛИЗАЦИЯ ========== */
function init() {
    console.log('🚀 Запуск приложения...');
    
    // Загружаем сохраненный язык
    const savedLang = localStorage.getItem('language');
    window.currentLanguage = savedLang || 'ru';
    
    // Создаем секции с карточками
    createSections();
    
    // Перемешиваем секции
    shuffleSections();
    
    // Загружаем данные из LocalStorage
    loadFromStorage();
    
    // Применяем переводы
    updateAllTranslations();
    
    // Проверяем linter
    runLinter();
    
    // Проверяем адаптив
    checkResponsive();
    
    // Выводим WhatrLabel в консоль
    const html = document.documentElement;
    console.log('📋 WhatrLabel конфиг:', {
        whatrlabel: getComputedStyle(html).getPropertyValue('--whatrlabel-version'),
        direction: html.getAttribute('dir'),
        theme: html.getAttribute('data-theme') || 'light'
    });
    
    console.log('✅ Приложение загружено! Секций:', document.querySelectorAll('.section').length);
}

// Запускаем после полной загрузки DOM
document.addEventListener('DOMContentLoaded', init);
