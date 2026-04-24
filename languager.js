/* этот файл отвечает за язык интерфейса
   здесь загружаются json-файлы перевода
   и подставляются тексты в элементы страницы
*/

/* текущий язык */
let currentLanguage = localStorage.getItem('language') || 'ru';

/* смена языка */
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    loadTranslations(lang);
}

/* загрузка json-файла */
function loadTranslations(lang) {
    fetch(`./json/translations/${lang}.json`)
        .then(res => res.json())
        .then(data => applyTranslations(data))
        .catch(err => console.error('ошибка загрузки перевода:', err));
}

/* подстановка текста */
function applyTranslations(t) {

    /* заголовок */
    const title = document.getElementById('mainTitle');
    if (title) title.textContent = t.title;

    /* placeholder */
    /* placeholder — это подсказка внутри input
   она показывается серым текстом, пока пользователь ничего не ввёл
*/
    const input = document.getElementById('textInput');
    if (input) input.placeholder = t.placeholder;

    /* кнопка сохранить */
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.textContent = t.save;

    /* подпись сохранено */
    const savedLabel = document.getElementById('savedLabel');
    if (savedLabel) savedLabel.textContent = t.saved;

    /* названия секций */
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((el, i) => {
        el.textContent = `${t.section} ${i + 1}`;
    });

    /* названия 8 окошек */
    const windowLabels = document.querySelectorAll('.window-label');
    windowLabels.forEach((el, i) => {
        el.textContent = t.windows[i] || `окно ${i + 1}`;
    });
}

/* загрузка языка при старте */
loadTranslations(currentLanguage);
