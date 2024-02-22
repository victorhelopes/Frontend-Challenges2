import { Alert } from "@mui/material";
import { useEffect } from "react";
import { FIVE_SECONDS } from "../../constants";
import { IAlertMessage } from "../../common/types";

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