import React, { useState, useEffect, useMemo } from 'react'
import { createTheme } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { BsBell } from "react-icons/bs";
import david from '../asset/david.jpg'
import { IoAddOutline } from "react-icons/io5";
import { themeSettings } from 'theme';
import Project from './projects';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));


const TaskGrid = ()=>{

    return (
        <Grid component={'main'} container direction={'column'} sx={{width: '100%', height: '100%', borderTopRightRadius: '.3rem', borderBottomRightRadius: '.3rem', }}>
            <Grid item sm={1} sx={{width: '100%', heigth: '100%', display: 'flex', justifyContent:'flex-end', alignItems: 'center', p: '0 1.5rem' }} >
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.75rem'}}>
                    <Badge badgeContent={100} color="error" >
                        <BsBell size={'2rem'} />
                    </Badge>
                    
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" >
                        <Avatar alt="Remy Sharp" src={david} size={'3.5rem'} />
                    </StyledBadge>
                </Box>
            </Grid>
            <Grid item sm={1} sx={{width: '100%', heigth: '100%',  p: '0 1.5rem'}} >
                <Box sx={{height: '100%', display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                    <Typography variant='h4' fontWeight={'600'}>Timeline</Typography>
                    <Button variant={'contained'} style={{ backgroundColor: "black", fontSize: "18px", textTransform: 'none' }}>
                        <Typography variant='h5' fontWeight={'500'} color={'white'} mr={'.25rem'} >Add Project</Typography>  
                        <IoAddOutline size={'1.5rem'} color='white' /> 
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={10} sx={{width: '100%', heigth: '100%',}}>
                <Project />
            </Grid>
        </Grid>
    )
}

export default TaskGrid