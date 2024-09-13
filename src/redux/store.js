import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
