import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import SideBarGrid from 'component/side-grid';
import MsgGrid from 'component/msg-grid';
import ChatGrid from 'component/chat-grid';
import TaskGrid from 'component/task-grid'

const HomePage = ()=>{
    
    return (
        <Grid container component='main' sx={{p: '.25rem', height: '100vh', overflow: 'hidden', background: '#FFFFFF'}}>
            <Grid item xs={12}   lg={2.3} sx={{width: '100%', height: '100%'}}> <SideBarGrid /> </Grid>
            <Grid item xs={12}   lg={3} sx={{width: '100%', height: '100%'}} > <MsgGrid /> </Grid>
            <Grid item xs={12}   lg={3.7} sx={{width: '100%', height: '100%'}} > <ChatGrid /> </Grid>
            <Grid item xs={12}   lg={3} sx={{width: '100%', height: '100%'}} > <TaskGrid /> </Grid>
        </Grid>
    )
}

export default HomePage