import { routesConfig } from '~/shared/config';

interface GetCoinPageUrlParams {
    coinId: string;
}
export const getCoinPageUrl = ({ coinId }: GetCoinPageUrlParams): string =>
    routesConfig.RouteName.COIN_PAGE.replace(':coinId', coinId);
