import type {PayloadAction} from "@reduxjs/toolkit";
import type {Term} from "../globalTypes.ts";

export interface ITermsState {
    terms: Term[];
}

export type CreateSpeechAction = PayloadAction<Term>;
export type SetTermsAction = PayloadAction<Term[]>;
export type SetTermAction = PayloadAction<Term>;