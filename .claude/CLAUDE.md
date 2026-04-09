# CLAUDE.md

Этот файл содержит инструкции для Claude Code (claude.ai/code) при работе с кодом в репозитории.

## Обязательный workflow

## LSP-tool: используй только когда реально экономит токены (подробности в ~/.claude/CLAUDE.md)

### 1. Исследование и планирование
- **Всегда начинайте с изучения** существующего кода
- **Создавайте структурированные TODO-планы** для задач из 3+ шагов
- **Запрашивайте согласование каждого пункта** с описанием плана работ по нему
- **Ждите явного одобрения как ответ от пользователя в переписке** ("Вперёд", "Продолжаем") перед выполнением

### 2. Архитектурное мышление
- **Объясняйте "почему"**, а не только "что" делаете
- **Обсуждайте trade-off'ы** различных решений
- **Предлагайте альтернативы** когда уместно
- **Рассматривайте перспективы развития** ("навырост" vs YAGNI)

### 3. Качественное выполнение
- **Обновляйте TODO-статусы** в реальном времени
- **Исправляйте ошибки компиляции** сразу `npm run typescript:lint:core`
- **Самостоятельно проверяйте линты**: запускайте `npm run lint` после изменений
- **Запускай тесты на добавление новой функциональности `npm run test`**
- **Устраняйте дублирование** при рефакторинге

### 4. Адаптивная коммуникация
- **Переспрашивайте** при неясности требований
- **Не выдумывай, если не знаешь ответа**, лучше сходить в интернет и узнать какие есть подводные камни
- **Задавайте уточняющие вопросы** о неочевидных моментах
- **Подводите итоги**

## Команды

```bash
npm run dev          # Запуск dev-сервера на порту 3000
npm run build        # Проверка типов + сборка через Vite (результат в build/)
npm run lint         # ESLint с нулевой толерантностью к предупреждениям
npm run lint:ci      # ESLint (допускает предупреждения, используется в CI)
npm run eslint:fix   # Автоматическое исправление ошибок ESLint
npm run typescript:validate  # Проверка типов без генерации файлов
```

Тестовый фреймворк не настроен — тестовых файлов и скриптов нет.

## Переменные окружения

Обязательны в `.env`:

```
VITE_COIN_API_HOST=https://api.coingecko.com/api/v3/
VITE_CRYPTO_LIGHT_API_HOST=http://crypto-light.space
```

## Архитектура: Feature-Sliced Design (FSD)

Проект строго следует [FSD](https://feature-sliced.design/). Слои (снизу вверх — нижние слои не могут импортировать из верхних):

```
shared → entities → features → widgets → pages → app
```

- **`shared/`** — API-клиенты, конфиг, переиспользуемый UI, утилиты
- **`entities/`** — Бизнес-сущности (`coin/`, `user/`) с model + ui + lib
- **`features/`** — Пользовательские взаимодействия (auth, registration, favoriteCoin, priceChart)
- **`widgets/`** — Составной UI, объединяющий entities + features
- **`pages/`** — Компоненты уровня маршрута
- **`app/`** — Корневой компонент, провайдеры, роутер

ESLint контролирует границы импортов через `@feature-sliced/eslint-config` и `eslint-plugin-boundaries`. Нарушения провалят `npm run lint`.

## Псевдонимы путей

`~/` разрешается в `src/` как в TypeScript, так и в Vite:

```ts
import { coingeckoApi } from '~/shared/api';
```

## Управление состоянием: Effector

Всё состояние хранится в директориях `model/` внутри каждого слайса. Паттерн:

```ts
// Эффекты (асинхронные)
export const fetchCoinFx = createEffect(async (id: string) => api.coins.getCoin(id));

// Стор
export const $coin = createStore<CoinState>(initial)
  .on(fetchCoinFx.doneData, (_, { data }) => data);

// Производные сторы
export const $coinIsLoading = fetchCoinFx.pending;

// React-хуки (селекторы)
export const useCoin = () => useStore($coin);

export const selectors = { useCoin };
```

- Используй `produce` из `immer` для сложных мутаций состояния
- Побочные эффекты (синхронизация с localStorage, логирование) выносятся в `.watch()`
- События уровня страницы (например, `pageMounted`) запускают эффекты через `.watch()`

## Композиция провайдеров

Провайдеры используют `compose-function` в `app/providers/`:

```ts
export const withProviders = compose(withRouter, withUi, withAuth);
```

`withAuth` проверяет токен пользователя при старте и сохраняет пользователя в localStorage.

## API-слой

Два API-клиента в `shared/api/`:

- **`coingecko/`** — Публичный CoinGecko API (трендовые монеты, детали монеты, график рынка)
- **`cryptoLight/`** — Собственный бэкенд (авторизация, данные пользователя, избранное)

Оба используют Axios с интерсепторами, которые автоматически конвертируют snake_case-ответы в camelCase.

## Маршруты

Определены как enum в `shared/config/routes/routes.ts`:

```ts
export enum RouteName {
  TRENDING_COIN_PAGE = '/',
  COIN_PAGE = '/coin/:coinId',
  PROFILE_PAGE = '/profile'
}
```
