import { RouteName } from '~/pages/models';

interface GetCoinPageUrlParams {
    coinId: string;
}
export const getCoinPageUrl = ({ coinId }: GetCoinPageUrlParams): string =>
    RouteName.COIN_PAGE.replace(':coinId', coinId);
