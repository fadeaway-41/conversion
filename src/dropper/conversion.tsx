import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";

export default  function Dropper()
{
    const ffmpeg = useRef(new FFmpeg());
    const [file,setFile] = useState<File | undefined>();
    const [newtype , setNewtype] = useState<string>("avi");
    console.log(newtype)
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
            <div className="nav h-25 d-flex flex-column">
                <select onChange={ 
                    (e) => {
                        setNewtype(e.target.value);
                        console.log(e.target.value);
                        }}
                     className="selectinput">
                    <option>avi</option>
                    <option>mov</option>
                </select>
            </div>
                <div className="center-box d-flex justify-content-center">
                    <div className="d-flex h-100 pt-4 px-5 box flex-column">
                        <div className="Top d-flex justify-content-start">
                            <h4 className="text-light">Upload file</h4>
                        </div>
                        <div className="upload-box h-75 mt-3 d-flex flex-column justify-content-center align-items-center position-relative">
                            <input
                                type="file"
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ opacity: 0, cursor: 'pointer' }}
                                onChange={handleFileChange}
                            />
                            <div className="inside-box text-light">drag & drop your files or select a file</div>
                        </div>
                    </div>
                </div>
        </div>
    )
}