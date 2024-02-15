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
import { VehicleInformationCard, VehicleStatusCard, VehicleAssigneeCard, VehicleAssigneeCardEmpty, VehicleDriverCard, VehicleMaintCard } from 'components/admin-component/card';
import MenuBar from 'components/menu-bar';
import { AiOutlineRollback } from "react-icons/ai";
import { FaSquareCheck } from "react-icons/fa6";
import AlertMessage from 'components/snackbar';
import { MdOutlinePendingActions } from "react-icons/md";
import { AssignVehicle } from 'components/admin-component/modal';



const VehicleReport = ()=>{
    const navigate = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity, updateVehicle, setUpdateVehicle} = ChatState()
    const [vehicle, setVehicle] = useState([])
    const [show, setShow] = useState(false)
    const [assigned, setAssigned] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [menuIcon, setMenuIcon] = useState(false)
    const [role, setRole] = useState("")


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
    }, [width, updateVehicle])

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
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
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
                                        Export
                                        </Box>}
                                        {isSM && <Box className='mid-btn hollow-btn' sx={{width: '7rem',height: '2.25rem'}}>
                                            Export
                                        </Box>}
                                    </Box>
                                    :
                                    <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                        {!isSM && <AssignVehicle vehicle={vehicle} />}
                                        {isSM && <AssignVehicle vehicle={vehicle} />}
                                    </Box>
                                }
                            </Box>
                        </Box>

                        <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.5rem'}}>
                            {/* the table */}
                            <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.75rem'}}>
                                {/* The left side */}
                                <Box sx={{width: '100%'}}>
                                    <VehicleInformationCard vehicle={vehicle} />
                                    <VehicleStatusCard  vehicle={vehicle}/>
                                </Box>
                                {/* the right side */}
                                <Box sx={{width: '100%'}}>
                                    {vehicle.assigned_to.length ? <>
                                        {vehicle.assigned_to.map((data, ind)=>{

                                            return (
                                                <VehicleAssigneeCard key={ind} data={data} />
                                            )
                                        })}
                                    </>:<VehicleAssigneeCardEmpty vehicle={vehicle} /> }

                                    {/* <VehicleMaintCard  vehicle={vehicle} /> */}
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
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                        <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'1rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
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
                                    Export
                                    </Box>}
                                    {isSM && <Box className='mid-btn hollow-btn' sx={{width: '9rem',height: '2.25rem'}}>
                                        Export
                                    </Box>}
                                </Box>
                                :
                                <Box sx={{width: '100%', height: '100%',display: 'flex', justifyContent: 'flex-end'}}>
                                    {!isSM && <AssignVehicle vehicle={vehicle} />}
                                    {isSM && <AssignVehicle vehicle={vehicle} />}
                                </Box>
                                
                                }

                            </Box>
                        </Box>

                        <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.5rem'}}>
                            {/* the table */}
                            <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between', gap: '.75rem'}}>
                                {/* The left side */}
                                <Box sx={{width: '100%'}}>
                                    <VehicleInformationCard vehicle={vehicle} />
                                    <VehicleStatusCard  vehicle={vehicle}/>
                                </Box>
                                {/* the right side */}
                                <Box sx={{width: '100%'}}>
                                    <VehicleAssigneeCard />
                                    <VehicleAssigneeCard />
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

export default VehicleReport