import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import david from '../asset/david.jpg'
import { MdOutlinePeopleOutline } from "react-icons/md";
import '../index.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";


const Msg = ({data, show })=>{
    const [msgSender, setMsgSender] = useState(false)

    useEffect(()=>{
        if (data.id === '30'){
            setMsgSender(true);
        }
    }, [])


    const handleClick = (data)=>{
        console.log(data)
    }

    return (
        <>
        {msgSender ?<Box className={"loggedInUser"} sx={{width: '100%',overflowX: 'hidden', textAlign: 'justify'}}>
            <Grid  onClick={()=> handleClick(data)} container component='main'  sx={{width: 'auto', maxWidth: '80%', height: 'auto',  mt: '1rem'}} >
                
                <Grid className={msgSender ? "lu-msg-box-info" : "gu-msg-box-info"} item sm={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', p: '.25rem .5rem', mt: '.35rem'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: 'fit-content', width: '100%', }}>
                        <Box sx={{width:'fit-content', height: 'auto', borderRadius: '.3rem', }}>
                        <BiEdit size={'1.25rem'} color='#F6F5FF' /> </Box>
                    </Box>
                    <Box sx={{width: '100%', height: 'auto'}}>
                        <Typography variant='h6' fontWeight={'500'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus tenetur labore quae itaque? unde. </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%',}}>
                        <Typography variant='h6' fontWeight={'400'}>2:24 PM</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        :
        <Box className={"guestUser"} sx={{width: '100%',overflowX: 'hidden', textAlign: 'justify'}}>
            <Grid  onClick={()=> handleClick(data)} container component='main'  sx={{width: 'auto', maxWidth: '90%', height: 'auto',  mt: '1rem'}} >
                
                <Grid className = {"show-pic"} item sm={2} sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center',pt: '.25rem', }}>
                    <Avatar sizes='1rem' src={david} >User</Avatar>
                </Grid>

                <Grid className={msgSender ? "lu-msg-box-info" : "gu-msg-box-info"} item sm={10} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', p: '.25rem .5rem', mt: '.35rem'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 'fit-content', width: '100%', }}>
                        <Typography variant='h6' fontWeight={'400'}>Abj</Typography>
                    </Box>
                    <Box sx={{width: '100%', height: 'auto'}}>
                        <Typography variant='h6' fontWeight={'500'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus tenetur labore quae itaque? unde. </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%',}}><Typography variant='h6' fontWeight={'400'}>2:24 PM</Typography></Box>
                </Grid>
            </Grid>
        </Box>}
        </>
    )
}

export default Msg