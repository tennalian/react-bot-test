# Design

## Context

Проект — одностраничник «AskIvan» (2 компонента в `src/bot.jsx`, точка входа `src/index.js`), публикуется на GitHub Pages по адресу `https://tennalian.github.io/react-bot-test/`. Стек 2017 года: React 15.6, webpack 3, babel 6, node-sass. Мотивация — см. proposal.md (Why). В ходе исследования решено не мигрировать на webpack 5, а заменить сборку на Vite.

## Goals / Non-Goals

**Goals:**
- Обновить React до 19 с адаптацией кода приложения
- Заменить webpack 3 на Vite: меньше зависимостей (3 вместо ~15 сборочных пакетов), нулевой конфиг для React+SCSS, мгновенный dev-сервер
- Работоспособность на GitHub Pages (базовый путь `/react-bot-test/`)
- Сохранить поведение приложения неизменным

**Non-Goals:**
- Миграция классовых компонентов в функциональные (только минимальные правки для React 19)
- CI/CD, тесты, TypeScript — их в проекте нет
- PWA/SSR/оптимизации, не нужные одностраничнику из двух компонентов

## Decisions

1. **Vite 7 вместо webpack 5.** Проект настолько мал, что весь webpack-конфиг сводился к четырём задачам: JSX, SCSS, dev-сервер, копирование картинок. Vite решает их из коробки: @vitejs/plugin-react (babel + react refresh), встроенная поддержка SCSS, встроенный dev-сервер с history fallback, `public/` для статики. Миграция на webpack 5 всё равно требовала переписать конфиг с нуля (новый API devServer, CopyWebpackPlugin, asset modules) — при том же объёме работ Vite оставляет меньше кода для поддержки. Альтернатива Rspack отклонена: ценен совместимостью с экосистемой webpack-плагинов, которой здесь нет.

2. **React 19 + `createRoot`.** `react`/`react-dom` 19.x — актуальная стабильная ветка. `ReactDOM.render` удалён в React 19 → точка входа переводится на `createRoot`. Legacy `this.refs.text` в `bot.jsx` заменяется на `createRef` — строковые refs удалены в React 19.

3. **GitHub Pages: `base: '/react-bot-test/'`.** Сайт отдаётся с под-пути пользовательского домена `*.github.io`, поэтому без base все ссылки на ассеты будут битыми (в старом конфиге ту же проблему решал `baseUrl: '/dist'`). Имя репозитория подтверждено через git remote (`tennalian/react-bot-test`).

4. **Точка входа — `index.html` в корне.** По конвенции Vite вместо `src/index.ejs` + html-webpack-plugin: `<script type="module" src="/src/index.js">`, React-приложение монтируется в `<div id="app">`.

5. **Статика из `public/`.** `src/img/*` переносится в `public/img/*` — Vite копирует это в `dist/` как есть, что заменяет CopyWebpackPlugin и соответствует форме URL `/react-bot-test/img/1.jpg`, ожидаемой на GH Pages.

6. **Стили: sass + autoprefixer через postcss.config.js.** Встроенная в Vite поддержка SCSS (пакет `sass` — dart-sass, замена deprecated node-sass). Автопрефиксы — postcss.config.js + autoprefixer, цели в `.browserslistrc` (`last 2 versions, not dead, > 0.5%`); browserslist также управляет транспиляцией esbuild.

7. **Порты и скрипты.** `start` = `vite --port 5000` (сохранение привычного порта), `build` = `vite build` (вывод в `dist/` — GitHub Pages может смотреть и на ветку, и на Actions; структуру не меняем).

## Risks / Trade-offs

- [GitHub Pages смотрит на старую структуру dist (app.js)] → Проверяем, что CI/настройка Pages (ветка gh-pages / Actions) обновляется вместе с новым именованием ассетов `assets/[name]-[hash].js`; в рамках изменения — только корректный вывод `dist/`
- [React 19 ломающие изменения (refs, render)] → Затрагивают ровно два файла (`index.js`, `bot.jsx`); поведение проверяется запуском dev-сервера
- [dart-sass строже к синтаксису, чем node-sass (например, division `/`)] → `styles.scss` проверяется компиляцией на этапе сборки; при необходимости правка синтаксиса
- [Установка зависимостей меняет package-lock целиком] → По условию пользователя установка запускается только после подтверждения
- [Vite требует Node 20.19+ / 22.12+] → Проверить версию Node перед установкой; при несоответствии — обсудить обновление Node или закрепление Vite 5

## Migration Plan

1. Обновить `package.json` (зависимости, скрипты), добавить `vite.config.js`, `index.html`, `.browserslistrc`, `postcss.config.js`, перенести `src/img` → `public/img`, адаптировать `index.js` и `bot.jsx`
2. Согласовать с пользователем установку зависимостей, выполнить `npm install`
3. Проверить `npm run build` (сборка без ошибок, пути в `dist/index.html` начинаются с `/react-bot-test/`) и `npm start` (приложение работает, HMR включён)
4. Откат — `git checkout` изменённых файлов + восстановление `node_modules` старым lock-файлом

## Open Questions

Нет — все решения зафиксированы (Vite 7, React 19, base для GH Pages).
