import { SetStateAction } from "react";

const callToast = (
    setShowToast : React.Dispatch<SetStateAction<boolean>>,
    setToastVariant : React.Dispatch<SetStateAction<string>>,
    setToastMessage : React.Dispatch<SetStateAction<string>>,
    variant: string,
    message: string,

) =>
{
    setShowToast(true);
    setToastVariant(variant);
    setToastMessage(message);
}
export {callToast};