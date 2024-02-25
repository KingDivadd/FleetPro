import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgFolderAdd } from "react-icons/cg";
import { TfiMicrophone } from "react-icons/tfi";
import { IoSendOutline } from "react-icons/io5";
import Msg from './msg';

const ChatGrid = ()=>{
    const [sendIcon, setSendIcon] = useState(false)
    const [msg, setMsg] = useState('')

    const msg_data = [
        {content: 'Hello There first', id: '10'},{content: 'How far', id: '20'}, {content: 'Who dey school', id: '20'}, {content: 'I just dey enter school', id: '30'},{content: 'Hello There', id: '30'}, {content: 'Hello There', id: '40'}, {content: 'Hello There', id: '40'}, {content: 'Hello There', id: '40'},{content: 'Hello There last', id: '50'}, {content: 'Who dey school', id: '50'}, {content: 'Who dey school', id: '50'}, {content: 'Who dey school', id: '10'},{content: 'Who dey school', id: '10'}, {content: 'Who dey school', id: '20'}
    ]

    useEffect(()=>{
        if (msg.length){
            setSendIcon(true)
        }
        if (!msg.length){
            setSendIcon(false)
        }
    },[msg])
    const handleChange = (e)=>{
        setMsg(e.target.value)
    }

    return (
        <Grid component={'main'} container direction={'column'} sx={{width: '100%', height: '100%'}}>
            <Grid item container sm={1} sx={{width: '100%', heigth: '100%', p: '0 1.5rem'}} >
                <Grid item sm={1.75} sx={{display: 'flex',alignItems: 'center' ,justifyContent :'flex-start', height: '100%'}}>
                    <Avatar sizes='3.5rem' sx={{background: '#644DFF'}} ><Typography variant='h5' fontWeight='500'>P G</Typography> </Avatar>
                </Grid>
                
                <Grid item container direction={'column'} sm={8.25} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%',}}>
                        <Typography variant='h5' noWarp fontWeight={'500'}>Turbomachine teams </Typography> 
                    </Grid>
                    <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' , width: '100%',  gap: '.75rem'}}>
                        <Typography variant='h6' fotnWeight='500'>27 Participants</Typography> <Typography variant='h6' fotnWeight='500' color='#644DFF' >7 online</Typography>                     
                    </Grid>
                </Grid>

                <Grid item sm={2} sx={{display: 'flex', alignItems: 'center', justifyContent :'flex-end', height: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '.75rem'}}>
                        <Box className={'media-btn'} ><IoCallOutline  size='1.4rem' /> </Box>
                        <Box className={'active-media-btn'} ><IoVideocamOutline  size='1.5rem' /> </Box>
                        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center',}}><BsThreeDotsVertical size={'1.35rem'} /> </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item sm={10} sx={{width: '100%', heigth: '100%', background: 'whitesmoke', p: '1.5rem',pb: '1rem', overflowY: 'auto'}} >
                {msg_data.map((data, ind)=>{
                    let value = false
                    let user2 = msg_data.indexOf(data)
                    if(user2 > 0 && msg_data[user2].id === msg_data[user2 - 1].id){
                        value = false
                    }else{
                        value = true
                    }
                    return (
                        <Msg key={ind} ind={ind} data={data} data_box = {msg_data} show={value} />
                    )
                })}
            </Grid>
            <Grid item sm={1} sx={{width: '100%', heigth: '100%', display: 'flex', alignItems: 'center'}} >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%',  gap: '.25rem', borderRadius: '.3rem', p: '0 1.5rem'}}>
                    <Box sx={{width: '1.75rem',  display: 'flex', alignItems: 'center'}}><CgFolderAdd size={'1.4rem'} /> </Box>
                    <input className='input' placeholder='Write a message...' type="text" name={'msg'} value={msg} onChange={(e)=> handleChange(e)} style={{outline: 'none', border: 'none', height:'2.55rem', width: '100%'}} />
                    {sendIcon ? <Box sx={{width: '1.75rem',  display: 'flex', alignItems: 'center'}}><IoSendOutline size={'1.4rem'} /> </Box>
                    :
                    <Box sx={{width: '1.75rem',  display: 'flex', alignItems: 'center'}}><TfiMicrophone size={'1.4rem'} /> </Box>}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ChatGrid