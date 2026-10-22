# Proposal

## Why

Проект теперь на современном стеке (React 19 + Vite), но код остался на JavaScript. TypeScript даёт проверку типов на этапе компиляции (ловит опечатки в props, refs, state) и лучший автокомплит — при объёме в 2 файла миграция почти бесплатна, а Vite поддерживает TS из коробки.

## What Changes

- **BREAKING** Переименование исходников: `src/index.jsx` → `src/index.tsx`, `src/bot.jsx` → `src/bot.tsx`; правка `<script src>` в index.html
- Добавление `typescript`, `@types/react`, `@types/react-dom` (devDependencies) и `tsconfig.json` со строгими настройками (`strict: true`, bundler-разрешение модулей, `jsx: react-jsx`)
- Типизация кода приложения: интерфейс state класса `Ivan`, типы refs
- Скрипт `typecheck` (`tsc --noEmit`) и проверка типов перед сборкой: `build` = `tsc --noEmit && vite build`
- `vite-env.d.ts` для типов Vite

## Capabilities

### New Capabilities

### Modified Capabilities
- `build-system`: добавляется требование — проверка типов TypeScript выполняется при production-сборке; ошибка типов ломает сборку

## Impact

- `package.json` — новые devDependencies, обновлённый скрипт `build`, новый `typecheck`
- `tsconfig.json`, `src/vite-env.d.ts` — новые файлы
- `src/index.tsx`, `src/bot.tsx`, `index.html` — переименования и типизация, поведение приложения не меняется
- Установка зависимостей выполняется только после подтверждения пользователем
