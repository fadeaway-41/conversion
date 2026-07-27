import { useEffect, useState } from "react"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';

interface NotifyProps
{
    appear: boolean,
    setAppear: React.Dispatch<React.SetStateAction<boolean>>
    variant: string
}

const Notify = ({appear,setAppear,variant} : NotifyProps) =>
{
return (
    <>
        {['Success','Danger'].filter(item => item === variant).map(item => 
            <ToastContainer style={{ zIndex: 1 }}>
            <Toast show={appear} delay={3000} autohide bg={item.toLowerCase()} onClose={() => setAppear(false)}>
            <Toast.Header>
                {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-success rounded me-2" >
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.03 7.03l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 111.06 1.06z"/>
                </svg>
                <strong className="me-auto">File upload</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body>Your file has been successfully uploaded</Toast.Body>
            </Toast>
        </ToastContainer>
        )}
        
    </>
  );
}

export { Notify };