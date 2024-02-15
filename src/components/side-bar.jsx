import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Box, Typography, useTheme, useMediaQuery, Hidden } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// import '../index.css'
import { MdNoteAlt,MdHelpCenter } from "react-icons/md";
import { FaCar, FaTools } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { VscFeedback } from "react-icons/vsc";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";

const SideBar = ()=>{
    const [page, setPage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserInfo()
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        let lastPart = parts[parts.length - 1];
        if(parts.length === 2){
            lastPart = parts[parts.length - 1]
            setPage(lastPart)
            navigate(`/${lastPart}`)
        }

        if(parts.length === 3){
            lastPart = parts[parts.length - 2]
            setPage(lastPart)
        }
    }, [page])

    const handlePage = (value)=>{
        console.log(value)
        navigate(`/${value}`)
    }

    const fetchUserInfo = ()=>{
        const user = JSON.parse(sessionStorage.getItem('userInfo'))
        if (user === null){
            navigate('/')
        }
    }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));


    return (
        <Hidden only={'xs'}>
        <Grid item container xs={0} sm={4} md={2.5} lg={2} sx={{overflowY:'auto', p: '.25rem', background: '#1B61E4', height: '100vh'}} >
            <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" >
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '4rem', width: '100%'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end',pl: '.5rem', mt: '1rem'}}>
                        <Typography component={"h2"} variant='h3' color={'white'} sx={{fontWeight: '500'}}>FleetPro</Typography>
                    </Box>
                    
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,  width: '100%',}}>
                        <Box className={page === "dashboard" ? 'btn-1 active-btn-1': 'btn-1'} onClick={()=> handlePage("dashboard")} sx={{width: '100%', }} >
                            <Box className="icon">
                                <FaHouse size={'1.4rem'} />
                            </Box>
                            <Typography variant='h5' >Dashboard</Typography> 
                        </Box>

                        <Box className={page === "workbay" ? 'btn-1 active-btn-1': 'btn-1'} onClick={()=> handlePage("workbay")} sx={{width: '100%', }}>
                            <Box className="icon">
                                <FaTools size={'1.2rem'} />
                            </Box>
                            <Typography variant='h5'>Workbay</Typography> 
                        </Box>

                        <Box className={page === "vehicle-log" ? 'btn-1 active-btn-1': 'btn-1'} onClick={()=> handlePage("vehicle-log")} sx={{width: '100%', }} >
                            <Box className="icon">
                                <CgNotes size={'1.3rem'} />
                            </Box>
                            <Typography variant='h5'>Vehicle log</Typography> 
                        </Box>

                        <Box className={page === "vehicle"? 'btn-1 active-btn-1': 'btn-1'} onClick={()=> handlePage("vehicle")} sx={{width: '100%'}}>
                            <Box className="icon">
                                <FaCar size={'1.5rem'} />
                            </Box>
                            <Typography variant='h5'>Assigned Vehicle</Typography> 
                        </Box>

                        {/* The lower part */}
                        <Box className={page === "reports" ? 'btn-1 active-btn-1': 'btn-1'} onClick={()=> handlePage("reports")} sx={{width: '100%'}} >
                            <Box className="icon">
                                <MdNoteAlt size={'1.5rem'} />
                            </Box>
                            <Typography variant='h5'>Reports</Typography> 
                        </Box>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,  width: '100%', mb: '1.5rem' }}>
                    <Box className='btn-1' sx={{width: '100%', }} >
                        <Box className="icon">
                            <VscFeedback size={'1.5rem'} />
                        </Box>
                        <Typography variant='h5'>Feedback</Typography> 
                    </Box>
                    <Box className='btn-1' sx={{width: '100%', }}>
                        <Box className="icon">
                            <MdHelpCenter size={'1.5rem'} />
                        </Box>
                        <Typography variant='h5'>Help Center</Typography> 
                    </Box>
                    <Box className='btn-1 warning-btn-1' onClick={()=> {sessionStorage.clear(); navigate('/')}} sx={{width: '100%', }} >
                        <Box className="icon">
                            <RiLogoutBoxFill size={'1.5rem'} />
                        </Box>
                        <Typography variant='h5'>Log Out</Typography> 
                    </Box>
                </Box>
                
            </Grid>
        </Grid>
        </Hidden>
    )
}

export default SideBar