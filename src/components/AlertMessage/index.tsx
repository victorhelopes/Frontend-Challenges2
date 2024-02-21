import { Alert } from "@mui/material";
import { useEffect } from "react";

interface IAlertMessage{
    message: string;
    close: ()=> void;
}

const FIVE_SECONDS = 5000

export function AlertMessage({message, close}: IAlertMessage){

    useEffect(()=>{
        setTimeout(close, FIVE_SECONDS)
    }, [close, message])

    return(
        <Alert sx={{position: 'absolute', top: '2rem', right: '2rem'}} severity="error">
            {message}
        </Alert>
    )
}