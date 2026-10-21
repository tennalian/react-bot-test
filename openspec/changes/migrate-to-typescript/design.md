# Design

## Context

После изменения upgrade-react-modernize-build проект на React 19 + Vite 7: `src/index.jsx`, `src/bot.jsx` (один классовый компонент), SCSS-стили, `index.html` в корне, `base: '/react-bot-test/'`. TypeScript отсутствует. Мотивация — см. proposal.md (Why).

## Goals / Non-Goals

**Goals:**
- Перевести исходники приложения на TypeScript со строгим режимом (`strict: true`)
- Встроить проверку типов в скрипт сборки
- Не менять поведение приложения и конфигурацию Vite (Vite транспилирует TS без typecheck — проверка идёт отдельным шагом tsc)

**Non-Goals:**
- Перевод конфигов (`vite.config.js`, `postcss.config.js`) на `.ts` — опционально и не влияет на приложение
- Переписывание классового компонента в функциональный
- ESLint/Prettier, CI

## Decisions

1. **Vite без изменений, typecheck отдельным шагом.** Vite/esbuild транспилирует TS, не проверяя типы; каноничная схема Vite-шаблона React-TS: `build` = `tsc --noEmit && vite build`, плюс отдельный скрипт `typecheck`. Альтернатива (vite-plugin-checker) — лишняя зависимость для проекта из 2 файлов.

2. **tsconfig: `moduleResolution: bundler`, `jsx: react-jsx`, `strict: true`.** `bundler`-разрешение соответствует импортам в стиле Vite; `react-jsx` убирает необходимость `import React` ради JSX (но существующие импорты оставляем как есть — лишний churn не нужен). `noEmit: true` — вывод делает Vite. `allowImportingTsExtensions` не нужен, импорты остаются без расширений (`'./bot'`).

3. **Типизация по факту, без рефакторинга.** Классовый компонент `Ivan` типизируется минимально: интерфейс `IvanState { questionArr: string | null; answerArr: string | null; loading: boolean; index: number }`, `textRef: React.RefObject<HTMLTextAreaElement | null>` (React 19: RefObject без null-обёртки createRef<T> даёт RefObject<T | null>). FAQ — `string[]`.

4. **Переименование в .tsx/.ts.** `index.jsx` → `index.tsx`, `bot.jsx` → `bot.tsx`; `index.html` ссылается на `/src/index.tsx`. `src/vite-env.d.ts` (`/// <reference types="vite/client" />`) — по конвенции шаблона Vite.

## Risks / Trade-offs

- [Строгий режим выявит ошибки в существующем коде (например, `textarea = ... ? textarea : ''` — строка вместо ReactNode)] → Типизация местами потребует минимальных правок выражений; поведение не меняется
- [tsc в build замедляет сборку на ~1с] → Для проекта из 2 файлов незначительно
- [Установка новых devDependencies] → По правилу пользователя — только после подтверждения

## Migration Plan

1. Добавить зависимости и конфиги (package.json, tsconfig.json, vite-env.d.ts), переименовать исходники, типизировать
2. Согласовать установку (`npm i -D typescript @types/react @types/react-dom`)
3. Проверить `npm run typecheck`, `npm run build`, `npm start`
4. Откат — git checkout

## Open Questions

Нет.
