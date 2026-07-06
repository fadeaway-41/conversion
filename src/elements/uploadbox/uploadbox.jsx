import {
    handleUploadBoxMouseEnter,
    handleUploadBoxMouseLeave,
} from "../../utils/uploadanimation";

export default function UploadBox({ handleFileChange }) {
    return (
        <div
            className="upload-box h-75 d-flex flex-column justify-content-center align-items-center position-relative p-3"
            onMouseEnter={handleUploadBoxMouseEnter}
            onMouseLeave={handleUploadBoxMouseLeave}
        >
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
    );
}