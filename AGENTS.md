# AGENTS.md — инструкция для агентов

## Что это за проект

«Спроси Ваню!» — шутливый чат-бот в стиле Telegram: пользователь задаёт вопрос,
Иван отвечает случайной фразой из фиксированного списка (FAQ), показывает индикатор
«печатает…», аватар меняется при ответе. Публикуется на GitHub Pages:
https://tennalian.github.io/react-bot-test/

Стек: React 19 (классовый компонент), TypeScript 5 strict, Vite 7, SCSS (dart-sass + autoprefixer).

## Команды

- `npm install` — установка зависимостей (заодно подключает git-хуки, см. ниже)
- `npm start` — dev-сервер на http://localhost:5000 с HMR
- `npm run typecheck` — проверка типов (`tsc --noEmit`)
- `npm run build` — production-сборка: **сначала** `tsc --noEmit`, потом `vite build` → `dist/`
- `npm run preview` — предпросмотр собранного `dist/` на порту 5000

## Архитектура

```
index.html          — точка входа, подключает /src/index.tsx
src/index.tsx       — createRoot, рендерит <Ivan /> в #app
src/bot.tsx         — классовый компонент Ivan: вся логика чата
src/styles.scss     — все стили (Telegram-подобный дизайн), вложенность SCSS
src/vite-env.d.ts   — типы Vite
public/img/         — статика: img/1.jpg (аватар по умолчанию), img/2.jpg (аватар ответа)
vite.config.js      — base: '/react-bot-test/', порт 5000
```

## Важные соглашения

- **TypeScript strict.** `npm run typecheck` должен проходить без ошибок; `build` ломается при ошибке типов — это по спеке, не «чинить» отключением tsc.
- **Базовый путь `/react-bot-test/`** задан в `vite.config.js` ради GitHub Pages — не менять и не удалять.
- **`dist/` — артефакт сборки, в гит не попадает** (в `.gitignore`). Не править руками; перегенерируется `npm run build`. CI (`.github/workflows/deploy.yml`) собирает его сам при пуше в `master` (версия ноды из `.nvmrc`).
- **Прекоммит-хук.** `.githooks/pre-commit` гоняет typecheck перед каждым коммитом. Подключается через `"prepare": "git config core.hooksPath .githooks"` — не удалять этот скрипт. Сам файл хука должен быть закоммичен.
- **Стиль кода:** табы для отступов, комментарии на русском, классовый компонент Ivan не переписывать на хуки без отдельной задачи.
- **Коммиты:** conventional commits (`feat:`, `fix:`, `ci:`, `docs:`, `chore:`).
- **Не коммитить без спроса**, если задача явно не про коммит.

## Логика бота (не сломать)

- Ответы берутся по кругу из массива `FAQ` (индекс в state, стартует случайно).
- Тайминги: 1с индикатор «печатает…» → ответ → через 5с `clearChat`.
- В `question()` таймеры предыдущего вопроса отменяются (`clearTimeout`) — защита от гонка быстрых кликов, не удалять.
- `textRef` может быть `null` (strict) — проверяется перед использованием.
- Аватар в сообщении: `img/1.jpg` по умолчанию и во время лоадинга, `img/2.jpg` когда ответ пришёл.

## OpenSpec

Изменения поведения планируются через OpenSpec (`openspec/`): `opsx:propose` → `opsx:apply` → `opsx:archive`.
Действующие спеки: `openspec/specs/` (сейчас — `build-system`). Архив — `openspec/changes/archive/`.
Прежде чем менять сборку или поведение, сверяйся со спеками.
