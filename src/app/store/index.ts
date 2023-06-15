import { configureStore } from '@reduxjs/toolkit';

import { coinsReducer } from '~/entities/coin/model';

export default configureStore({
    reducer: { coins: coinsReducer }
});
