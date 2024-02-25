import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery, Skeleton } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AdminSideBar from 'components/admin-component/side-bar';
import AdminSideBarMobile from 'components/admin-component/side-bar-mobile';
import MaintSideBar from 'components/maint-side-bar';
import MaintSideBarMobile from 'components/maint-side-bar-mobile';
import { VehicleInformationCard, VehicleStatusCard, VehicleAssigneeCard, VehicleMaintCard, VehiclePlannedMaintCard, EmptyVehiclePlannedMaintCard, EmptyVehicleMaintCard, SkeletonBox } from 'components/admin-component/card';
import MenuBar from 'components/menu-bar';
import { AiOutlineRollback } from "react-icons/ai";
import { FaSquareCheck } from "react-icons/fa6";
import AlertMessage from 'components/snackbar';
import { MdOutlinePendingActions } from "react-icons/md";
import { AssignVehicle } from 'components/admin-component/modal';

const ServiceHistoryReport = ()=>{
    const navigate = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
    const [vehicle, setVehicle] = useState([])
    const [show, setShow] = useState(false)
    const [assigned, setAssigned] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [menuIcon, setMenuIcon] = useState(false)
    const [role, setRole] = useState("")
    const [planMaint, setPlanMaint] = useState([])
    const [presentPlanMaint, setPresentPlanMaint] = useState(false)
    const [unPlannedMaint, setUnPlannedMaint] = useState([])
    const [presentUnPlannedMaint, setPresentUnPlannedMaint] = useState(false)


    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('userInfo'))
        if (user !== null){
            setRole(user.loggedInUser.role)
        }else{ navigate('/login')}

        if (!navigator.onLine){
            setOpenAlert(true); setAlertMsg("Network Error!!!"); setAlertSeverity('warning')
        }else{
            fetchVehicleInfo()
            fetchPlannedMaint()
            fetchUnPlannedMaint()
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
    }, [width])



    const fetchPlannedMaint = async()=>{
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        let vehicle_id = parts[parts.length - 1];
        

        const token = sessionStorage.getItem('token')
        if (token === null){navigate('/login')}
        try {
            const plannedMaint = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/all-planned-maint", {vehicle: vehicle_id}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setPlanMaint(plannedMaint.data.allPlannedMaint)
            console.log('Planned Maint',plannedMaint.data.allPlannedMaint, planMaint)
            if (plannedMaint.data.allPlannedMaint.length){
                setPresentPlanMaint(true)
            }
            if (!plannedMaint.data.allPlannedMaint.length){
                setPresentPlanMaint(false)
            }
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            }
        }
    }

    const fetchUnPlannedMaint = async()=>{
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        let vehicle_id = parts[parts.length - 1];
        console.log('vehicle id', vehicle_id)
        

        const token = sessionStorage.getItem('token')
        if (token === null){navigate('/login')}
        try {
            const start_date = "" // this and the two below are for filtering, will handle that later
            const end_date = ""
            const filter = ""
            const maintLogs = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/all-vehicle-maint-log", {vehicle_id}, {
                headers: {
                    "Content-Type":  "Application/json",
                }
            });
            setUnPlannedMaint(maintLogs.data.allVehicleMaintLog)
            console.log('UnPlanned maint', maintLogs.data)
            if (maintLogs.data.allVehicleMaintLog.length){
                setPresentUnPlannedMaint(true)
            }
            if (!maintLogs.data.allVehicleMaintLog.length){
                setPresentUnPlannedMaint(false)
            }
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);
            }
        }
    }

    const fetchVehicleInfo = async()=>{
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        let vehicle_id = parts[parts.length - 1];
        

        const token = sessionStorage.getItem('token')
        if (token === null){navigate('/login')}
        try {
            const registeredVehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/user-vehicle", {vehicle_id}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setVehicle(registeredVehicle.data.userVehicle)
            if (registeredVehicle.data.userVehicle.assigned_to.length){
                setAssigned(true)
            }
            if (!registeredVehicle.data.userVehicle.assigned_to.length){
                setAssigned(false)
            }
            setShow(true)
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            }
        }
    }


    function handleBack(){
        navigate(-1)
    }
    
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (

        <>

        {/* This part shows when vehicle information has been fetched successfully */}
        {show ? 
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            {role === "vehicle_coordinator" && <AdminSideBar />}
            {(role === "vehicle_coordinator" && menuIcon) && <AdminSideBarMobile />}

            {role === "maintenance_personnel" && <MaintSideBar />}
            {(role === "maintenance_personnel" && menuIcon) && <MaintSideBarMobile />}

            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                    {/* right top section */}
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                        {/* Right bottom top section */}
                        <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'1rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: '2rem' }} >

                                {!isSM && <>{!isMD && <Typography variant='h3' fontWeight={'600'} >{vehicle.vehicle_name.toUpperCase()}</Typography>}
                                        {isMD && <Typography variant='h4' fontWeight={'500'} >{vehicle.vehicle_name.toUpperCase()}</Typography>}</>
                                }

                                {isSM && <Typography variant='h4' fontWeight={'600'} lineHeight={'2rem'} sx={{display: 'flex', alignSelf: 'flex-start'}}>{vehicle.vehicle_name.toUpperCase()}</Typography>}

                                {assigned? 
                                <>
                                {!isSM && <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .5rem' }}>
                                    <FaSquareCheck size={'1.5rem'} color={'green'} />
                                    <Typography variant='h5' sx={{fontWeight: '500'}}>Assigned</Typography>
                                </Box>}
                                {isSM && <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '.5rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', p: '0 .5rem' }}>
                                    <FaSquareCheck size={'1.5rem'} color={'green'} />
                                    <Typography variant='h5' sx={{fontWeight: '500'}}>Assigned</Typography>
                                </Box>}
                                </>
                                        :
                                <>
                                {!isSM && <Box  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',gap: '1rem', border: '1px solid gray', height: '2.5rem', borderRadius: '.3rem', p: '0 .5rem' }}>
                                    <MdOutlinePendingActions size={'1.5rem'} color={'#FF571A'} />
                                <Typography variant='h5' sx={{fontWeight: '500'}}>Not Assigned</Typography>
                                </Box>}
                                {isSM && <Box  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',gap: '.5rem', border: '1px solid gray', height: '2.25rem', borderRadius: '.3rem', width: '12rem', }}>
                                    <MdOutlinePendingActions size={'1.35rem'} color={'#FF571A'} />
                                    <Typography variant='h5' sx={{fontWeight: '500'}}>Not Assigned</Typography>
                                </Box>}
                                </>
                                }

                            </Box>
                            <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                        {!isSM &&<Box className='mid-btn back-btn' onClick={()=> navigate(-1)}  sx={{width: '8rem'}} >
                                            <AiOutlineRollback  size={'1.5rem'} />
                                            <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                                        </Box>}
                                        
                                        {isSM &&<Box className='mid-btn back-btn' onClick={()=> navigate(-1)}  sx={{width: '7rem', height: '2.25rem'}} >
                                            <AiOutlineRollback  size={'1.5rem'} />
                                            <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                                        </Box>}
                                        
                                    </Box>
                                </Box>
                                {/* Here i want to assgn a vehicle if the vehicle.assigned vehicle.length === 0 */}

                                {assigned?
                                    <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                        {!isSM && <Box className='mid-btn hollow-btn' sx={{width: '8rem',height: '2.5rem'}}>
                                        Filter
                                        </Box>}
                                        {isSM && <Box className='mid-btn hollow-btn' sx={{width: '7rem',height: '2.25rem'}}>
                                            Filter
                                        </Box>}
                                    </Box>
                                    :
                                    <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                        {/* {!isSM && <AssignVehicle />}
                                        {isSM && <AssignVehicle />} */}
                                    </Box>
                                }
                            </Box>
                        </Box>
                        {/* Right bottom body section */}
                        <Box sx={{width: '100%',  mt: '.5rem', borderRadius: '.3rem',}}>
                            {/* the table */}
                            <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.5rem', borderRadius: '.3rem'}}>
                                {/* The left side */}
                                <Box sx={{width: '100%'}}>
                                    <VehicleInformationCard vehicle={vehicle} style={{mb: '.75rem'}} />
                                    {vehicle.assigned_to.map((data, ind)=>{
                                        return (
                                            <VehicleAssigneeCard key={ind} data={data} />
                                        )
                                    })}
                                </Box>
                                {/* the middle */}
                                <Box sx={{width: '100%' , borderRadius: '.3rem', overflowY: 'hidden',mb: '.5rem' }}>
                                    <Typography variant='h4' fontWeight={'500'} mb={'1rem'} textAlign={'center'} sx={{height: '5rem', borderRadius: '.3rem', display: 'flex',alignItems: 'center', justifyContent: 'center', background: 'white'}} >Planned Maintenance Logs</Typography>

                                    <Box sx={{background: 'whitesmoke', overflowY: 'auto', height: 'auto', maxHeight: '151vh', width: '100%'}}>
                                    {presentPlanMaint ? 
                                        <>
                                        {planMaint.map((data, ind)=>{
                                            return (
                                                <VehiclePlannedMaintCard key={ind} data={data}  vehicle={vehicle} />
                                            )
                                        })}
                                        </>
                                        :
                                            <EmptyVehiclePlannedMaintCard />
                                    }
                                    </Box>
                                </Box>
                                {/* the right side */}
                                <Box sx={{width: '100%',borderRadius: '.3rem',mb: '.5rem', overflowY: 'hidden' }}>
                                    <Typography variant='h4' fontWeight={'500'} mb={'1rem'} textAlign={'center'} sx={{height: '5rem', borderRadius: '.3rem', display: 'flex',alignItems: 'center', justifyContent: 'center', background: 'white'}} >UnPlanned Maintenance Logs</Typography>
                                    
                                    <Box sx={{background: 'whitesmoke', overflowY: 'auto', height: 'auto', maxHeight: '151vh',}}>{presentUnPlannedMaint ? 
                                        <>
                                        {unPlannedMaint.map((data, ind)=>{
                                            return(
                                                <VehicleMaintCard  data={data} key={ind} vehicle={vehicle} />
                                            )
                                        })}
                                        </>
                                        :
                                            <EmptyVehicleMaintCard />
                                    }
                                    </Box>
                                </Box>
                            </Box> 
                        </Box>
                    </Grid>
                </Box>
            </Grid> 
            <AlertMessage />
        </Grid>
            :
            <>
        {/* This part shows when vehicle information has not been fetched successfully or when their's network or any error */}
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            {role === "vehicle_coordinator" && <AdminSideBar />}
            {(role === "vehicle_coordinator" && menuIcon) && <AdminSideBarMobile />}

            {role === "maintenance_personnel" && <MaintSideBar />}
            {(role === "maintenance_personnel" && menuIcon) && <MaintSideBarMobile />}

            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                    {/* right top section */}
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                        {/* Right bottom top section */}
                        <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'1rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mb: '2rem' }} >
                                    <Skeleton animation="wave" width={'100%'} height={'5rem'} sx={{mt: '-1rem', mb:'-1rem'}} />
                            </Box>

                            <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                        {!isSM &&<Box className='mid-btn back-btn' onClick={()=> navigate(-1)}  sx={{width: '8rem'}} >
                                            <AiOutlineRollback  size={'1.5rem'} />
                                            <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                                        </Box>}
                                        
                                        {isSM &&<Box className='mid-btn back-btn' onClick={()=> navigate(-1)}  sx={{width: '7rem', height: '2.25rem'}} >
                                            <AiOutlineRollback  size={'1.5rem'} />
                                            <Typography variant='h5' sx={{ml: '.5rem'}}>Back</Typography> 
                                        </Box>}
                                        
                                    </Box>
                                </Box>

                                {assigned?
                                    
                                <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                    {!isSM && <Box className='mid-btn hollow-btn' sx={{width: '8rem',height: '2.5rem'}}>
                                    Filter
                                    </Box>}
                                    {isSM && <Box className='mid-btn hollow-btn' sx={{width: '9rem',height: '2.25rem'}}>
                                        Filter
                                    </Box>}
                                </Box>
                                :
                                <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                    {!isSM && <AssignVehicle />}
                                    {isSM && <AssignVehicle />}
                                </Box>
                                
                                }

                            </Box>
                        </Box>

                        {/* Right bottom body section */}
                        <Box sx={{width: '100%',  mt: '.5rem', borderRadius: '.3rem',}}>
                            {/* the body */}
                            <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.5rem', borderRadius: '.3rem'}}>
                                {/* The left side */}
                                <Box sx={{width: '100%'}}>
                                    <VehicleInformationCard vehicle={vehicle} />
                                    <VehicleAssigneeCard />
                                    <VehicleAssigneeCard />
                                </Box>
                                {/* the middle */}
                                <Box sx={{width: '100%' , borderRadius: '.3rem', overflowY: 'hidden',mb: '.5rem' }}>
                                    <Typography variant='h4' fontWeight={'500'} mb={'1rem'} textAlign={'center'} sx={{height: '5rem', borderRadius: '.3rem', display: 'flex',alignItems: 'center', justifyContent: 'center', background: 'white'}} >Planned Maintenance Logs</Typography>

                                    <Box sx={{background: 'whitesmoke', overflowY: 'auto', height: 'auto', maxHeight: '151vh', width: '100%'}}>
                                    {presentPlanMaint ? 
                                        <>
                                        {planMaint.map((data, ind)=>{
                                            return (
                                                <VehiclePlannedMaintCard key={ind} data={data}  vehicle={vehicle} />
                                            )
                                        })}
                                        </>
                                        :
                                            <SkeletonBox />
                                    }
                                    </Box>
                                </Box>
                                {/* the right side */}
                                <Box sx={{width: '100%',borderRadius: '.3rem',mb: '.5rem', overflowY: 'hidden' }}>
                                    <Typography variant='h4' fontWeight={'500'} mb={'1rem'} textAlign={'center'} sx={{height: '5rem', borderRadius: '.3rem', display: 'flex',alignItems: 'center', justifyContent: 'center', background: 'white'}} >UnPlanned Maintenance Logs</Typography>
                                    
                                    <Box sx={{background: 'whitesmoke', overflowY: 'auto', height: 'auto', maxHeight: '151vh',}}>{presentUnPlannedMaint ? 
                                        <>
                                        {unPlannedMaint.map((data, ind)=>{
                                            return(
                                                <VehicleMaintCard  data={data} key={ind} vehicle={vehicle} />
                                            )
                                        })}
                                        </>
                                        :
                                            <SkeletonBox />
                                    }
                                    </Box>
                                </Box>
                            </Box> 
                        </Box>
                    </Grid>
                </Box>
            </Grid>




            <AlertMessage />
        </Grid>
        </>
        }
            
        </>
    )
}

export default ServiceHistoryReport;