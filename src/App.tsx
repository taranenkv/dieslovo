import {useEffect, useState} from 'react'
import {onSnapshot, collection} from 'firebase/firestore';
import {firestore} from "./firebase.ts";
import {OpenAI} from "openai";

type Color = {
    id: string;
    name: string;
    value: string;
}

interface DotProps {
    color: string;
}

const Dot = ({ color }: DotProps) => {
    const style = {
        height: 25,
        width: 25,
        margin: "0px 10px",
        backgroundColor: color,
        borderRadius: "50%",
        display: "inline-block",
    }
    return <span style={style}></span>
}

function App() {
    const [colors, setColors] = useState<Color[]>([]);

    const createSpeech = async (text: string) => {
        const openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const speech = await openai.audio.speech.create({
            model: "gpt-4o-mini-tts",
            voice: "alloy",
            input: text,
            instructions: `Pronounce this Norwegian word correctly: ${text}`
        });
        const arrayBuffer = await speech.arrayBuffer();
        const base64 = arrayBufferToBase64(arrayBuffer);

        await new Audio(`data:audio/mpeg;base64,${base64}`).play();
    }

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode(...Array.from(chunk));
        }
        return btoa(binary);
    }

    useEffect(
        () =>
            onSnapshot(collection(firestore, "colors"), (snapshot) => {
                setColors(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}) as Color));
            }),
        []
    );

    return(
        <div>
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>
                        <button onClick={() => createSpeech(color.name)}>Play</button>
                        <Dot color={color.value} />
                        {color.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
