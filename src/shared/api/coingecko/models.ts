// search/trending
export type TrendingCoin = {
    item: {
        coinId: number;
        id: string;
        large: string;
        marketCapRank: number;
        name: string;
        priceBtc: number;
        score: number;
        slug: string;
        small: string;
        symbol: string;
        thumb: string;
    };
};

// coins/{id}
export type Coin = {
    blockTimeInMinutes: string;
    id: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    lastUpdated: string;
    localization: Record<string, string>;
    marketData: {
        currentPrice: {
            aed: number;
            ars: number;
            aud: number;
            bch: number;
            bdt: number;
            bhd: number;
            bits: number;
            bmd: number;
            bnb: number;
            brl: number;
            btc: number;
            cad: number;
            chf: number;
            clp: number;
            cny: number;
            czk: number;
            dkk: number;
            dot: number;
            eos: number;
            eth: number;
            eur: number;
            gbp: number;
            hkd: number;
            huf: number;
            idr: number;
            ils: number;
            inr: number;
            jpy: number;
            krw: number;
            kwd: number;
            link: number;
            lkr: number;
            ltc: number;
            mmk: number;
            mxn: number;
            myr: number;
            ngn: number;
            nok: number;
            nzd: number;
            php: number;
            pkr: number;
            pln: number;
            rub: number;
            sar: number;
            sats: number;
            sek: number;
            sgd: number;
            thb: number;
            try: number;
            twd: number;
            uah: number;
            usd: number;
            vef: number;
            vnd: number;
            xag: number;
            xau: number;
            xdr: number;
            xlm: number;
            xrp: number;
            yfi: number;
            zar: number;
        };
    };
    name: string;
    symbol: string;
};
