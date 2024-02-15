import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {Box, Typography} from '@mui/material'
import {ChatState} from '../context/chatContext'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const AlertMessage = () => {
    const {alertMsg, setAlertMsg, openAlert, setOpenAlert, alertSeverity, setAlertSeverity} = ChatState()  //serverity: 'warning', msg: 'Field cannot be empty', openAlert: true

    useEffect(() => {
        if (openAlert) {
            handleClick()
        }
        if (!openAlert){
            handleClose()
        }
    }, [openAlert])

    const handleClick = () => {
        setTimeout(() => {
            setOpenAlert(false)
        }, 3000);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false)
    };

    return (
        <div>

        <Snackbar 
            open={openAlert} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <Alert onClose={handleClose} severity={alertSeverity}>
                <Typography variant='h5' fontWeight={'500'}>{alertMsg}</Typography>
            </Alert>
        </Snackbar>
        </div>
    );
};

export default AlertMessage;
