import { useEffect, useState } from "react"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';

interface NotifyProps
{
    appear: boolean,
    setAppear: React.Dispatch<React.SetStateAction<boolean>>
    variant: string,
    message: string
}

const Notify = ({appear,setAppear,variant,message} : NotifyProps) =>
{
    // const filename = file.name.split('.')[0];
    const headermsg = message.split('/')[0];
    const bodymsg = message.split('/')[1];
return (
    <>
        {['Success','Danger'].filter(item => item === variant).map(item => 
            <ToastContainer style={{ zIndex: 1 }}>
            <Toast show={appear} delay={5000} autohide bg={item.toLowerCase()} onClose={() => setAppear(false)}>
            <Toast.Header>
                { 
                    item == 'Success' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-success rounded me-2" ><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.03 7.03l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 111.06 1.06z"/></svg> 
                    :  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-danger rounded me-2"><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm3.53 6.47a.75.75 0 010 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 11-1.06-1.06L8.94 10 6.47 7.53a.75.75 0 111.06-1.06L10 8.94l2.47-2.47a.75.75 0 011.06 0z"/></svg>
                }
                <strong className="me-auto">{headermsg}</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body><strong className="text-white">{bodymsg}</strong></Toast.Body>
            </Toast>
        </ToastContainer>
        )}
        
    </>
  );
}

export { Notify };