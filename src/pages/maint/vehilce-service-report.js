import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined, LensBlurRounded } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, FeedbackCard, MaintStatusCard, WorkbayMaintCard, MaintReportCard, MaintFeedbackCard } from 'components/role-card';
import Table, { CustomizedTables, ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { FaArrowLeft, FaCheckSquare } from "react-icons/fa"
import { MdOutlinePendingActions } from "react-icons/md";
import SideBar from '../../components/side-bar'
import MaintSideBar from 'components/maint-side-bar';
import MaintSideBarMobile from 'components/maint-side-bar-mobile';
import MenuBar from 'components/menu-bar';
import { AiOutlineRollback } from "react-icons/ai";
import { AcceptRequestModal } from 'components/modal'; 
import { GrInProgress } from "react-icons/gr";
import { GiHomeGarage } from "react-icons/gi";
import { FaSquareCheck } from "react-icons/fa6";
import { VehicleServiceVehicleCard } from 'components/admin-component/card';
import { VehicleServiceMaintStatusCard, VehicleServiceMaintReportCard } from 'components/role-card';
import { VehicleServiceSeletctStatusModal } from 'components/modal';
import { VehicleServiceWorkbayMaintCard } from 'components/admin-component/card';

const VehicleServiceReport = ()=>{
    const [show, setShow] = useState(false)
    const [acceptBoo, setAcceptBoo] = useState(false)
    const [accept, setAccept] = useState(false)
    const [maint, setMaint] = useState({})
    const [vehicle, setVehicle] = useState({})
    const [report, setReport] = useState(true)
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    const {setAlertMsg, setOpenAlert, setAlertSeverity, statusUpdate, menu, setMenu, personnelReport, setPersonnelReport} = ChatState()
    const [width, setWidth] = useState(window.innerWidth)
    const [menuIcon, setMenuIcon] = useState(false)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        if(menu){setMenu(false)}
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        let maint_id = parts[parts.length - 1];

        if (!navigator.onLine){setShow(false)}
        if (navigator.onLine){
            fetchPlannedMaint(maint_id)
        }
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
    }, [width, statusUpdate, personnelReport])
    

    const fetchPlannedMaint = async(maint_id)=>{
        const token = sessionStorage.getItem('token'); if (token === null){navigate('/login')}
        try {
            const planMaint = await axios.post(`https://futa-fleet-guard.onrender.com/api/maint-log/all-planned-maint/${maint_id}`, {}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setMaint(planMaint.data.maint_log)
            setStatus(planMaint.data.maint_log.status)
            const data = planMaint.data.maint_log.vehicle
            fetchMaintVehicle(data)
        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            }
        }
    }

    const fetchMaintVehicle = async(data)=>{
        const token = sessionStorage.getItem('token')
        try {
            const vehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/user-vehicle", {vehicle_id: data}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setVehicle(vehicle.data.userVehicle)
        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            }
            
        }
    }

    
    const acceptRequest = ()=>{
        if (acceptBoo){setAcceptBoo(false)}
        if (!acceptBoo){setAcceptBoo(true)}
        setAccept(true)
    }

    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            {/* <SideBar /> */}
            <MaintSideBar />
            {menuIcon && <MaintSideBarMobile /> }
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                {/* right top section */}
                <MenuBar />
                {/* right bottom section */}
                <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'1rem',}}>
                        <Grid container component={'main'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '.75rem' }} >
                            <Grid item xs={7} sm={8} md={9} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem'}}>
                                {!isSM && <>{!isMD &&<Typography variant='h3' sx={{fontWeight: '600'}}>{maint.maint_id}</Typography>}
                                {isMD &&<Typography variant='h4' sx={{fontWeight: '500'}}>{maint.maint_id}</Typography>}</>}
                                {isSM &&<Typography variant='h5' sx={{fontWeight: '500'}}>{maint.maint_id}</Typography>}
                            </Grid>

                            <Grid item xs={5} sm={4} md={3} sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                                {status === 'pending' &&  
                                <> {!isMD && <Box onClick={acceptRequest} className="mid-btn hollow-btn"sx={{p: '0 .5rem'}} >
                                    <Typography variant='h5'>Accept Request </Typography>
                                </Box>}</> 
                                }
                                {status === 'pending' && <>{isMD && <Box onClick={acceptRequest} className="mid-btn hollow-btn"sx={{p: '0 .5rem', height: '2.25rem'}} >
                                    <Typography variant='h5'>Accept Request </Typography>
                                </Box> }</>}
                            </Grid>

                        </Grid>

                        
                        {!isMD && <Grid container component={'main'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width: '100%', gap: '.75rem', }}>
                            <Box item xs={3} sm={3} md={2.5} className='mid-btn back-btn' onClick={()=> navigate(-1)} sx={{width: '7rem',}}>
                                <AiOutlineRollback size={'1.35rem'} />
                                <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                            </Box>
                            <>
                            {status=== "pending" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <MdOutlinePendingActions size={'1.5rem'} color={'#1B61E4'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Pending</Typography>
                            </Box>}

                            {status=== "accepted" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GiHomeGarage size={'1.5rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Accepted</Typography>
                            </Box>}

                            {status=== "in-shop" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GiHomeGarage size={'1.5rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>In Shop</Typography>
                            </Box>}

                            {status=== "in-progress" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GrInProgress size={'1.3rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>In Progress</Typography>
                            </Box>}

                            {status=== "completed" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <FaSquareCheck size={'1.4rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Completed</Typography>
                            </Box>}
                            </>
                        </Grid>}

                        {isMD && <Grid container component={'main'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width: '100%', gap: '.75rem', }}>
                            <Box item xs={3} sm={3} md={2.5} className='mid-btn back-btn' onClick={()=> navigate(-1)} sx={{width: '7rem', height: '2.25rem'}}>
                                <AiOutlineRollback size={'1.35rem'} />
                                <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                            </Box>
                            <>
                            {status=== "pending" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <MdOutlinePendingActions size={'1.5rem'} color={'#1B61E4'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Pending</Typography>
                            </Box>}

                            {status=== "accepted" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GiHomeGarage size={'1.5rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Accepted</Typography>
                            </Box>}

                            {status=== "in-shop" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GiHomeGarage size={'1.5rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>In Shop</Typography>
                            </Box>}

                            {status=== "in-progress" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <GrInProgress size={'1.3rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>In Progress</Typography>
                            </Box>}

                            {status=== "completed" &&<Box bgColor='primary.light' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .75rem' }}>
                                <FaSquareCheck size={'1.4rem'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Completed</Typography>
                            </Box>}
                            </>
                        </Grid>}
                        
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.5rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.75rem'}}>
                            {/* The left side */}
                            <Box sx={{width: '100%'}}>
                                <VehicleServiceVehicleCard vehicle={vehicle} />
                                
                            </Box>
                            {/* The Middle Basically the planners complain*/}
                            <Box sx={{width: '100%'}}>
                                <VehicleServiceWorkbayMaintCard data={maint} />
                                <VehicleServiceMaintStatusCard data={maint} />
                            </Box>
                            {/* the right side */}
                            <Box sx={{width: '100%'}}>
                                
                                <VehicleServiceMaintReportCard data={maint} />
                                
                            </Box>
                        </Box> 
                    </Box>
                </Grid>
                </Box>
                {accept && <VehicleServiceSeletctStatusModal newStatus={'pending'} statusModal={acceptBoo} res={maint} />}
            </Grid> 
        </Grid>
    )
}

export default VehicleServiceReport;