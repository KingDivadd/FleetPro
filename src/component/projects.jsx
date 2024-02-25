import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { TbSmartHome } from "react-icons/tb";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GoPeople } from "react-icons/go"
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { PiCaretUp } from "react-icons/pi";
import { PiCaretDown} from "react-icons/pi";

const Project = ()=>{

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'space-between', justifyContent: 'center',p: '0 1.5rem', background: 'whitesmoke'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '3.5rem', borderBottom: '1px solid #F6F5FF'}}>
                <Typography variant='h5' noWarp fontWeight={'500'}>WORK PROJECT 3</Typography>
                <CiEdit size={'1.4rem'} />
            </Box>
            {/* <Box>
                <Typography variant='h5' noWarp fontWeight={'500'}>Here we will have some import doct and what not</Typography>
            </Box> */}
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '2.5rem',}}>
                <Typography variant='h5' noWarp fontWeight={'500'}>Expand</Typography>
                <PiCaretDown size={'1.4rem'} />
            </Box>
        </Box>

    )
}
export default Project