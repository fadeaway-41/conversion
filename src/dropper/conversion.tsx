import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";
import Nav from "../elements/nav/nav.jsx"
export default  function Dropper()
{
    const ffmpeg = useRef(new FFmpeg());
    const [file,setFile] = useState<File | undefined>();
    const [newtype , setNewtype] = useState<string>("avi");
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }
    useEffect(() => {
        const load = async () => 
        {   
            await ffmpeg.current.load()
            if(file)
            {   
                const filename = file.name.split('.')[0];
                const input = file.name;
                const output = `${filename}.${newtype}`; 



                await CodecConversion(ffmpeg.current, input, file, newtype,output);
            }
        };
        load();
    }, [file]);
    return (
<div className="vh-100 main-container w-100">
    <Nav />
    <div className="nav h-25 d-flex flex-column">
        <select onChange={
            (e) => {
                setNewtype(e.target.value);
                console.log(e.target.value);
            }}
            className="selectinput">
            <option>avi</option>
            <option>mov</option>
            <option>mp4</option>
            <option>mkv</option>
            <option>webm</option>
        </select>
    </div>
    <div className="center-box d-flex justify-content-center">
        <div className="d-flex h-100 pt-4 box flex-column">
            <div className="Top d-flex justify-content-start">
                <h4 className="text-light">Upload file</h4>
            </div>
            <div className="upload-box h-75 d-flex flex-column justify-content-center align-items-center position-relative p-3">
                <input
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                />
                <div className="upload-content">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18C3.79086 18 2 16.2091 2 14C2 11.9645 3.5 10.2 5.5 10.02C5.83 7.15 8.24 5 11.1 5C13.6 5 15.75 6.66 16.44 9.06C18.5 9.28 20 10.98 20 13C20 15.21 18.21 17 16 17H6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 20V13M12 13L9.5 15.5M12 13L14.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="upload-text">
                        <span className="upload-primary">Select your file here to get started</span>
                        <span className="upload-secondary">or drop your file here.</span>
                    </div>
                    <button type="button" className="select-file-btn">
                        <svg className="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            <path d="M12 11V17M9 14H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Select File
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}