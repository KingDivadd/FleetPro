import React, { useRef, useEffect, useState } from "react";
import {Box, useMediaQuery} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import admin from '../../asset/assignee.png'
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import Avatar from '@mui/material/Avatar';
import { FaCar } from "react-icons/fa6";
import { Skeleton } from "@mui/material";
import { ChatState } from "context/chatContext";
import AlertMessage from "components/snackbar";
import axios from 'axios';
import { FaCarAlt } from "react-icons/fa";
import { GiHomeGarage } from 'react-icons/gi';
import { TbProgress } from "react-icons/tb";
import { PersonnelFeedBackModal } from "./modal";
import { PlannersFeedBackModal } from "./modal";
import { useNavigate } from "react-router-dom";

export default function ActiveAdminCard ({}){
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', pb: '-.85rem', mb: '.5rem'}}>
            <CardContent>
                <Typography variant="h4" sx={{mb: '1.5rem', display: 'flex', justifyContent: 'center', fontWeight:'400'}} gutterBottom>
                    Admin Personnel
                </Typography>
                <Box sx={{backgroundImage: `url(${admin})` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',height: '10rem', width: '15rem', borderRadius: '.5rem', m: '0 auto', mb: '1.5rem'}}></Box>
                {/* <Avatar sizes='10rem' sx={{ m: 1,  background: '#1B61E4', color: 'white', height:'7rem', width: '9rem', borderRadius: '.3rem',m: '0 auto' , mb: '1.5rem'}}> <img src={david} alt="" /> </Avatar> */}
                <Typography variant="h6" component="div" sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{mb: '1rem'}} gutterBottom>
                        { "Iroegbu David"}
                    </Typography>
                    <Typography variant="h5" sx={{mb: '1rem'}} gutterBottom>
                        {"FUTA/12/2022"}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {"09026030392"}
                    </Typography>
                </Typography>
            
            </CardContent>
        
        </Card>
    )
}

export const VehicleInformationCard = ({vehicle})=>{
    const [show, setShow] = useState(false)
    const services = ['Oil Change', 'Battery Check', 'Suspension Check', 'Tire Check']
    
    useEffect(() => {
        if (navigator.onLine && vehicle.brand){
            setShow(true)
        }else{
            setShow(false)
        }
    }, [navigator.onLine])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };
    
    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <>
        {show ?
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.75rem', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.25rem'} fontWeight={'500'} textAlign={'center'}>Vehicle Information</Typography>

                    
                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-between' ,gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Brand:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.brand}</Typography>
                    </Box>

                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Name:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_name}</Typography>
                    </Box>

                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Plate No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.plate_no}</Typography>
                    </Box>

                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Engine No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.engine_no}</Typography>
                    </Box>

                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Chasis No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.chasis_no}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Fuel Type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.fuel_type}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Vehicle Color:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_color}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Manufacture Year:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.manufacture_year}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Transmission type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.transmission}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Added on:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{formatDate(vehicle.createdAt)}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>


                    <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar>

            </CardContent>
        
        </Card>
        :
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.5rem', borderRadius: '.5rem' }}>
                <Typography variant='h4'fontWeight={'500'}>Vehicle Information</Typography>

                <Skeleton animation="wave" width={'100%'} height={'17.5rem'} sx={{mt: '-1.5rem', mb:'-1.5rem'}} />

                <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCarAlt /> </Avatar>

            </CardContent>
        
        </Card>
        }
        </>

    )
}

export const VehicleStatusCard = ({vehicle})=>{
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(false)
    const {updateVehicle, setUpdateVehicle} = ChatState()

    useEffect(() => {
        if (vehicle._id){
            setShow(true)
            if (navigator.onLine){
                fetchVehicleAssigneeStatus()
            }
        }
    }, [updateVehicle])

    const fetchVehicleAssigneeStatus = async()=>{
        const token = sessionStorage.getItem('token')
        const vehicle_id = vehicle._id
        try {
            const registeredVehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/user-vehicle", {vehicle_id}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(registeredVehicle.data.userVehicle.assigned_to)
            if (registeredVehicle.data.userVehicle.assigned_to.length){
                console.log('already assigned')
                setStatus("completed")
            }
            if (!registeredVehicle.data.userVehicle.assigned_to.length){
                console.log('not assigned')
                setStatus("pending")
            }

        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            }
        }
    }

    return (
        <>
        {show ?
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} >Vehicle Assignment Status</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',gap: '1.5rem', width: '100%'}}>
                    
                    <Box className={status === 'pending'? "pending-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><MdOutlinePendingActions size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Not Assigned</Typography>
                    </Box>                    


                    <Box className={status === 'completed' ?"completed-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{ display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}> <FaSquareCheck size={'1.4rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Assigned</Typography>
                    </Box> 
                

                </Box>
            
            </CardContent>
        
        </Card>
        :
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} >Vehicle Assignment Status</Typography>
                <Skeleton width={'100%'} height={'12rem'} sx={{mt: '-1.5rem', mb: '-1.5rem'}} />
            </CardContent>
        
        </Card>
        
        }</>
    )
}


export const VehicleAssigneeCard = ({data})=>{
        const [show, setShow] = useState(false)
        const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
        const [Driver, setDriver] = useState("")
        const [user, setUser] = useState({})
        const [assignee, setAssignee] = useState(true)

        useEffect(() => {
            if(!navigator.onLine){
                setOpenAlert(true); setAlertMsg("Network Error."); setAlertSeverity("warning"); setShow(false);
            }else{
                fetchUsers(data)
            }
        }, [navigator.onLine])

        const fetchUsers = async(data)=>{
            try {
                const getUser = await axios.post("https://futa-fleet-guard.onrender.com/api/user/one-user", {user_id: data}, {
                headers: {
                    "Content-Type":  "Application/json",
                }
            });
            setUser(getUser.data.user); setShow(true)
            } catch (err) {
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

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', mb: '.75rem', mt: '.75rem' }}>
            <CardContent sx={{ p: '.75rem', borderRadius: '.5rem' }}>
                    {show ?
                    <>
                        {user.role !== "driver" && <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Vehicle Assignee</Typography>}
                        {user.role === "driver" && <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Vehicle Driver</Typography>}
                        {/* so basically i want to */}
                        {assignee ?<>
                            <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'400'}>Last Name:</Typography>
                                <Typography variant='h5' fontWeight={'500'}>{user.lastName}</Typography>
                            </Box>
                            
                            <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'400'}>First Name:</Typography>
                                <Typography variant='h5' fontWeight={'500'}>{user.firstName}</Typography>
                            </Box>
                            
                            <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'400'}>Email:</Typography>
                                <Typography variant='h5' fontWeight={'500'}>{user.email}</Typography>
                            </Box>
                            
                            <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'400'}>Phone:</Typography>
                                <Typography variant='h5' fontWeight={'500'}>{user.phone}</Typography>
                            </Box>
                            
                            <Box mt={'.2rem'} mb={'.5rem'} sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'400'}>Role:</Typography>
                                {user.role === "driver" && <Typography variant='h5' fontWeight={'500'}>Vehicle Driver</Typography>}
                                {user.role === "vehicle_assignee" && <Typography variant='h5' fontWeight={'500'}>Vehicle Assignee</Typography>}
                                {user.role === "maintenance_personnel" && <Typography variant='h5' fontWeight={'500'}>Maintenance Personnel</Typography>}
                                {user.role === "vehicle_coordinator" && <Typography variant='h5' fontWeight={'500'}>Admin Personnel</Typography>}
                            </Box>
                        </>
                        :
                        <>
                            <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <Typography variant='h5' fontWeight={'500'}>No user is assigned to this vehicle.</Typography>
                            </Box>
                            
                            
                        </>}
                        
                    </>
                        :
                    <>
                        <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Vehicle Assignee</Typography>
                        <Skeleton width={'100%'} height={'12rem'} sx={{mt: '-1.5rem', mb: '-1.25rem'}} />
                    </>}

            </CardContent>
            <AlertMessage />
        </Card>
    )
}

export const VehicleDriverCard = ({})=>{
        
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Assigned Driver</Typography>
                    
                    <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Last Name:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Oyenuga</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>First Name:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Emmanuel</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'1.25rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Email:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>oyenuga.dgit@gmail.com</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Phone:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>0902600392</Typography>
                    </Box>

            </CardContent>
        
        </Card>
    )
}

export const VehicleMaintCard = ({vehicle})=>{
    const [plan_maint, setPlan_maint] = useState([])
    const [maintLogPresent, setMaintLogPresent] = useState(false)
    const [maint_logs, setMaint_logs] = useState([])
    const {updateVehicle, setUpdateVehicle} =ChatState()

    useEffect(()=> {
        if (vehicle._id){
            console.log(vehicle.maint_logs, vehicle.planned_maint)
            setMaint_logs(vehicle.maint_logs)
            setPlan_maint(vehicle.planned_maint)
            if(plan_maint.length || maint_logs.length){
                setMaintLogPresent(true)
            }else{
                setMaintLogPresent(false)
            }

            console.log('latest planned maint', plan_maint[plan_maint.length - 1])

        }
    }, [updateVehicle])

    function findClosestPlanMaintDateItem(items) {
    const presentDate = new Date(); // Current date and time
    let closestItem = null;
    let closestDiff = Infinity;

    for (const item of items) {
        console.log(item)
        const itemDate = new Date(item.createdAt);
        const diff = Math.abs(itemDate - presentDate);
        
        if (diff < closestDiff) {
            closestDiff = diff;
            closestItem = item;
        }
    }

    return closestItem;
    }

    
    
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer',m: '.75rem 0',}}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.25rem'} fontWeight={'500'}>Last Maintenance Log</Typography>

                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Date:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>27 Jan, 2024</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Issue(s)</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Brake pressure is was low and an unwanted noise from the rear suspension</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Services</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Brake Inspection/Repair</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>cost</Typography>
                        <Typography variant='h5' fontWeight={'500'}>12,000</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Personnel In Charge</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Eng Oladimeji</Typography>
                    </Box>

            </CardContent>
        
        </Card>
        

    )
}

export const EmptyVehicleMaintCard = ()=>{
    
    return (
        <Card  sx={{ background: 'white' , width: '100%', cursor: 'pointer', mt: '.75rem', }}>
            <CardContent sx={{ p: '0 .75rem', pb: '0', pt: '1.25rem', borderRadius: '.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20rem'}}>
                    <Typography variant="h5" textAlign={'center'}  fontWeight={'500'}>No Maintenance log has been created yet.</Typography>
                </Box>
            </CardContent>
        
        </Card>
    )
}


export const VehiclePlannedMaintCard = ({data})=>{
    
        
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };
    
    const {concerns, createdAt, maint_id, personnelFeedback, plannedBy, proposedDate, services, status, vehicle, plannersFeedback} = data
    return (
    
        <Card  sx={{ background: 'white' , width: '100%', cursor: 'pointer', mt: '.75rem',}}>
            <CardContent sx={{ p: '0 .75rem', pb: '0', pt: '1.25rem', borderRadius: '.5rem' }}>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '1.25rem'}}>
                        <Typography variant='h5' fontWeight={'600'}>{maint_id}</Typography>

                    
                        {status === 'pending' && <Box className={ "stat"} sx={{width: '8.5rem',height: '2rem', justifyContent: 'center'}}>
                            <MdOutlinePendingActions size={'1.35rem'} color={'#FF571A'} />
                            <Typography variant="h5" fontWeight={'500'}  component="div">Pending</Typography>
                        </Box>}

                        {status === 'accepted' && <Box className={ "stat"} sx={{width: '9rem',height: '2rem', justifyContent: 'center'}}>
                                <MdOutlinePendingActions size={'1.35rem'} color={'orange'} /> 
                                <Typography variant="h5" fontWeight={'500'}  component="div">Accepted</Typography>
                            </Box>}

                        {status === 'in-shop' && <Box className={'stat'} sx={{width: '9rem', height: '2rem',p: '0 .5rem', justifyContent: 'center' }}>
                            <GiHomeGarage size={'1.3rem'} color={'#1B61E4'} />
                            <Typography variant="h5" fontWeight={'500'} component="div">In Shop</Typography>
                        </Box>}

                        {status === 'in-progress' && <Box className={'stat'} sx={{width: '10rem', height: '2rem',p: '0 .5rem', justifyContent: 'center' }}>
                            <TbProgress size={'1.3rem'} color={'orange'} />
                            <Typography variant="h5" fontWeight={'500'} component="div">In Progress</Typography>
                        </Box>}
                        {status === 'completed' && <Box className={"stat"} sx={{width: '9rem', height: '2rem',}}>
                        <FaSquareCheck size={'1.2rem'} color={'gree'} />
                        <Typography variant="h5" fontWeight={'500'}  component="div">Completed</Typography>
                            </Box>}
                    </Box>
                    <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Proposed Date</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{formatDate(proposedDate)}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Concerns</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{concerns}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Services</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{services}</Typography>
                    </Box>
                    
                    <Box mt={'.2rem'} mb={'.85rem'}  sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.7rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Supervised By</Typography>
                        <Typography variant='h5' fontWeight={'500'}>Adebisi Oladimeji</Typography>
                    </Box>
                    
                    <PersonnelFeedBackModal data={personnelFeedback} />
                    {plannersFeedback && <PlannersFeedBackModal data={plannersFeedback} />}


            </CardContent>
        
        </Card>

    )
}

export const EmptyVehiclePlannedMaintCard = ()=>{
    
    return (
        <Card  sx={{ background: 'white' , width: '100%', cursor: 'pointer', mt: '.75rem',}}>
            <CardContent sx={{ p: '0 .75rem', pb: '0', pt: '1.25rem', borderRadius: '.5rem', display: 'grid', placeItems: 'center' }}>
                <Box sx={{width: '100%', height: '20rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h5" fontWeight={'500'} textAlign='center' >No Planned Maintenance log has been created yet.</Typography>
                </Box>
            </CardContent>
        
        </Card>
    )
}
export const SkeletonBox = ()=>{
    
    return (
        <Card  sx={{ background: 'white' , width: '100%', cursor: 'pointer', mt: '.75rem',}}>
            <CardContent sx={{ p: '0 .75rem', pb: '0', pt: '1.25rem', borderRadius: '.5rem' }}>

                    <Box mt={'.2rem'} mb={'.85rem'} >
                        <Skeleton animation='wave' width={'100%'} height={'10rem'} sx={{mt: '-1.5rem', mb: '-1.5rem'}} />
                        <Skeleton animation='wave' width={'100%'} height={'10rem'} sx={{mt: '-1.5rem', mb: '-1.5rem'}} />
                    </Box>

            </CardContent>
        
        </Card>
    )
}



export const VehicleServiceVehicleCard = ({vehicle})=>{
    const [show, setShow] = useState(false)
    const services = ['Oil Change', 'Battery Check', 'Suspension Check', 'Tire Check']
    
    useEffect(() => {
        if(vehicle._id){
            setShow(true)
        }
    }, [vehicle])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };
    
    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <>
        {show ?
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.75rem', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.25rem'} fontWeight={'500'} textAlign={'center'} >Vehicle Information</Typography>

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', alignItems: 'center',justifyContent: 'flex-start' ,gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Brand:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.brand}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-between' ,gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Brand:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.brand}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Name:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_name}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Name:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_name}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Engine No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.engine_no}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Engine No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.engine_no}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Chasis No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.chasis_no}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Chasis No:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.chasis_no}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Fuel Type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.fuel_type}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Fuel Type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.fuel_type}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Vehicle Color:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_color}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Vehicle Color:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.vehicle_color}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Manufacture Year:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.manufacture_year}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Manufacture Year:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.manufacture_year}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Transmission type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.transmission}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Transmission type:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.transmission}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Added on:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{formatDate(vehicle.createdAt)}</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Added on:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{formatDate(vehicle.createdAt)}</Typography>
                    </Box>}

                    {!isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '4rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>}
                    {isLG && <Box mt={'.2rem'} mb={'1rem'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        <Typography variant='h5' fontWeight={'400'}>Current Mileage:</Typography>
                        <Typography variant='h5' fontWeight={'500'}>{vehicle.current_mileage}M</Typography>
                    </Box>}


                    <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar>

            </CardContent>
        
        </Card>
        :
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.5rem', borderRadius: '.5rem' }}>
                <Typography variant='h4'fontWeight={'500'} textAlign={'center'} >Vehicle Information</Typography>

                <Skeleton animation="wave" width={'100%'} height={'17.5rem'} sx={{mt: '-1.5rem', mb:'-1.5rem'}} />

                <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCarAlt /> </Avatar>

            </CardContent>
        
        </Card>
        }
        </>

    )
}


export const VehicleServiceWorkbayMaintCard = ({data})=>{
    const navigate = useNavigate()
    const [hide, setHide] = useState(true)
    const services = ['Oil Change', 'Battery Check', 'Suspension Check', 'Tire Check']
    const [vehicle, setVehicle] = useState({})
    const [maint, setMaint] = useState({})
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
    
    
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    useEffect(() => {
        if (data._id){
            setMaint(data)
            setHide(false)
        }
    }, [data])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    
    return (
        
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.5rem', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.25rem'} fontWeight={'500'} textAlign={'center'} >Maintenance Log</Typography>

                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Created On</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{formatDate(maint.createdAt)}</Typography>

                    <Typography variant='h5' mb={'1rem'} fontWeight={'500'}>Services</Typography>
                    <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', justifyContent: 'start', gap: '.75rem'}} mb={'1.25rem'}>

                        {!hide &&
                        <>
                            {maint.services.map((data, ind)=>{
                                return(
                                    <Box key={ind} className='small-rounded-btn' sx={{height: '2.25rem', width: 'fit-content', p: '0 .5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '.3rem', border: '1px solid gray', width: '15rem'}}>
                                        <Typography variant='h5' fontWeight={'400'}>{data}</Typography>
                                    </Box>
                            )
                            })}
                        </>}
                    </Box>

                    <Typography variant='h5' mt={'.2rem'} mb={'.75rem'} fontWeight={'500'}>Concerns</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>
                        {maint.concerns}
                    </Typography>

                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Planned Date</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{formatDate(maint.proposedDate)}</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Maintenance Supervisor</Typography>
                    <Typography variant='h5' fontWeight={'400'}>Engr Oladimaji</Typography>
            </CardContent>
            <AlertMessage />
        </Card>
    )
}

export const VehicleAssigneeCardEmpty = ({vehicle})=>{
        const [show, setShow] = useState(false)
        const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
        const [Driver, setDriver] = useState("")
        const [user, setUser] = useState({})
        const [assignee, setAssignee] = useState(true)

        useEffect(() => {
            if (!vehicle.assigned_to.length){
                setShow(true)
            }
        }, [navigator.onLine])

        

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <>
        {[1,2].map((data, ind)=>{
            return(
                <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', mb: '.75rem' }}>
                    <CardContent sx={{ p: '.75rem', borderRadius: '.5rem' }}>
                        <Box sx={{height: '10rem', display: 'grid', placeItems: 'center', mb: '.75rem'}}>
                            <Typography variant='h5' fontWeight={'500'}>Vehicle Not assied yet.</Typography>
                        </Box>
                    </CardContent>
                    <AlertMessage />
                </Card>
            )
        })}        
        </>
    )
}