import type {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectState = (state: RootState) => state.textToSpeech;

export const selectTerms = createSelector(selectState, (state) => state.terms);