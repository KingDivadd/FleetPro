import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FeedbackCard, StatusCard, WorkbayMaintCard } from 'components/role-card';
import { FaArrowLeft, FaCheckSquare } from "react-icons/fa"
import { MdOutlinePendingActions } from "react-icons/md";
import SideBar from '../../components/side-bar'
import MenuBar from 'components/menu-bar';


const WorkbayReport = ()=>{
    const [page, setPage] = useState("")
    const [text, setText] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const getPage = localStorage.getItem("page")
        setPage(getPage)
    }, [])

    
    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            <SideBar />
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                {/* right top section */}
                <MenuBar />
                {/* right bottom section */}
                <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'1rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                            <Typography variant='h3' sx={{fontWeight: '600'}}>FUTAWORK-0010</Typography>
                            <Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .5rem' }}>
                                {/* <Typography variant='h5' sx={{fontWeight: '500'}}>Status</Typography> */}
                                <MdOutlinePendingActions size={'1.5rem'} color={'#1B61E4'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Pending...</Typography>

                            </Box>
                        </Box>
                        <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                <Box className='btn-1 dormant' onClick={()=> navigate(-1)} bgcolor={'warning.main'} sx={{width: '12rem', pl: 2, }} >
                                    <FaArrowLeft />
                                    <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                                </Box>
                                
                            </Box>
                            <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                <Box className='hollow-btn' bgColor='primary.light' sx={{width: '8rem',  height: '2.5rem',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    Export
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.5rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.75rem'}}>
                            {/* The left side */}
                            <Box sx={{width: '100%'}}>
                                <WorkbayMaintCard />
                                <StatusCard status={status}/>
                                
                            </Box>
                            {/* the right side */}
                            <Box sx={{width: '100%'}}>
                                <FeedbackCard />
                            </Box>
                        </Box> 
                    </Box>
                </Grid>
                </Box>
            </Grid> 
        </Grid>
    )
}

export default WorkbayReport