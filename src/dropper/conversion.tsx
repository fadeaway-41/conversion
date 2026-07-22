import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";
import { UrlConversion } from "../utils/UrlConversion.tsx";
import Nav from "../elements/nav/nav.jsx"
import UploadBox from "../elements/uploadbox/uploadbox.jsx";
export default  function Dropper()
{
    const ffmpeg = useRef(new FFmpeg());
    const [file,setFile] = useState<File | undefined>();
    const [newtype , setNewtype] = useState<string>("avi");
    const [urlink , setUrlink] = useState<string>("");
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }
    function handleUrlChange(e: React.MouseEvent<HTMLButtonElement>) {
        setUrlink(e.currentTarget.value);
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
    const loadurl = async () =>
    {
        await ffmpeg.current.load();

        await UrlConversion(ffmpeg.current,urlink,"video.mp4");

        // ffmpeg -i "YOUR URL TO DOWNLOAD VIDEO FROM" -c:v libx264 -preset slow -crf 22 "saveas.mp4"
    }
    return (
<div className="vh-100 main-container w-100">
        <Nav />

        <div className="center-box d-flex justify-content-center align-items-center">
            <div className="d-flex box flex-column">
                <UploadBox handleFileChange={handleFileChange} />
            </div>
        </div>

        <div className="inputs h-25 d-flex flex-column align-items-center">
            <label className="input-label text-white mb-2">
                Output format
            </label>

            <div className="select-wrapper">
            <select
                    onChange={(e) => {
                        setNewtype(e.target.value);
                    }}
                    className="custom-select d-flex"
                >
                    <option value="avi">AVI</option>
                    <option value="mov">MOV</option>
                    <option value="mp4">MP4</option>
                    <option value="mkv">MKV</option>
                    <option value="webm">WEBM</option>
                </select>

                <span className="select-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </div>
{/* 
            <input
                type="text"
                className="w-25 form-control mt-3"
                onChange={(e) => setNewtype(e.target.value)}
            /> */}

            <button className="w-25 btn btn-light mt-3" onClick={handleUrlChange}>
                Click
            </button>
        </div>
    </div>
    )
}