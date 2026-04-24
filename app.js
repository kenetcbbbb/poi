/* ============================================================
   ГЛАВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ
   
   Этот файл отвечает за:
   1. Сохранение данных в localStorage
   2. Создание секций, карточек и окошек
   3. Перемешивание секций
   4. Переключение языков (переводы)
   5. Переключение тем (светлая/темная)
   6. Переключение направления текста (RTL/LTR)
   7. Проверку кода (linter)
   8. Запуск всего приложения
   ============================================================ */

// ===== 1. LOCALSTORAGE (СОХРАНЕНИЕ ДАННЫХ В БРАУЗЕРЕ) =====
// localStorage - это хранилище в браузере, которое сохраняет данные даже после закрытия страницы

// Объявляем функцию saveToStorage - она будет сохранять текст в localStorage
function saveToStorage() {
    // document.getElementById('textInput') - находим HTML элемент с id="textInput" (поле ввода)
    // .value - получаем текст, который ввёл пользователь в это поле
    // const value - создаём переменную и кладём туда этот текст
    const value = document.getElementById('textInput').value;
    
    // if (value) - проверяем, что поле не пустое
    // if сработает только если value не пустая строка, не null, не undefined
    if (value) {
        // localStorage.setItem(ключ, значение) - сохраняет данные в браузер
        // 'myValue' - это ключ (имя), по которому потом найдём данные
        // value - это то, что ввёл пользователь (сохраняемое значение)
        localStorage.setItem('myValue', value);
        
        // document.getElementById('savedValue') - находим элемент, куда выводим сохранённое
        // .textContent = value - меняем текст внутри элемента на сохранённое значение
        document.getElementById('savedValue').textContent = value;
    }
    // Если поле пустое - ничего не делаем, просто выходим из функции
}

// Объявляем функцию loadFromStorage - она будет загружать сохранённый текст
function loadFromStorage() {
    // localStorage.getItem(ключ) - достаём сохранённое значение по ключу 'myValue'
    // const saved - создаём переменную и кладём туда то, что достали из хранилища
    // Если ничего не сохранено, saved будет равен null
    const saved = localStorage.getItem('myValue');
    
    // if (saved) - проверяем, что что-то сохранено (не null и не пустое)
    if (saved) {
        // Находим элемент с id="savedValue" и меняем его текст на сохранённое значение
        document.getElementById('savedValue').textContent = saved;
    }
    // Если ничего не сохранено - ничего не делаем, элемент остаётся пустым
}

// ===== 2. СОЗДАНИЕ СЕКЦИЙ, КАРТОЧЕК И ОКОШЕК =====

// Объявляем функцию createSections - она создаёт все секции, карточки и окошки
function createSections() {
    // document.getElementById('sectionsContainer') - находим контейнер (пустой div в HTML)
    // const container - кладём этот контейнер в переменную
    const container = document.getElementById('sectionsContainer');
    
    // if (!container) return - если контейнера нет (защита от ошибки), выходим из функции
    // !container означает "НЕ container" - если контейнера не существует
    if (!container) return;
    
    // container.innerHTML = '' - очищаем контейнер (удаляем всё, что было внутри)
    // Это нужно, чтобы при повторном вызове не создавались дубликаты
    container.innerHTML = '';
    
    // ===== СОЗДАЁМ 4 СЕКЦИИ =====
    // for (let s = 1; s <= 4; s++) - цикл от 1 до 4
    // let s = 1 - начинаем с 1
    // s <= 4 - продолжаем пока s меньше или равно 4
    // s++ - после каждого шага увеличиваем s на 1
    // s будет: 1, потом 2, потом 3, потом 4
    for (let s = 1; s <= 4; s++) {
        
        // document.createElement('div') - создаём HTML элемент <div></div>
        // const section - кладём этот новый элемент в переменную
        const section = document.createElement('div');
        
        // .className = 'section' - добавляем CSS класс для стилизации
        // Теперь в CSS можно написать .section { ... } и стилизовать секцию
        section.className = 'section';
        
        // Создаём заголовок секции - элемент <h2></h2>
        const title = document.createElement('h2');
        
        // Добавляем класс 'section-title' для стилизации заголовка
        title.className = 'section-title';
        
        // .textContent = 'Секция ' + s - пишем текст внутри заголовка
        // Когда s=1 → "Секция 1", s=2 → "Секция 2" и т.д.
        title.textContent = 'Секция ' + s;
        
        // .appendChild(title) - добавляем заголовок внутрь секции
        // Теперь внутри <div class="section"> есть <h2>Секция 1</h2>
        section.appendChild(title);
        
        // Создаём контейнер для карточек (сетка)
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'cards-grid';
        
        // ===== СОЗДАЁМ 8 КАРТОЧЕК В СЕКЦИИ =====
        // for (let c = 1; c <= 8; c++) - цикл от 1 до 8
        // c будет: 1,2,3,4,5,6,7,8
        for (let c = 1; c <= 8; c++) {
            
            // Создаём карточку - элемент <div></div>
            const card = document.createElement('div');
            card.className = 'card';
            
            // Создаём элемент для номера карточки
            const cardNum = document.createElement('div');
            cardNum.className = 'card-number';
            cardNum.textContent = 'Карточка ' + c;  // "Карточка 1", "Карточка 2" и т.д.
            card.appendChild(cardNum);  // Добавляем номер в карточку
            
            // ===== СОЗДАЁМ 4 ОКОШКА В КАРТОЧКЕ =====
            // Массив объектов, каждый объект описывает одно окошко
            // Объект в фигурных скобках { ключ: значение, ключ2: значение2 }
            const windows = [
                { type: 'primary', label: 'Окошко 1 (синее)' },    // 1-е окошко
                { type: 'secondary', label: 'Окошко 2 (фиолетовое)' }, // 2-е окошко
                { type: 'accent', label: 'Окошко 3 (зеленое)' },   // 3-е окошко
                { type: 'warning', label: 'Окошко 4 (оранжевое)' }  // 4-е окошко
            ];
            
            // .forEach() - перебираем массив, для каждого элемента выполняем функцию
            // win - это текущий элемент массива (одно окошко)
            // Сначала win = { type: 'primary', label: 'Окошко 1 (синее)' }
            // Потом win = { type: 'secondary', label: 'Окошко 2 (фиолетовое)' } и т.д.
            windows.forEach((win) => {
                
                // Создаём контейнер для одного окошка - элемент <div></div>
                const windowDiv = document.createElement('div');
                
                // Формируем класс: 'window window--primary anim-fade'
                // win.type подставит 'primary', 'secondary', 'accent' или 'warning'
                // + это склеивание строк (конкатенация)
                // 'window window--' + 'primary' = 'window window--primary'
                windowDiv.className = 'window window--' + win.type + ' anim-fade';
                
                // Создаём подпись (label) для окошка - элемент <label></label>
                const label = document.createElement('label');
                label.className = 'window-label';
                label.textContent = win.label;  // Текст из массива, например "Окошко 1 (синее)"
                
                // Создаём поле ввода - элемент <input></input>
                const input = document.createElement('input');
                input.type = 'text';                 // Тип - текст (можно писать буквы)
                input.placeholder = 'Введите текст...';  // Подсказка внутри поля (серая)
                
                // Собираем окошко: добавляем label и input внутрь windowDiv
                // Теперь внутри <div class="window"> есть <label> и <input>
                windowDiv.appendChild(label);
                windowDiv.appendChild(input);
                
                // Добавляем окошко в карточку
                card.appendChild(windowDiv);
            });
            
            // Добавляем готовую карточку в сетку (cardsGrid)
            cardsGrid.appendChild(card);
        }
        
        // Добавляем сетку с карточками в секцию
        section.appendChild(cardsGrid);
        
        // Добавляем готовую секцию в главный контейнер на странице
        container.appendChild(section);
    }
    // После цикла у нас есть 4 секции, в каждой 8 карточек, в каждой карточке 4 окошка
    // Всего: 4 × 8 × 4 = 128 окошек на странице!
}

// ===== 3. ПЕРЕМЕШИВАНИЕ СЕКЦИЙ =====

// Объявляем функцию shuffleSections - она меняет порядок секций случайным образом
function shuffleSections() {
    // Находим контейнер с секциями
    const container = document.getElementById('sectionsContainer');
    
    // if (!container) return - если контейнера нет, выходим
    if (!container) return;
    
    // Array.from(container.children) - превращает список секций в массив
    // .children - все дочерние элементы (наши 4 секции)
    // const sections - кладём массив секций в переменную
    const sections = Array.from(container.children);
    
    // .sort(() => Math.random() - 0.5) - сортирует массив случайным образом
    // sort() обычно сортирует по алфавиту, но мы передаём свою функцию сравнения
    // Math.random() даёт случайное число от 0 до 1 (например 0.7, 0.2, 0.9)
    // Math.random() - 0.5 даёт число от -0.5 до 0.5
    // Если результат положительный - элементы меняются местами
    // Если отрицательный - остаются на месте
    // Это и создаёт случайный порядок
    const shuffled = sections.sort(() => Math.random() - 0.5);
    
    // .forEach - для каждого элемента массива выполняем функцию
    // section - текущая секция из перемешанного массива
    shuffled.forEach(section => {
        // container.appendChild(секция) - добавляет секцию в конец контейнера
        // Так как порядок в shuffled уже перемешан, секции расположатся в новом порядке
        container.appendChild(section);
    });
}

// ===== 4. ПЕРЕВОДЫ (смена языка) =====

// Переменная для хранения текущего языка
// let - переменную можно менять (в отличие от const)
// 'ru' - значение по умолчанию (русский)
let currentLanguage = 'ru';

// Функция обновляет все тексты на странице в соответствии с выбранным языком
function updateAllTranslations() {
    // window.translations - объект с переводами из файла i18n.js
    // [currentLanguage] - берём перевод для текущего языка (ru, en или de)
    // const t - кладём переводы в переменную для удобства
    const t = window.translations[currentLanguage];
    
    // if (!t) return - если переводов для такого языка нет, выходим из функции
    // !t означает "НЕ t" - если t не существует
    if (!t) return;
    
    // ===== МЕНЯЕМ ЗАГОЛОВОК СТРАНИЦЫ =====
    // Находим элемент с id="mainTitle" (это <h1> на странице)
    const mainTitle = document.getElementById('mainTitle');
    // Если элемент существует (не null), меняем его текст на t.title (переведённый заголовок)
    if (mainTitle) mainTitle.textContent = t.title;
    
    // ===== МЕНЯЕМ ПОДСКАЗКУ В ПОЛЕ ВВОДА =====
    // Находим поле ввода
    const textInput = document.getElementById('textInput');
    // Меняем placeholder (серую подсказку внутри поля)
    if (textInput) textInput.placeholder = t.placeholder;
    
    // ===== МЕНЯЕМ ТЕКСТ НА КНОПКЕ СОХРАНЕНИЯ =====
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.textContent = t.save;
    
    // ===== МЕНЯЕМ ПОДПИСЬ "Сохранено:" =====
    const savedLabel = document.getElementById('savedLabel');
    if (savedLabel) savedLabel.textContent = t.saved;
    
    // ===== МЕНЯЕМ ЗАГОЛОВКИ ВСЕХ СЕКЦИЙ =====
    // document.querySelectorAll('.section-title') - находим ВСЕ элементы с классом section-title
    // Это все заголовки секций (их 4 штуки)
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // .forEach((el, i) => ...) - для каждого заголовка выполняем функцию
    // el - текущий элемент (заголовок)
    // i - индекс (номер по порядку: 0, 1, 2, 3)
    sectionTitles.forEach((el, i) => {
        // t.section - слово "Секция" или "Section" на текущем языке
        // i + 1 - номер секции (индекс 0 → 1, индекс 1 → 2 и т.д.)
        // Склеиваем: "Секция" + " " + "1" = "Секция 1"
        el.textContent = t.section + ' ' + (i + 1);
    });
    
    // ===== МЕНЯЕМ ПОДПИСИ У ВСЕХ ОКОШЕК =====
    // Находим все элементы с классом window-label (подписи окошек)
    // Всего их: 4 секции × 8 карточек × 4 окошка = 128 подписей!
    const allWindowLabels = document.querySelectorAll('.window-label');
    
    // Массив с текстами для 4 окошек на текущем языке
    // t.window1, t.window2, t.window3, t.window4 - это переведённые тексты
    const windowTexts = [t.window1, t.window2, t.window3, t.window4];
    
    // .forEach((label, index) => ...) - для каждой подписи
    // label - текущий элемент (подпись)
    // index - номер по порядку (0, 1, 2, 3, 4, 5... до 127)
    allWindowLabels.forEach((label, index) => {
        // index % 4 - остаток от деления на 4
        // % называется "оператор взятия остатка"
        // Если index = 0 → 0 % 4 = 0
        // Если index = 1 → 1 % 4 = 1
        // Если index = 2 → 2 % 4 = 2
        // Если index = 3 → 3 % 4 = 3
        // Если index = 4 → 4 % 4 = 0 (снова 0)
        // Это нужно, чтобы:
        // - первые 4 подписи получили тексты для 1,2,3,4 окошек
        // - следующие 4 подписи (в следующей карточке) получили те же тексты
        const windowIndex = index % 4;
        label.textContent = windowTexts[windowIndex];
    });
}

// Функция для смены языка (вызывается при нажатии на кнопки)
function changeLanguage(lang) {
    currentLanguage = lang;                    // Меняем текущий язык на новый (ru/en/de)
    localStorage.setItem('language', lang);    // Сохраняем выбор в localStorage (чтобы не сбрасывалось)
    updateAllTranslations();                   // Обновляем все тексты на странице
}

// ===== 5. ТЕМА (светлая/темная) =====

// Функция переключает тему между светлой и тёмной
function toggleTheme() {
    // document.documentElement - это <html> тег (самый верхний элемент страницы)
    const html = document.documentElement;
    
    // .getAttribute('data-theme') - получаем значение атрибута data-theme
    // Если атрибут равен 'dark' → isDark = true, иначе false
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    // if (isDark) - если сейчас тёмная тема
    if (isDark) {
        // .removeAttribute('data-theme') - убираем атрибут (тема становится светлой)
        // CSS увидит, что атрибута нет, и применит светлые цвета
        html.removeAttribute('data-theme');
    } else {
        // Если сейчас светлая тема - добавляем атрибут data-theme="dark"
        // CSS увидит [data-theme="dark"] и применит тёмные цвета
        html.setAttribute('data-theme', 'dark');
    }
}

// ===== 6. НАПРАВЛЕНИЕ ТЕКСТА (RTL/LTR) =====

// Функция переключает направление текста
function toggleDirection() {
    const html = document.documentElement;
    
    // Проверяем, установлен ли атрибут dir="rtl" (right to left - справа налево)
    const isRtl = html.getAttribute('dir') === 'rtl';
    
    if (isRtl) {
        // Если сейчас RTL - меняем на LTR (left to right - слева направо)
        // Это стандартное направление для русского, английского и большинства языков
        html.setAttribute('dir', 'ltr');
    } else {
        // Если сейчас LTR - меняем на RTL (справа налево, для арабского/иврита)
        html.setAttribute('dir', 'rtl');
    }
}

// ===== 7. LINTER (проверка на пиксели) =====

// Функция проверяет, есть ли на странице стили с пикселями (px)
// Это плохая практика, мы используем только rem
function runLinter() {
    // document.querySelectorAll('[style]') - находим все элементы, у которых есть атрибут style
    // Например: <div style="color: red; margin: 10px"> - у такого элемента есть style
    const allElements = document.querySelectorAll('[style]');
    
    // Создаём переменную-флаг: найдены ли пиксели (пока нет, false)
    let hasPixels = false;
    
    // Перебираем каждый найденный элемент
    allElements.forEach(el => {
        // .getAttribute('style') - получаем содержимое атрибута style в виде строки
        // Например: "color: red; margin: 10px; padding: 5px"
        const style = el.getAttribute('style');
        
        // /\d+px/.test(style) - проверяем, есть ли в строке style цифра с px
        // \d - любая цифра (0-9)
        // + - один или много раз (10, 100, 5 и т.д.)
        // px - буквы px
        // .test(style) - проверяет, есть ли такое в строке style
        // Пример: "margin: 10px" содержит "10px" → true
        // Пример: "color: red" не содержит px → false
        if (style && /\d+px/.test(style)) {
            // console.warn - выводим предупреждение в консоль браузера (жёлтым цветом)
            console.warn('⚠️ Найдены пиксели:', style);
            hasPixels = true;  // Отмечаем, что нашли пиксели
        }
    });
    
    // if (!hasPixels) - если пиксели НЕ найдены (hasPixels всё ещё false)
    if (!hasPixels) {
        // console.log - выводим обычное сообщение в консоль (белым цветом)
        console.log('✅ Linter: пиксели не используются, всё в rem');
    }
}

// ===== 8. ПРОВЕРКА АДАПТИВА =====

// Функция проверяет текущую ширину экрана
function checkResponsive() {
    // window.innerWidth - ширина окна браузера в пикселях
    // const width - сохраняем в переменную
    const width = window.innerWidth;
    
    // Выводим в консоль текущую ширину
    console.log('📐 Текущая ширина:', width + 'px');
    
    // Math.abs(число) - модуль числа (убирает знак минус)
    // Math.abs(width - 756) - разница между текущей шириной и 756
    // < 10 - если разница меньше 10 пикселей (например 755, 756, 757)
    // Это значит, что ширина примерно равна 756
    if (Math.abs(width - 756) < 10) console.log('✅ Проверка на 756px - OK');
    if (Math.abs(width - 750) < 10) console.log('✅ Проверка на 750px - OK');
    if (Math.abs(width - 1200) < 10) console.log('✅ Проверка на 1200px - OK');
}

// ===== 9. ЗАПУСК ВСЕГО ПРИЛОЖЕНИЯ =====

// Главная функция инициализации - запускает всё приложение
function init() {
    // Выводим сообщение в консоль, что приложение запускается
    console.log('🚀 Запуск приложения...');
    
    // ===== ЗАГРУЖАЕМ СОХРАНЁННЫЙ ЯЗЫК =====
    // localStorage.getItem('language') - достаём сохранённый язык (ru/en/de)
    const savedLang = localStorage.getItem('language');
    
    // Если язык сохранён И этот язык есть в переводах
    // savedLang && window.translations[savedLang] - оба условия должны быть true
    if (savedLang && window.translations[savedLang]) {
        // Меняем текущий язык на сохранённый
        currentLanguage = savedLang;
    }
    
    // ===== СОЗДАЁМ ВСЕ СЕКЦИИ, КАРТОЧКИ И ОКОШКИ =====
    createSections();
    
    // ===== ПЕРЕМЕШИВАЕМ СЕКЦИИ =====
    shuffleSections();
    
    // ===== ЗАГРУЖАЕМ СОХРАНЁННЫЕ ДАННЫЕ ИЗ LOCALSTORAGE =====
    loadFromStorage();
    
    // ===== ПРИМЕНЯЕМ ПЕРЕВОДЫ =====
    updateAllTranslations();
    
    // ===== ПРОВЕРЯЕМ LINTER =====
    runLinter();
    
    // ===== ПРОВЕРЯЕМ АДАПТИВ =====
    checkResponsive();
    
    // ===== ВЫВОДИМ WHATRLABEL В КОНСОЛЬ =====
    const html = document.documentElement;
    // getComputedStyle(html) - получаем все CSS стили, применённые к <html>
    // .getPropertyValue('--whatrlabel-version') - получаем значение CSS переменной
    console.log('📋 WhatrLabel конфиг:', {
        whatrlabel: getComputedStyle(html).getPropertyValue('--whatrlabel-version'),
        direction: html.getAttribute('dir'),
        theme: html.getAttribute('data-theme') || 'light'  // Если темы нет, то 'light'
    });
    
    // ===== ПРОВЕРЯЕМ, ЧТО ВСЁ СОЗДАЛОСЬ =====
    // document.querySelectorAll('.section').length - считаем количество секций на странице
    console.log('✅ Приложение загружено! Секций:', document.querySelectorAll('.section').length);
}

// document.addEventListener('DOMContentLoaded', init) - ждём, пока загрузится вся страница
// 'DOMContentLoaded' - событие, которое срабатывает когда HTML загружен и готов
// init - функция, которая запустится после загрузки
document.addEventListener('DOMContentLoaded', init);