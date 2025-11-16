import {call, fork, put, takeLatest} from "typed-redux-saga";
import {addTerm, createSpeech, fetchTerms, setTerm, setTerms, uploadTerms} from "./slice.ts";
import type {CreateSpeechAction, UploadTermsAction} from "./types.ts";
import {playBase64Audio} from "../helpers/playBase64Audio.ts";
import {doc, getDoc, setDoc, getDocs, collection} from "firebase/firestore";
import {firestore} from "../../firebase.ts";
import {OpenAI} from "openai";
import {arrayBufferToBase64} from "../helpers/arrayBufferToBase64.ts";
import type {Term} from "../globalTypes.ts";
import {parseTerms} from "../helpers/parseTerms.ts";

function* fetchTermsWorker() {
    const collectionRef = collection(firestore, "terms");
    const snapshot = yield* call(getDocs, collectionRef);
    const list = snapshot.docs.map((doc) => ({
        ...(doc.data() as Term),
        id: doc.id,
    }));

    yield* put(setTerms(list));
}

function* uploadTermsWorker(action: UploadTermsAction) {
    const rawTerms = parseTerms(action.payload);
    const collectionRef = collection(firestore, "terms");

    for (const term of rawTerms) {
        const docRef = doc(collectionRef);
        const newTerm = { id: docRef.id, ...term, audio: null };
        yield* call(setDoc, docRef, newTerm);
        yield* put(addTerm(newTerm));
    }
}

function* createSpeechWorker(action: CreateSpeechAction) {
    const term = action.payload;

    // FIREBASE
    const documentRef = doc(firestore, "terms", term.id);
    const snapshot = yield* call(getDoc, documentRef);
    if (snapshot.exists() && term.audio != null) {
        yield* call(playBase64Audio, term.audio);
        return;
    }

    // OPENAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const speech = yield* call(
        [openai.audio.speech, openai.audio.speech.create],
        {
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: term.word,
        instructions: `Pronounce this Norwegian word correctly: ${term.word}`
        });
    const arrayBuffer = yield* call([speech, "arrayBuffer"]);
    const base64 = arrayBufferToBase64(arrayBuffer);
    const updatedTerm = { ...term, audio: base64}

    yield* call(setDoc, documentRef, { audio: base64 }, { merge: true });
    yield* call(playBase64Audio, base64);
    yield* put(setTerm(updatedTerm));
}

function* termsWatcher() {
    yield* takeLatest(fetchTerms.type, fetchTermsWorker);
    yield* takeLatest(uploadTerms.type, uploadTermsWorker);
    yield* takeLatest(createSpeech.type, createSpeechWorker);
}

export function* termsSaga() {
    yield* fork(termsWatcher);
}