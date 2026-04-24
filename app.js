/* этот файл отвечает за работу приложения
   тут загрузка json, рендеринг секций, сохранение текста, тема, направление и линтер
*/


let mockData = null; // сюда сохраню данные из json


fetch('./json/mockdata.json') // загружаю файл с данными
    .then(res => res.json()) // превращаю ответ в объект
    .then(data => { // получаю данные
        mockData = data; // сохраняю данные в переменную
        createSections(mockData); // рендерю секции из json
        shuffleSections(); // перемешиваю секции
    })
    .catch(err => console.log('ошибка загрузки данных:', err)); // если ошибка — пишу в консоль


/* сохраняю текст в localstorage */
function saveToStorage() {
    const value = document.getElementById('textInput').value; // беру текст из input
    if (!value) return; // если пусто — ничего не делаю

    localStorage.setItem('myValue', value); // сохраняю текст
    document.getElementById('savedValue').textContent = value; // показываю сохранённый текст
}


/* загружаю текст при входе */
function loadFromStorage() {
    const saved = localStorage.getItem('myValue'); // беру текст из хранилища
    if (saved) { // если что‑то есть
        document.getElementById('savedValue').textContent = saved; // показываю текст
    }
}


/* рендерю секции, карточки и окошки из json */
function createSections(data) {
    const container = document.getElementById('sectionsContainer'); // контейнер для секций
    if (!container) return; // если контейнера нет — выхожу

    container.innerHTML = ''; // очищаю контейнер

    data.sections.forEach(section => { // прохожу по секциям
        const sectionEl = document.createElement('div'); // создаю секцию
        sectionEl.className = 'section'; // добавляю класс

        const title = document.createElement('h2'); // создаю заголовок секции
        title.className = 'section-title'; // класс заголовка
        title.textContent = section.title; // текст из json
        sectionEl.appendChild(title); // добавляю заголовок в секцию

        section.cards.forEach(card => { // прохожу по карточкам
            const cardEl = document.createElement('div'); // создаю карточку
            cardEl.className = 'card'; // класс карточки

            const cardTitle = document.createElement('h3'); // создаю заголовок карточки
            cardTitle.textContent = card.title; // текст из json
            cardEl.appendChild(cardTitle); // добавляю заголовок в карточку

            card.windows.forEach((text, i) => { // прохожу по окнам
                const windowEl = document.createElement('div'); // создаю окно
                windowEl.className = 'window'; // класс окна

                const label = document.createElement('label'); // создаю подпись окна
                label.className = 'window-label'; // класс подписи
                label.textContent = text; // текст окна из json
                windowEl.appendChild(label); // добавляю подпись

                const input = document.createElement('input'); // создаю поле ввода
                input.type = 'text'; // тип input
                input.dataset.window = i; // сохраняю номер окна
                windowEl.appendChild(input); // добавляю input

                cardEl.appendChild(windowEl); // добавляю окно в карточку
            });

            sectionEl.appendChild(cardEl); // добавляю карточку в секцию
        });

        container.appendChild(sectionEl); // добавляю секцию в контейнер
    });
}


/* перемешиваю секции */
function shuffleSections() {
    const container = document.getElementById('sectionsContainer'); // контейнер секций
    if (!container) return; // если нет — выхожу

    const sections = Array.from(container.children); // превращаю секции в массив
    const shuffled = sections.sort(() => Math.random() - 0.5); // перемешиваю массив

    shuffled.forEach(section => container.appendChild(section)); // вставляю секции в новом порядке
}


/* переключаю тему */
function toggleTheme() {
    const html = document.documentElement; // беру html

    if (html.getAttribute('data-theme') === 'dark') { // если тёмная тема
        html.removeAttribute('data-theme'); // делаю светлую
    } else {
        html.setAttribute('data-theme', 'dark'); // делаю тёмную
    }
}


/* переключаю направление текста */
function toggleDirection() {
    const html = document.documentElement; // беру html

    if (html.getAttribute('dir') === 'rtl') { // если справа налево
        html.setAttribute('dir', 'ltr'); // делаю слева направо
    } else {
        html.setAttribute('dir', 'rtl'); // делаю справа налево
    }
}


/* проверяю inline стили на px */
function runLinter() {
    const all = document.querySelectorAll('[style]'); // ищу элементы со style
    let hasPixels = false; // флаг наличия px

    all.forEach(el => { // прохожу по элементам
        const style = el.getAttribute('style'); // беру стиль
        if (style && /\d+px/.test(style)) { // если есть px
            console.warn('найдены px в стилях:', style); // предупреждаю
            hasPixels = true; // ставлю флаг
        }
    });

    if (!hasPixels) { // если px нет
        console.log('linter: px не используются'); // пишу что всё ок
    }
}


/* запускаю приложение */
async function init() {
    const savedLang = localStorage.getItem('language'); // беру язык из хранилища
    if (savedLang) currentLanguage = savedLang; // если есть — ставлю его

    await loadTranslations(currentLanguage); // загружаю переводы
    loadFromStorage(); // загружаю сохранённый текст
    runLinter(); // запускаю линтер
}

document.addEventListener('DOMContentLoaded', init); // запускаю init после загрузки страницы
