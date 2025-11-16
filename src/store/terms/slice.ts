import {createSlice} from "@reduxjs/toolkit";
import type {ITermsState, CreateSpeechAction, SetTermsAction, SetTermAction} from "./types.ts";

const initialState: ITermsState = {
    terms: [],
}

export const termsSlice = createSlice({
    name: "terms",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createSpeech: (_state, _action: CreateSpeechAction) => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchTerms: (_state) => {},
        setTerms: (state, action: SetTermsAction) => {
            state.terms = action.payload;
        },
        setTerm: (state, action: SetTermAction) => {
            const term = action.payload;
            const index = state.terms.findIndex((t) => t.id === term.id);
            if (index >= 0) {
                state.terms[index] = {
                    ...state.terms[index],
                    ...action.payload,
                }
            }
        },
    }
});

export const {fetchTerms, setTerms, setTerm, createSpeech} = termsSlice.actions;
export default termsSlice.reducer;
