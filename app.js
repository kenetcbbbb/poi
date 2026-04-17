/* LOCALSTORAGE */
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

/* СОЗДАНИЕ СЕКЦИЙ, КАРТОЧЕК И 4 ОКОШЕК */
function createSections() {
    const container = document.getElementById('sectionsContainer');
    container.innerHTML = '';
    
    // 4 секции
    for (let s = 1; s <= 4; s++) {
        const section = document.createElement('div');
        section.className = 'section';
        
        const title = document.createElement('h2');
        title.className = 'section-title';
        section.appendChild(title);
        
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'cards-grid';
        
        // 8 карточек в секции
        for (let c = 1; c <= 8; c++) {
            const card = document.createElement('div');
            card.className = 'card';
            
            const cardNum = document.createElement('div');
            cardNum.className = 'card-number';
            cardNum.textContent = `Карточка ${c}`;
            card.appendChild(cardNum);
            
            // 4 окошка
            const windows = [
                { type: 'primary', label: 'Окошко 1' },
                { type: 'secondary', label: 'Окошко 2' },
                { type: 'accent', label: 'Окошко 3' },
                { type: 'warning', label: 'Окошко 4' }
            ];
            
            windows.forEach((win, idx) => {
                const windowDiv = document.createElement('div');
                windowDiv.className = `window window--${win.type} anim-fade`;
                
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

/*  ПЕРЕМЕШИВАНИЕ СЕКЦИЙ */
function shuffleSections() {
    const container = document.getElementById('sectionsContainer');
    const sections = Array.from(container.children);
    const shuffled = sections.sort(() => Math.random() - 0.5);
    shuffled.forEach(section => container.appendChild(section));
}

/* ТЕМА (светлая/темная)  */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', 'dark');
    }
}

/* НАПРАВЛЕНИЕ (RTL/LTR) */
function toggleDirection() {
    const html = document.documentElement;
    const isRtl = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
}

/* LINTER (проверка на пиксели) */
function runLinter() {
    const allStyles = document.querySelectorAll('[style]');
    let hasPixels = false;
    allStyles.forEach(el => {
        const style = el.getAttribute('style');
        if (style && /\d+px/.test(style)) {
            console.warn('Найдены пиксели:', style);
            hasPixels = true;
        }
    });
    if (!hasPixels) console.log('✅ Linter: пиксели не используются');
}

/*ИНИЦИАЛИЗАЦИЯ */
function init() {
    createSections();
    shuffleSections();
    loadFromStorage();
    applyTranslations();
    runLinter();
    
    // Вывод WhatrLabel в консоль
    console.log('WhatrLabel:', {
        version: getComputedStyle(document.documentElement).getPropertyValue('--whatrlabel-version'),
        direction: document.documentElement.getAttribute('dir'),
        theme: document.documentElement.getAttribute('data-theme') || 'light'
    });
}

// Запуск
document.addEventListener('DOMContentLoaded', init);
