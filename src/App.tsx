import {useEffect, useState} from 'react'
import {onSnapshot, collection} from 'firebase/firestore';
import {firestore} from "./firebase.ts";

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
                        <Dot color={color.value} /> {color.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
