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
export interface Coin {
    additionalNotices: [];
    assetPlatformId: string;
    blockTimeInMinutes: number;
    categories: string[];
    coingeckoRank: number;
    coingeckoScore: 19.873;
    communityData: {
        facebookLikes: null;
        twitterFollowers: number;
        redditAveragePosts48H: number;
        redditAverageComments48H: number;
        redditSubscribers: number;
    };
    communityScore: number;
    contractAddress: string;
    countryOrigin: string;
    description: Record<string, string>;
    detailPlatforms: { ethereum: object; binanceSmartChain: object; polygonPos: object; avalanche: object };
    developerData: { forks: number; stars: number; subscribers: number; totalIssues: number; closedIssues: number };
    developerScore: number;
    genesisDate: null;
    hashingAlgorithm: string;
    id: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    lastUpdated: string;
    links: { homepage: []; blockchainSite: []; officialForumUrl: []; chatUrl: []; announcementUrl: [] };
    liquidityScore: number;
    localization: { en: string; de: string; es: string; fr: string; it: string };
    marketCapRank: 200;
    marketData: {
        currentPrice: Record<string, number>;
        totalValueLocked: null;
        mcapToTvlRatio: null;
        fdvToTvlRatio: null;
        roi: null;
        high24H: Record<string, number>;
        low24H: Record<string, number>;
        marketCap: Record<string, number>;
        totalVolume: Record<string, number>;
        marketCapChangePercentage24H: number;
    };
    name: string;
    platforms: { ethereum: string; binanceSmartChain: string; polygonPos: string; avalanche: string };
    publicInterestScore: number;
    publicInterestStats: { alexaRank: number; bingMatches: null };
    publicNotice: null;
    sentimentVotesDownPercentage: number;
    sentimentVotesUpPercentage: number;
    statusUpdates: [];
    symbol: string;
    tickers: [];
}

// coins/${coinId}/market_chart?

export type MarketChart = [number, number][];
export interface MarketChartCoin {
    marketCaps: MarketChart;
    prices: MarketChart;
    totalVolumes: MarketChart;
}

export interface DataProps {
    date: string | Date;
    price: number;
}
