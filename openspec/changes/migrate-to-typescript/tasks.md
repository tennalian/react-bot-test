# Tasks

## 1. Конфигурация TypeScript

- [ ] 1.1 Добавить в package.json devDependencies `typescript`, `@types/react`, `@types/react-dom`; скрипты `typecheck` = `tsc --noEmit`, `build` = `tsc --noEmit && vite build`. Проверка: скрипты читаются из package.json
- [ ] 1.2 Создать `tsconfig.json` (strict, noEmit, jsx: react-jsx, moduleResolution: bundler, либы DOM) и `src/vite-env.d.ts`. Проверка: `npx tsc --version` и валидный JSON в tsconfig
- [ ] 1.3 Согласовать с пользователем и выполнить установку (`npm install`). Проверка: `npx tsc --version` выводит версию ≥ 5

## 2. Перевод исходников

- [ ] 2.1 Переименовать `src/index.jsx` → `src/index.tsx`, `src/bot.jsx` → `src/bot.tsx`, обновить `<script src>` в `index.html` и импорт в точке входа. Проверка: старых файлов нет, ссылки актуальны
- [ ] 2.2 Типизировать `bot.tsx` (интерфейс state, тип textRef, FAQ как string[]) и точку входа; минимальные правки выражений под strict без изменения поведения. Проверка: `npm run typecheck` проходит без ошибок

## 3. Проверка

- [ ] 3.1 `npm run build` — типы проверены, сборка создаёт `dist/` как прежде. Проверка: сборка без ошибок, `dist/index.html` ссылается на ассеты от `/react-bot-test/`
- [ ] 3.2 `npm start` — приложение работает: чат-бот отвечает, чат очищается, HMR работает на .tsx-файлах. Проверка: наблюдаемое поведение в браузере не изменилось

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
