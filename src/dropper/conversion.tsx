import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";
import Nav from "../elements/nav/nav.jsx"
import UploadBox from "../elements/uploadbox/uploadbox.jsx";
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
        <div className="inputs h-25 d-flex flex-column">
            <label className="input-label text-light mb-2">
                Output format
            </label>
            <select
                onChange={(e) => {
                    setNewtype(e.target.value);
                    console.log(e.target.value);
                }}
                className="selectinput"
            >
                <option value="avi">AVI</option>
                <option value="mov">MOV</option>
                <option value="mp4">MP4</option>
                <option value="mkv">MKV</option>
                <option value="webm">WEBM</option>
            </select>
        </div>
        <div className="center-box d-flex justify-content-center">
            <div className="d-flex h-100 pt-4 box flex-column">
                <div className="Top d-flex justify-content-start">
                    <h4 className="text-danger">Upload file</h4>
                </div>
                    {/*  */}
                    <UploadBox handleFileChange={handleFileChange} />
                    {/*  */}
            </div> 
        </div>
    </div>
    )
}