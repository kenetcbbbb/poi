/* этот файл отвечает за:
   1. сохранение текста в localstorage
   2. создание секций, карточек и окошек через js
   3. перемешивание секций
   4. переключение темы
   5. переключение направления текста
   6. проверку linter
   7. запуск приложения
*/


// localstorage

// функция сохраняет текст, который пользователь ввёл в input
function saveToStorage() {
    // получаю текст из поля ввода
    const value = document.getElementById('textInput').value;

    // если поле пустое — просто выхожу
    if (!value) return;

    // сохраняю текст в localstorage под ключом myValue
    localStorage.setItem('myValue', value);

    // сразу показываю сохранённый текст на странице
    document.getElementById('savedValue').textContent = value;
}


// функция загружает текст при входе на страницу
function loadFromStorage() {
    // достаю значение по ключу myValue
    const saved = localStorage.getItem('myValue');

    // если что‑то сохранено — показываю
    if (saved) {
        document.getElementById('savedValue').textContent = saved;
    }
}



// создание секций, карточек и окошек

// функция создаёт всю структуру: 4 секции, 3 карточки, 8 окошек
function createSections() {
    // нахожу контейнер, куда буду добавлять секции
    const container = document.getElementById('sectionsContainer');

    // если контейнера нет — выхожу
    if (!container) return;

    // очищаю контейнер, чтобы не было дублей
    container.innerHTML = '';

    // создаю 4 секции
    for (let s = 1; s <= 4; s++) {

        // создаю div для секции
        const section = document.createElement('div');
        section.className = 'section';

        // создаю заголовок секции
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = 'Секция ' + s;
        section.appendChild(title);

        // создаю 3 карточки внутри секции
        for (let c = 1; c <= 3; c++) {

            const card = document.createElement('div');
            card.className = 'card';

            // создаю 8 окошек внутри карточки
            for (let w = 1; w <= 8; w++) {

                // создаю контейнер окошка
                const windowDiv = document.createElement('div');
                windowDiv.className = 'window';

                // создаю подпись окошка
                const label = document.createElement('label');
                label.className = 'window-label';
                label.textContent = 'окно ' + w;

                // создаю поле ввода
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'введите текст...';

                // собираю окошко
                windowDiv.appendChild(label);
                windowDiv.appendChild(input);

                // добавляю окошко в карточку
                card.appendChild(windowDiv);
            }

            // добавляю карточку в секцию
            section.appendChild(card);
        }

        // добавляю секцию в контейнер
        container.appendChild(section);
    }
}



// перемешивание секций

// функция меняет порядок секций случайным образом
function shuffleSections() {
    // нахожу контейнер с секциями
    const container = document.getElementById('sectionsContainer');
    if (!container) return;

    // превращаю секции в массив
    const sections = Array.from(container.children);

    // перемешиваю массив случайным образом
    const shuffled = sections.sort(() => Math.random() - 0.5);

    // вставляю секции в новом порядке
    shuffled.forEach(section => container.appendChild(section));
}



// переключение темы

// функция меняет тему между светлой и тёмной
function toggleTheme() {
    const html = document.documentElement;

    // если сейчас тёмная — делаю светлую
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
    } else {
        // если светлая — делаю тёмную
        html.setAttribute('data-theme', 'dark');
    }
}



// переключение направления текста

// функция меняет направление текста между ltr и rtl
function toggleDirection() {
    const html = document.documentElement;

    // если сейчас rtl — меняю на ltr
    if (html.getAttribute('dir') === 'rtl') {
        html.setAttribute('dir', 'ltr');
    } else {
        // если ltr — меняю на rtl
        html.setAttribute('dir', 'rtl');
    }
}



// linter

// функция проверяет inline стили на наличие px
function runLinter() {
    // нахожу все элементы со style=""
    const all = document.querySelectorAll('[style]');
    let hasPixels = false;

    // проверяю каждый элемент
    all.forEach(el => {
        const style = el.getAttribute('style');

        // если в стиле есть px — предупреждаю
        if (style && /\d+px/.test(style)) {
            console.warn('найдены px в стилях:', style);
            hasPixels = true;
        }
    });

    // если px нет — пишу что всё ок
    if (!hasPixels) {
        console.log('linter: px не используются');
    }
}



// запуск приложения

// функция запускает всё приложение
async function init() {
    // загружаю сохранённый язык
    const savedLang = localStorage.getItem('language');
    if (savedLang) currentLanguage = savedLang;

    // создаю секции, карточки и окошки
    createSections();

    // перемешиваю секции
    shuffleSections();

    // загружаю переводы
    await loadTranslations(currentLanguage);
    applyTranslations();

    // загружаю сохранённый текст
    loadFromStorage();

    // запускаю линтер
    runLinter();
}

// запускаю init после загрузки страницы
document.addEventListener('DOMContentLoaded', init);