import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import textToSpeechSliceReducer from "./terms/slice.ts";
import {spawn} from "typed-redux-saga";
import {termsSaga} from "./terms/saga.ts";

const rootReducer =combineReducers({
    textToSpeech: textToSpeechSliceReducer,
});

function* rootSaga() {
    yield* spawn(termsSaga);
}

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: true }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);