import {createSlice} from "@reduxjs/toolkit";
import type {
    ITermsState,
    CreateSpeechAction,
    SetTermsAction,
    SetTermAction,
    UploadTermsAction, AddTermsAction, AddTermAction, UploadTermsFromFileAction,
} from "./types.ts";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        uploadTerms: (_state, _action: UploadTermsAction) => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        uploadTermsFromFile: (_state, _action: UploadTermsFromFileAction) => {},
        addTerms: (state, action: AddTermsAction) => {
            state.terms = [...state.terms, ...action.payload];
        },
        addTerm: (state, action: AddTermAction) => {
            state.terms.push(action.payload);
        }
    }
});

export const {
    fetchTerms,
    setTerms,
    setTerm,
    uploadTerms,
    uploadTermsFromFile,
    addTerms,
    addTerm,
    createSpeech
} = termsSlice.actions;
export default termsSlice.reducer;
