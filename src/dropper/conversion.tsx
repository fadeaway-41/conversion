import { useEffect, useState , useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { CodecConversion } from "../utils/fileUtils.tsx";
import { UrlConversion } from "../utils/UrlConversion.tsx";
import { CODEC, CODECS } from "../utils/codes.tsx";
import {Notify} from "../elements/toasts/toasts.tsx"
import { callToast } from "../elements/toasts/toastcaller.tsx";
import Nav from "../elements/nav/nav.jsx";
import UploadBox from "../elements/uploadbox/uploadbox.tsx";
import ProgressBar from "../elements/progressbar/progressbar.tsx";


//  add toasts for same file conversion 
//  design a toast
//  add a toast after on the handlefilechange function

export default function Dropper()
{
    const ffmpeg = useRef(new FFmpeg());
    const [progress,setProgress] = useState<number>(0);
    const [file,setFile] = useState<File | undefined>();
    const [newtype , setNewtype] = useState<string>("avi");
    const [click,setClick] = useState<number>(0);
    const [showToast , setShowToast] = useState<boolean>(false);
    const[toastVariant,setToastVariant] = useState<string>("")
    const [toastMessage,setToastMessage] = useState<string>("");  
    const [isOpen , setIsOpen] = useState(false);
    
    const toast = (variant: string, message: string) => {
    callToast(
        setShowToast,
        setToastVariant,
        setToastMessage,
        variant,
        message
    );
    };
    const formats = Object.keys(CODECS) as CODEC[];

    const StartConvert = (e: React.MouseEvent<HTMLButtonElement>) =>
    {
        if(!file)
        {
            toast("Danger", "Error/your file upload has failed , no file uploaded");
            return;
        }
        setClick(prev => prev + 1);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const file = e.target.files?.[0];
        const oldtype = file?.name.split(".").pop() ?? "";

        if (!file || !formats.includes(oldtype))
        {
            setFile(undefined);
            toast("Danger", "Error/your file upload has failed , wrong file type");
            return;
        }

        setFile(file);
        toast("Success", "File upload/Your file has been successfully uploaded");
    }
    // function handleUrlChange(e: React.MouseEvent<HTMLButtonElement>) {
    //     setUrlink(e.currentTarget.value);
    // }

    useEffect(() => {
        const load = async () => 
        {   
            if(!file)
            {
                return;
            }
            const oldtype = file?.name.split(".").pop() ?? "";

            if (!formats.includes(oldtype))
            {
                setFile(undefined);
                console.log(file)
                return;
            }
            await ffmpeg.current.load()
            if(file)
            {   
                const filename = file.name.split('.')[0];
                const input = file.name;
                const output = `${filename}.${newtype}`; 

                await CodecConversion(ffmpeg.current, input, file, newtype,output,setProgress);
            }
        };
        load();
    }, [click]);

    // const loadurl = async () =>
    // {
    //     await ffmpeg.current.load();
    //     await UrlConversion(ffmpeg.current,urlink,"video.mp4");
    //     // ffmpeg -i "YOUR URL TO DOWNLOAD VIDEO FROM" -c:v libx264 -preset slow -crf 22 "saveas.mp4"
    // }


    return (
    <div className="vh-100 main-container w-100 d-flex flex-column">

        <Nav />

        <div className="center-box d-flex justify-content-center align-items-center flex-column mt-5">
            <div className="d-flex box flex-column">
                <UploadBox handleFileChange={handleFileChange} />
            </div>
            <div className="inputs d-flex  align-items-center">
                <div className="select-wrapper">
                    <button className="select-button"  onClick={() => setIsOpen(!isOpen)}>{newtype.toUpperCase()}
                        <svg className="select-arrow" width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {isOpen && (
                        <div className="select-menu">
                            {formats.filter((option) => option !== "url")
                            .map((option, key) =>
                                (
                                    <div key={key} className="select-option" onClick={(e) => { setNewtype(option); setIsOpen(false); }}>
                                        {option.toUpperCase()}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
                <ProgressBar progress={progress}/>
                <div className="Btn d-flex justify-content-end align-items-center">
                    <button className="p-1 mt-3 click-btn" onClick={StartConvert}>
                        Start converting
                    </button>
                </div>
            </div>
        </div>
        <div className="end-box d-flex justify-content-end align-items-end h-100 m-4">
            <Notify appear={showToast} setAppear={setShowToast} variant={toastVariant} message={toastMessage}/>
        </div>
    </div>
    )
}