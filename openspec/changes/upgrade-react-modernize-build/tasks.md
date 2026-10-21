# Tasks

## 1. Конфигурация Vite

- [x] 1.1 Обновить `package.json`: скрипты `start` = `vite --port 5000 --open`, `build` = `vite build`; зависимости react@19, react-dom@19, vite, @vitejs/plugin-react, sass (dev); удалить все webpack/babel/loaders-пакеты. Проверка: в package.json нет пакетов старого стека
- [x] 1.2 Создать `vite.config.js`: плагин react, `base: '/react-bot-test/'`, `server.port: 5000`. Проверка: конфиг валиден синтаксически
- [x] 1.3 Создать `index.html` в корне (`<div id="app">`, `<script type="module" src="/src/index.js">`), `.browserslistrc` (`last 2 versions, not dead, > 0.5%`), `postcss.config.js` (autoprefixer); перенести `src/img/` → `public/img/`; удалить `webpack.config.js` и `src/index.ejs`. Проверка: файлы на месте, старых нет
- [x] 1.4 Проверить версию Node (для Vite 7 — 20.19+/22.12+), согласовать с пользователем и выполнить `npm install`. Проверка: установка без ошибок, `npx vite --version` работает

## 2. Адаптация кода приложения

- [x] 2.1 Перевести `src/index.js` на `createRoot` (react-dom/client). Проверка: импорт корректен, `ReactDOM.render` не используется
- [x] 2.2 Заменить legacy `this.refs.text` в `src/bot.jsx` на `createRef` (поведение не меняется); при ошибках компиляции dart-sass поправить синтаксис `styles.scss`. Проверка: в коде нет строковых refs

## 3. Проверка сборки и приложения

- [x] 3.1 Выполнить `npm run build`: в `dist/` — `index.html` с путями ассетов от `/react-bot-test/`, минифицированные JS/CSS с content hash, `img/1.jpg`, `img/2.jpg`. Проверка: сборка без ошибок; пути в `dist/index.html` начинаются с `/react-bot-test/`
- [x] 3.2 Запустить `npm start`, проверить в браузере `http://localhost:5000`: чат-бот отвечает и чат очищается, HMR применяет правки без полной перезагрузки, SCSS-стили применяются с автопрефиксами. Проверка: наблюдаемое поведение соответствует спеке build-system

## Workflow follow-up

- При публикации: настроить GitHub Pages (Actions или ветка) на новый `dist/` и убедиться, что сайт работает по адресу `https://tennalian.github.io/react-bot-test/`.
- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
