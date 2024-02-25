import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import {Styled} from '@mui/material/styles'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { BiMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import david from '../asset/david.jpg'

const ChatBar = ({data})=>{
    const [clicked, setClicked] = useState([])

    const handleClick = (data)=>{
        console.log(data)
        let box = []
        box.push(data)
        setClicked(box)
        console.log(clicked)

    }
    return (
        <Grid  className = {clicked.includes(data) ? 'chat-list-active': 'chat-list'} onClick={()=> handleClick(data)} container component='main' sx={{height: '4rem', p: '0 1.5rem',}}>
            <Grid item sm={2.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start',}}>
                <Box sx={{ backgroundImage: `url(${david})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '3rem', width: '3rem',backgroundColor: 'red', borderRadius: '100%', position: 'relative'}}>
                    <Box sx={{height: '.7rem', width: '.7rem', borderRadius: '50%', background: 'white', position: 'absolute',bottom: '.35rem', right: '-0rem', p: '.05', display: 'grid', placeItems: 'center'}}>
                        <Box sx={{height: '.5rem', width: '.55rem', borderRadius: '50%', background: 'green', }}></Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item conatainer direction={'column'} sm={7} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%'}}>
                    <Typography variant='h5' fontWeight={'500'}>Adebola </Typography> 
                </Grid>
                <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' , width: '100%'}}>
                    {/* <Typography variant='h6' fontWeight={'500'} color={'#644DFF'}>Typing...</Typography> */}
                    <Typography variant='h6' noWrap fontWeight={'400'}>I dey enter school around 12 sha.</Typography>
                </Grid>
            </Grid>
            <Grid item direction={'column'} container sm={2.5} sx={{display: 'flex', alignItems: 'center',}}>
                <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', }}>
                    <Typography variant='h6' fontWeight={'400'}>12:25 PM</Typography>
                </Grid>
                <Grid item sm={6} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', width: '100%', }}>
                    <Box sx={{background: 'red',p: '.15rem .35rem', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                        <Typography variant='h7' color='white' fontWeight={'500'}>10</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChatBar