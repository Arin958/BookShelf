import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/bookSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "books",
  storage,
};

const persistedReducer = persistReducer(persistConfig, booksReducer);

export const store = configureStore({
  reducer: {
    books: persistedReducer,
  },
});

export const persistor = persistStore(store);
