import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined, LensBlurOutlined, ListAltOutlined} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { IoClose, IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CreateLogModal, ReportModal} from 'components/modal';
import SideBar from 'components/side-bar';
import { TbSortAscending, TbSortDescending, TbList } from "react-icons/tb";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import NotificationPopover from './notification';
import david from '../asset/david.jpg'
import user from '../asset/user.png'
import admin from '../asset/assignee.png'
import driver from '../asset/driver.png'
import maint_personnel from '../asset/maint_personnel.png'

const MenuBar = ({img})=>{
    const [currentTime, setCurrentTime] = useState(new Date())
    const [menuIcon, setMenuIcon] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const {menu, setMenu} = ChatState()
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (userInfo === 'null'){navigate('/login')}
        setRole(userInfo.loggedInUser.role)
        setInterval(() => {
            setCurrentTime(new Date())
        }, 1000);
        window.addEventListener('resize', resize)
        if (width <= 599 ){
            setMenuIcon(true)
        }
        if (width > 599){
            setMenuIcon(false)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [width, menu])

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleMenu = ()=>{
        if (menu){
            setMenu(false)
        }
        if (!menu){
            setMenu(true)
        }
    }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
            <>

            {!isSM && <Box sx={{background: 'white',height: '3.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: '0 .5rem'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',height: '100%', gap: '.75rem'}}>
                    {menu ? 
                    <Box sx={{height: '100', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={handleMenu} >
                        {menuIcon && <IoClose size={'2rem'}  /> }
                        <IoSearch size={'2rem'} />
                    </Box> :
                    <Box sx={{height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={handleMenu} >
                        {menuIcon && <BsFillMenuButtonWideFill color={'#1B61E4'} size={'1.5rem'} /> }
                    </Box>}
                    <Box sx={{width: '8.5rem', height: '100%', display: 'grid', placeItems: 'center'}}>
                        <Typography variant={'h4'} fontWeight={'500'}>{formatDate(currentTime)}</Typography>
                    </Box>
                    <Box sx={{width: '8rem', height: '100%', display: 'grid', placeItems: 'center'}}>
                        <Typography variant={'h4'} fontWeight={'500'}>{currentTime.toLocaleTimeString()}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <NotificationPopover />
                        {role === "driver" && <Box sx={{ backgroundImage: `url(${driver})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "maintenance_personnel" && <Box sx={{ backgroundImage: `url(${maint_personnel})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "vehicle_assignee" && <Box sx={{ backgroundImage: `url(${user})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "vehicle_coordinator" && <Box sx={{ backgroundImage: `url(${admin})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                </Box>
            </Box>}

            {isSM && <Box sx={{background: 'white',height: '3rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: '0 .5rem'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',height: '100%', gap: '.25rem'}}>
                    {!menu && 
                    <Box sx={{height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={handleMenu} >
                        {menuIcon && <BsFillMenuButtonWideFill color={'#1B61E4'} size={'1.3rem'} /> }
                    </Box>}

                    <Box sx={{width: '6.75rem', height: '100%', display: 'grid', placeItems: 'center',}}>
                        <Typography variant={'h5'} fontWeight={'500'}>{formatDate(currentTime)}</Typography>
                    </Box>
                    <Box sx={{width: '6.5rem', height: '100%', display: 'grid', placeItems: 'center', }}>
                        <Typography variant={'h5'} fontWeight={'500'}>{currentTime.toLocaleTimeString()}</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <NotificationPopover />
                        {role === "driver" && <Box sx={{ backgroundImage: `url(${driver})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "maintenance_personnel" && <Box sx={{ backgroundImage: `url(${maint_personnel})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "vehicle_assignee" && <Box sx={{ backgroundImage: `url(${user})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                        {role === "vehicle_coordinator" && <Box sx={{ backgroundImage: `url(${admin})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.25rem', width: '2.25rem', borderRadius: '50%',p: '.15rem' }}>  </Box>}
                </Box>
            </Box>}

            </>

    )
}

export default MenuBar