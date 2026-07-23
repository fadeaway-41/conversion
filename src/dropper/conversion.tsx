import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";
import { UrlConversion } from "../utils/UrlConversion.tsx";
import { CODEC, CODECS } from "../utils/codes.tsx";
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
    const formats = Object.keys(CODECS) as CODEC[];
    const [isOpen , setIsOpen] = useState(false);
    return (
    <div className="vh-100 main-container w-100">
        <Nav />

        <div className="center-box d-flex justify-content-center align-items-center flex-column mt-5">
            <div className="d-flex box flex-column">
                <UploadBox handleFileChange={handleFileChange} />
            </div>
            <div className="inputs d-flex  align-items-center">
            <div className="select-wrapper">
                <button className="select-button" onClick={() => setIsOpen(!isOpen)}>{newtype.toUpperCase()}</button>
                {isOpen && (
                    <div className="select-menu">
                        {formats.map(option =>
                            (
                                <div key={option} className="select-option" onClick={(e) => { setNewtype(option); setIsOpen(false); }}>
                                    {option.toUpperCase()}
                                </div>
                            )
                        )}
                    </div>
                )}
                {/* <select
                        onChange={(e) => {
                            setNewtype(e.target.value);
                        }}
                        className="custom-select d-flex text-white align-items-center"
                        >
                        <option value="avi">AVI</option>
                        <option value="mov">MOV</option>
                        <option value="mp4">MP4</option>
                        <option value="mkv">MKV</option>
                        <option value="webm">WEBM</option>
                    </select> */}
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

        
    </div>
    )
}