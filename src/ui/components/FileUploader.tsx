import {useDispatch} from "react-redux";
import {type ChangeEvent, useState} from "react";
import {uploadTermsFromFile} from "../../store/terms/slice.ts";

export const FileUploader = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        dispatch(uploadTermsFromFile(file));
        setFile(null);
    };

    return (
        <div>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>
                Upload
            </button>
        </div>
    );
}