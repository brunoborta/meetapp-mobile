import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';

import persistConfig from '~/config/reduxPersist';

import createStore from './createStore';
import reducers from './modules/rootReducer';
import sagas from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
