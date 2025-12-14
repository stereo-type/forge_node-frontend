# Forge Node Frontend

Next.js frontend приложение для платформы автоматизации workflow Forge Node.

## Технологический стек

- **Next.js 15** - React фреймворк с App Router
- **React 19** - UI библиотека
- **TypeScript** - Типобезопасность
- **TailwindCSS** - Стилизация
- **TanStack Query** - Управление данными и состоянием
- **Zustand** - Глобальное состояние
- **Socket.io** - Real-time коммуникация

## Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev

# Сборка для production
pnpm build

# Запуск production сервера
pnpm start
```

## Переменные окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## Структура проекта

```
src/
├── app/              # Next.js App Router страницы
├── components/       # React компоненты
│   ├── ui/          # Переиспользуемые UI компоненты
│   ├── workflow/    # Компоненты для workflow
│   └── forms/       # Компоненты форм
├── lib/             # Утилиты и хелперы
│   ├── api/         # API клиент
│   └── hooks/       # Кастомные React hooks
└── store/           # Zustand хранилища
```

## Примечание

Этот репозиторий используется как Git submodule в основном проекте Forge Node.
