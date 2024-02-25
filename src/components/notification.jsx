import * as React from 'react';
import {useState, useEffect} from 'react';
import Popover from '@mui/material/Popover';
import { Button, Box, Typography, useTheme, useStepContext, } from '@mui/material'
import { IoMdNotificationsOutline } from "react-icons/io";
import { Avatar } from '@mui/material';
import ExpandableButton, {ExpandableNone} from './collapse-msg';
import { ChatState } from 'context/chatContext';
import axios from 'axios'
import AlertMessage from './snackbar';

export default function NotificationPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notification, setNotification] = useState({})
    const {setAlertMsg, setAlertSeverity, setOpenAlert} = ChatState()
    const [show, setShow] = useState(false)
    const [role, setRole] = useState("")

    useEffect(() => {
    fetchUserInfo()
    }, [])

    const fetchUserInfo = async()=>{
        try {
            const token = sessionStorage.getItem('token');
            const userInfo = await axios.post("https://futa-fleet-guard.onrender.com/api/user/find-user",
            {},{
                headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
                }
            }
            );
            const role =  userInfo.data.loggedInUser.role
            fetchNotification(role)

        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            }
        }
    }

    const fetchNotification = async(role)=>{

        try {
            const token = sessionStorage.getItem('token');
            const fetchNotification = await axios.post("https://futa-fleet-guard.onrender.com/api/notification/filter-notifications",
            {role},{
                headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
                }
            }
            );
            setNotification(fetchNotification.data.Notifications)
            setShow(true)

        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            }
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
<>{show ?
        <div>
        <Avatar sx={{background: '#E8EFFC', height: '2.5rem', width: '2.5rem', cursor: 'pointer', mr: '.5rem'}} onClick={handleClick}><IoMdNotificationsOutline size={'1.75rem'} color='#1B61E4' /> </Avatar>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', p: '.75rem', borderRadius: '.3rem', l: '2.5rem', t: '.5rem',height: 'auto', maxHeight: '25rem', width: '20rem' ,overFlowY: 'auto'}}>
                
                {notification.map((data, ind)=>{
                    return (
                        <ExpandableButton key={ind} data={data} />
                    )
                }) }
            </Box>
        </Popover>
        <AlertMessage />
        </div> 
            :
        <div>
        <Avatar sx={{background: '#E8EFFC', height: '2.25rem', width: '2.25rem', cursor: 'pointer', mr: '.5rem'}} onClick={handleClick}><IoMdNotificationsOutline size={'1.75rem'} color='#1B61E4' /> </Avatar>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', p: '.75rem', borderRadius: '.3rem', l: '2.5rem', t: '.5rem',height: 'auto', maxHeight: '25rem', width: '20rem' ,overFlowY: 'auto'}}>
                <ExpandableNone />
            </Box>
        </Popover>
        <AlertMessage />
        </div> 


        } </>
    )
}