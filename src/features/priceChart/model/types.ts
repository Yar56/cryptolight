export interface DataProps {
    date: string | Date;
    price: number;
}

export interface PriceChartProps {
    data: DataProps[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

export type TooltipData = DataProps;
