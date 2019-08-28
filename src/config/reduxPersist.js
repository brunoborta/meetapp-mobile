import storage from 'redux-persist/lib/storage';

export default {
  key: 'meetapp',
  storage,
  whitelist: ['auth', 'user'],
};
