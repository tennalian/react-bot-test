# Proposal

## Why

Проект застрял на устаревшем стеке 2017 года: React 15.6, webpack 3, babel 6, node-sass. Эти версии не получают обновлений безопасности, несовместимы с современной экосистемой и не поддерживают современный React API. Проект — одностраничник из двух компонентов для GitHub Pages, поэтому вместо миграции на webpack 5 (с нуля переписанный конфиг + ~15 сборочных пакетов) внедряем Vite: тот же объём работ, но радикально меньше конфигурации и зависимостей.

## What Changes

- **BREAKING** Обновление `react` и `react-dom` с 15.6 до 19.x: `ReactDOM.render` заменяется на `createRoot` (src/index.js), `this.refs` в src/bot.jsx заменяется на `createRef`
- **BREAKING** Замена webpack 3 на Vite: webpack.config.js, index.ejs и все сборочные пакеты (babel, loaders, html-webpack-plugin, copy-webpack-plugin, webpack-dev-server) удаляются; появляется vite.config.js и index.html в корне
- **BREAKING** Скрипты package.json: `start` → `vite` (порт 5000, HMR), `build` → `vite build` (вывод в dist/)
- Поддержка GitHub Pages: `base: '/react-bot-test/'`, чтобы ассеты резолвились с под-пути `https://tennalian.github.io/react-bot-test/`
- Обработка SCSS через встроенную поддержку Vite (`sass`-пакет) + autoprefixer через postcss-конфиг с `.browserslistrc`
- Изображения `src/img` обслуживаются из `public/` (конвенция Vite) вместо copy-webpack-plugin

## Capabilities

### New Capabilities
- `build-system`: сборка и dev-сервер проекта — dev-сервер с HMR на порту 5000, production-сборка в `dist/` с минификацией, корректные пути ассетов для GitHub Pages, обработка SCSS с автопрефиксами, транспиляция JSX/ES-модулей под целевые браузеры

### Modified Capabilities

## Impact

- `package.json` — react 19, react-dom 19, vite, @vitejs/plugin-react, sass; удалены все 15 webpack/babel/loaders-пакетов; обновлённые скрипты
- Удаление: `webpack.config.js`, `src/index.ejs`
- Добавление: `vite.config.js`, `index.html` (в корне, точка входа Vite), `.browserslistrc`, `postcss.config.js`
- `src/img/*` → `public/img/*` (статика для GitHub Pages)
- `src/index.js`, `src/bot.jsx` — адаптация к React 19 (поведение не меняется)
- Установка зависимостей выполняется только после подтверждения пользователем
