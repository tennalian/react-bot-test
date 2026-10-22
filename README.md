# Спроси Ваню! 🎱

Шутливый чат-бот в стиле Telegram: задай любой вопрос - Иван обязательно ответит!

Демо: https://tennalian.github.io/react-bot-test/

## Стек

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- [Vite 7](https://vite.dev/) — сборка и dev-сервер с HMR
- SCSS (dart-sass) + autoprefixer

## Быстрый старт

```bash
npm install
npm start        # http://localhost:5000
```

## Скрипты

| Команды             | Что делает                                                    |
| ------------------- | ------------------------------------------------------------- |
| `npm start`         | dev-сервер на порту 5000 с HMR                                |
| `npm run build`     | проверка типов (`tsc --noEmit`) + production-сборка в `dist/` |
| `npm run typecheck` | только проверка типов                                         |
| `npm run preview`   | предпросмотр собранного `dist/`                               |

## Деплой

При пуше в `master` GitHub Actions собирает проект и публикует `dist/` на GitHub Pages
(`.github/workflows/deploy.yml`). Сборка падает при ошибках типов TypeScript.

## Планирование изменений

Проект использует [OpenSpec](https://github.com/Fission-AI/OpenSpec): proposal → задачи →
реализация → архивация. Действующие спеки — в `openspec/specs/`.

## Лицензия

MIT
