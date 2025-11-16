import {useState} from "react";
import {useDispatch} from "react-redux";
import {uploadTerms} from "../../store/terms/slice.ts";

export const Input = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleUpload = async () => {
        dispatch(uploadTerms(text));
        setText('');
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter term: word - translation"
                rows={10}
                cols={30}
                style={{ resize: "none" }}
            />
            <br/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}