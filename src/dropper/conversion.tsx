export default function Dropper()
{
    function handleFileChange(e: React.FormEvent<HTMLInputElement>)
    {

    }
    return (
        <div className="vh-100 main-container w-100">
            <div className="nav h-25"></div>
                <div className="center-box d-flex justify-content-center">
                    <div className="d-flex h-100 pt-4 px-5 box flex-column">
                        <div className="Top d-flex justify-content-start">
                            <h4>Upload file</h4>
                        </div>
                        <div className="upload-box h-75 mt-3 d-flex flex-column justify-content-center align-items-center position-relative">
                            <input
                                type="file"
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ opacity: 0, cursor: 'pointer' }}
                                onChange={handleFileChange}
                            />
                            <div className="inside-box">drag & drop your files or select a file</div>
                        </div>
                    </div>
                </div>
        </div>
    )
}