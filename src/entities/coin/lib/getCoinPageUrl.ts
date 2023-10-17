import { sharedConfigRoutes } from '~/shared/config';
const { RouteName } = sharedConfigRoutes;
interface GetCoinPageUrlParams {
    coinId: string;
}
export const getCoinPageUrl = ({ coinId }: GetCoinPageUrlParams): string =>
    RouteName.COIN_PAGE.replace(':coinId', coinId);
