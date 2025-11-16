import {useDispatch, useSelector} from "react-redux";
import {createSpeech, fetchTerms} from "./store/terms/slice.ts";
import {selectTerms} from "./store/terms/selectors.ts";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const terms = useSelector(selectTerms);

    useEffect(() => {
        dispatch(fetchTerms());
    }, [dispatch]);

    return(
        <div>
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
