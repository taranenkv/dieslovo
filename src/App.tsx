import {useDispatch, useSelector} from "react-redux";
import {createSpeech, fetchTerms} from "./store/terms/slice.ts";
import {selectTerms} from "./store/terms/selectors.ts";
import {useEffect} from "react";
import {Input} from "./ui/components/Input.tsx";
import {FileUploader} from "./ui/components/FileUploader.tsx";

function App() {
    const dispatch = useDispatch();
    const terms = useSelector(selectTerms);

    useEffect(() => {
        dispatch(fetchTerms());
    }, [dispatch]);

    return(
        <div>
            <Input/>
            <FileUploader/>
            <ul>
                {terms.map((item) => (
                    <li key={item.id}>
                        {item.word} / {item.translation}
                        <button onClick={() => dispatch(createSpeech(item))}>Play</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
