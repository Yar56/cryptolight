export type Filter = {
    id: number;
    title: string;
};

// Описываем здесь датасет фильтров "CoinGecko" / "Global Trend" и т.п.
export const filters: Record<number, Filter> = {
    1: {
        id: 1,
        title: 'CoinGecko'
    },
    2: {
        id: 2,
        title: 'Global Trends'
    }
};

export const DEFAULT_FILTER = 1;

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];
