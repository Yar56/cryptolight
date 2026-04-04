# Plan: Add Time Period Filter for PriceChart

## Context

Задача из Roadmap: "Update PriceChart, add a time filter (Coin Page)". Сейчас график на странице монеты показывает данные только за 1 день (хардкод `days='1'`). Нужно добавить кнопки выбора периода (1D, 7D, 30D, 1Y), которые перезапрашивают данные с API.

Эта задача выбрана для бенчмарка производительности с LSP-плагином и без — она затрагивает 4 слоя FSD и требует навигации по типам между файлами.

## Изменяемые файлы

| Файл | Действие |
|------|----------|
| `src/features/priceChart/model/types.ts` | Добавить `TimePeriodDays`, `TimePeriodOption` |
| `src/features/priceChart/model/constants.ts` | Добавить `TIME_PERIODS`, `DEFAULT_TIME_PERIOD` |
| `src/features/priceChart/model/priceChart.ts` | Заменить пустой экспорт на Effector-модель (`$timePeriod`, `timePeriodChanged`) |
| `src/features/priceChart/model/index.ts` | Добавить реэкспорт types и constants |
| `src/features/priceChart/ui/TimePeriodFilter.tsx` | **Новый файл** — UI-компонент кнопок фильтра |
| `src/features/priceChart/ui/index.ts` | Добавить экспорт `TimePeriodFilter` |
| `src/entities/coin/model/coin.ts` | Пробросить `days` в `getCoinMarketChartByIdFx` |
| `src/pages/coinPage/ui/CoinPage.tsx` | Подключить фильтр, перезапрашивать данные при смене периода |

## Шаги реализации

### Шаг 1: Типы (`features/priceChart/model/types.ts`)

Добавить в конец файла:

```ts
export type TimePeriodDays = '1' | '7' | '30' | '365';

export interface TimePeriodOption {
    label: string;
    days: TimePeriodDays;
}
```

### Шаг 2: Константы (`features/priceChart/model/constants.ts`)

Добавить импорт `TimePeriodOption` и константы:

```ts
import { TimePeriodOption } from './types';

export const TIME_PERIODS: TimePeriodOption[] = [
    { label: '1D', days: '1' },
    { label: '7D', days: '7' },
    { label: '30D', days: '30' },
    { label: '1Y', days: '365' },
];

export const DEFAULT_TIME_PERIOD: TimePeriodDays = '1';
```

### Шаг 3: Effector-модель (`features/priceChart/model/priceChart.ts`)

Заменить `export default {}` на:

```ts
import { createStore, createEvent } from 'effector';
import { TimePeriodDays } from './types';
import { DEFAULT_TIME_PERIOD } from './constants';

export const timePeriodChanged = createEvent<TimePeriodDays>();

export const $timePeriod = createStore<TimePeriodDays>(DEFAULT_TIME_PERIOD)
    .on(timePeriodChanged, (_, period) => period);
```

### Шаг 4: Реэкспорт (`features/priceChart/model/index.ts`)

Добавить:
```ts
export * from './types';
export * from './constants';
```

### Шаг 5: Пробросить `days` в entity (`entities/coin/model/coin.ts`)

Изменить строку 11-13: деструктурировать `days` и передать в API-вызов:

```ts
export const getCoinMarketChartByIdFx = createEffect(
    ({ coinId, days }: coinGeckoApi.coins.GetCoinChartByIdParams) => {
        return coinGeckoApi.coins.getCoinMarketChartById({ coinId, days });
    }
);
```

### Шаг 6: UI-компонент `TimePeriodFilter` (новый файл)

`src/features/priceChart/ui/TimePeriodFilter.tsx` — кнопки 1D/7D/30D/1Y, используют `useStore($timePeriod)` и вызывают `timePeriodChanged`. Стилизация через NextUI `Button`.

### Шаг 7: Экспорт UI (`features/priceChart/ui/index.ts`)

Добавить `export * from './TimePeriodFilter'`.

### Шаг 8: Интеграция в CoinPage (`pages/coinPage/ui/CoinPage.tsx`)

- Импортировать `TimePeriodFilter` и `priceChartModel` из `~/features/priceChart`
- `useStore(priceChartModel.$timePeriod)` для получения текущего периода
- Передать `days: timePeriod` в `getCoinMarketChartByIdFx`
- `useEffect` по `timePeriod` для перезапроса данных при смене периода
- Рендерить `<TimePeriodFilter />` над графиком

## Архитектурные решения

- **Стейт фильтра живёт в `features/priceChart/model/`** — это фильтр графика, а не свойство сущности coin
- **Оркестрация в page** — CoinPage связывает событие фичи с эффектом entity (стандартный FSD-паттерн)
- **`useEffect` вместо `sample`** — `coinId` берётся из URL-параметров, создавать для него отдельный стор ради `sample` — оверинжиниринг

## Известные проблемы (не в скоупе)

- `$coinIsLoading` (строка 39 `coin.ts`) использует `&&` вместо `combine` — это баг, но он существующий, не трогаем

## Верификация

1. `npm run typescript:lint:core` — проверка типов
2. `npm run lint` — проверка ESLint (включая FSD-границы)
3. `npm run dev` → открыть страницу монеты → кликнуть кнопки 1D/7D/30D/1Y → график обновляется