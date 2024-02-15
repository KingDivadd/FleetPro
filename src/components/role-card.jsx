import React, { useRef, useEffect, useState } from "react";
import {Box, CircularProgress, Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { GiHomeGarage } from "react-icons/gi";
import { ChatState } from 'context/chatContext';
import { FaSquareCheck } from "react-icons/fa6";
import BarChart from './bar-chart';
import DoughnutChart from "./donut-chart";
import driver from "../asset/driver.png"
import user from "../asset/user.png"
import maint_personnel from "../asset/maint_personnel.png"
import { FeedBackModal, MaintFeedBackModal, VehicleServiceSeletctStatusModal, SelectMaintStatusModal } from './modal';
import { FaCar } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./snackbar";
import { GoChecklist } from "react-icons/go";
import Skeleton from '@mui/material/Skeleton';
import { useMediaQuery } from '@mui/material';
import MultiSelectDropdown from "./check-box-list";
import { IoIosCloseCircleOutline, IoIosSquareOutline } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";




export default function MaintPersonnel() {
    const {userRole, setUserRole} = ChatState()

    const handleRole = (den)=>{
        setUserRole({boo: false, value: den})
    }
    
    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
    <Card onClick={()=> handleRole("maintenance_personnel")} sx={{ minWidth: '13rem', cursor: 'pointer' }}>
        {!isSM && <CardContent sx={{height: '8rem'}}>
            <Typography variant="h5" fontWeight={'500'}>
                Maintenance Personnel
            </Typography>
            <Typography variant="h6" mt={'.75rem'} fontWeight={'400'} >
                An individual who is trained and skilled in repairing and maintaining vehicles.
            </Typography>            
        </CardContent>}
        
        {isSM && <CardContent sx={{height: 'auto', p: '1.5rem .75rem'}}>
            <Typography variant="h5" fontWeight={'500'} >
                Maintenance Personnel
            </Typography>
            <Typography variant="h6" mt='.5rem' fontWeight={'400'}>
                An individual who is trained and skilled in repairing and maintaining vehicles.
            </Typography>            
        </CardContent>}
        
    </Card>
    );
}

export const DriverCard = ()=>{
    const {userRole, setUserRole} = ChatState()

        const handleRole = (den)=>{
        setUserRole({boo: false, value: den})
        }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
    <Card onClick={()=> handleRole("driver")} sx={{ minWidth: '13rem', cursor: 'pointer' }}>
        {!isSM && <CardContent  sx={{height: '8rem'}}>
        <Typography variant="h5" fontWeight={'500'}>
            Vehicle Driver
        </Typography>
        <Typography variant="h6" mt={'.75rem'} fontWeight={'400'}>
            An individual who operates a vehicle for transportation purpose.
        </Typography>
        
        </CardContent>}

        {isSM && <CardContent sx={{height: 'auto', p: '1.5rem .75rem'}}>
        <Typography variant="h5" fontWeight={'500'} >
            Vehicle Driver
        </Typography>
        <Typography variant="h6" mt={'.5rem'} fontWeight={'400'}>
            An individual who operates a vehicle for transportation purpose.
        </Typography>
        
        </CardContent>}
        
    </Card>
    );
}

export const Assigee = ()=>{
    const {userRole, setUserRole} = ChatState()

    const handleRole = (den)=>{
    setUserRole({boo: false, value: den})
    }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
    <Card onClick={()=> handleRole("vehicle_assignee")} sx={{ minWidth: '13rem', cursor: 'pointer' }}>
        {!isSM && <CardContent  sx={{height: '8rem'}}>
        <Typography variant="h5" fontWeight={'500'}>
            Vehicle Assignee
        </Typography>
        <Typography variant="h6" mt={'.75rem'}  fontWeight={'400'}>
            An individual that legally posseses and has ownership rights over a particular vehicle.
        </Typography>
        
        </CardContent>}
        
        {isSM && <CardContent  sx={{height: 'auto', p: '1.5rem .75rem'}}>
        <Typography variant="h5" fontWeight={'500'}>
            Vehicle Assignee
        </Typography>
        <Typography variant="h6" mt={'.5rem'} fontWeight={'400'} >
            An individual that legally posseses and has ownership rights over a particular vehicle.
        </Typography>
        
        </CardContent>}
        
    </Card>
    );
}

export const DashCard = ({title, value, icon, suffix})=>{

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <>

        
        {!isSM && <Card  sx={{ minWidth: '18rem', height: '6.5rem', cursor: 'pointer' }}>
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',gap: 1.5,  }}>
                <Avatar sx={{ background: '#E8EFFC', color: '#1B61E4', height: '4.5rem', width: '4.5rem', borderRadius: '.3rem'}}> {icon} </Avatar>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start'}}>
                    <Typography variant="h5" fontWeight={'400'} sx={{height: '2.75rem'}}>
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight={'400'}>
                        {value}{suffix}
                    </Typography>

                </Box>
            
            </CardContent>
        
        </Card>}
        {isSM && <Card  sx={{ minWidth: '18rem', height: '5.5rem', cursor: 'pointer' }}>
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',gap: 1.5,}}>
                <Avatar sx={{ background: '#E8EFFC', color: '#1B61E4', height: '3.75rem', width: '3.5rem', borderRadius: '.3rem',mt: '-.2rem' }}> {icon} </Avatar>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start',mt: '-.2rem' }}>
                    <Typography variant="h5" fontWeight={'500'} sx={{height: '2.5rem', fontWeight: '500'}}>
                        {title}
                    </Typography>
                    <Typography variant="h6" fontWeight={'400'} >
                        {value}{suffix}
                    </Typography>

                </Box>
            
            </CardContent>
        
        </Card>}

        </>

    )
}

export const MaintAnalyticsCard = ({})=>{
    const chartRef = useRef(null);
    const [chartDimensions, setChartDimensions] = useState({ width: "20rem", height: "100%" });
    const [width, setWidth] = useState(window.innerWidth)


    useEffect(() => {
        const resizeHandler = () => {
        const parentWidth = chartRef.current?.parentNode.clientWidth;
        const parentHeight = chartRef.current?.parentNode.clientHeight;
        setChartDimensions({ width: parentWidth, height: chartDimensions.height });
        setWidth(window.innerWidth)
        };

        window.addEventListener("resize", resizeHandler);

        // Call resizeHandler once to set initial size
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [width]);
    
    return (
        <Card  sx={{ background: '#FFFFF', cursor: 'pointer',}}>
            <CardContent>
                <Typography variant="h4" mb={'2rem'} fontWeight={'500'} >
                    Maintenance Jobs Analytics
                </Typography>
                <BarChart />
            </CardContent>
        
        </Card>
    )
}

export const ServiceChartCard = ({})=>{

    
    return (
        <Card  sx={{ background: '#FFFFF', cursor: 'pointer', mb: '.75rem' }}>
            <CardContent>
                <Typography variant="h4" mb={'2rem'} fontWeight={'500'} textAlign={'center'} >
                    Maintenance Services Analytics
                </Typography>
                <DoughnutChart />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' , mt: '1rem'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '1rem'}}>
                        <Box sx={{height: '1rem', background: '#1B61E4', width: '2.5rem', borderRadius: '.2rem'}}></Box>
                        <Typography variant='h5' fontWeight={'400'}>Braking System Inspection and Repair</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '1rem'}}>
                        <Box sx={{height: '1rem', background: '#5E90ED', width: '2.5rem', borderRadius: '.2rem'}}></Box>
                        <Typography variant='h5' fontWeight={'400'}>Tire / Wheel Inspection and replacement</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '1rem'}}>
                        <Box sx={{height: '1rem', background: '#0F3A8A', width: '2.5rem', borderRadius: '.2rem'}}></Box>
                        <Typography variant='h5' fontWeight={'400'}>Engine Inspection and Service (Oil Change)</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '1rem'}}>
                        <Box sx={{height: '1rem', background: '#0A275C', width: '2.5rem', borderRadius: '.2rem'}}></Box>
                        <Typography variant='h5' fontWeight={'400'}>Suspension Inspection and replacement</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: '1rem'}}>
                        <Box sx={{height: '1rem', background: '#154EB7', width: '2.5rem', borderRadius: '.2rem'}}></Box>
                        <Typography variant='h5' fontWeight={'400'}>Other Services</Typography>
                    </Box>
                </Box>
            </CardContent>
        
        </Card>
    )
}
export const ActiveAssigneeCard = ({})=>{
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', pb: '-.85rem'}}>
            <CardContent>
                <Typography variant="h4" sx={{mb: '1.5rem', display: 'flex', justifyContent: 'center', fontWeight:'500'}} gutterBottom>
                    Vehicle Owner
                </Typography>
                <Box sx={{backgroundImage: `url(${user})` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',height: '10rem', width: '15rem', borderRadius: '.5rem', m: '0 auto', mb: '1.5rem'}}></Box>
                <Typography variant="h6" component="div" sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{mb: '1rem'}} gutterBottom>
                        { "Isogun Oluwakemi"}
                    </Typography>
                    <Typography variant="h5" sx={{mb: '1rem'}} gutterBottom>
                        {"FUTA/133/2024"}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {"07044907610"}
                    </Typography>
                </Typography>
            
            </CardContent>
        
        </Card>
    )
}
export const ActiveDriverCard = ({info})=>{
    const [show, setShow] = useState(false)
    
    useEffect(() => {
            setShow(true)
    }, [])

    return (
        <>
        {show && <Card  sx={{ background: '#FFFFF', cursor: 'pointer', width: '100%' }}>
            <CardContent>
                <Typography variant="h4" mb={'2rem'} fontWeight={'500'} sx={{ display: 'flex', justifyContent: 'center'}} gutterBottom>
                    Assigned Driver
                </Typography>
                <Box sx={{backgroundImage: `url(${driver})` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',height: '13rem', width: '15rem', borderRadius: '.5rem', m: '0 auto', mb: '1.5rem'}}>
                </Box>

                <Box  sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{mb: '1rem'}} gutterBottom>
                        { info.lastName} {info.firstName}
                    </Typography>
                    <Typography variant="h5" sx={{mb: '1rem'}} gutterBottom>
                        {info.staffId}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {info.phone}
                    </Typography>
                </Box>

            </CardContent>
        
        </Card>}</>
    )
}

export const WorkbayMaintCard = ({data})=>{
    const navigate = useNavigate()
    const services = ['Oil Change', 'Battery Check', 'Suspension Check', 'Tire Check']
    const [vehicle, setVehicle] = useState({})
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
    
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    useEffect(() => {
        fetchVehicle()
    }, [data])

    const fetchVehicle = async()=>{
        try {

            const token = localStorage.getItem('token');
                const fetchedVehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/user-vehicle",
                {},{
                    headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                    }
                }
                );
                setVehicle(fetchedVehicle.data.userVehicle)

            } catch (err) {
                if (!navigator.onLine) {
                    setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
                } else if (err.response) {
                    // Handle server errors
                    setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
                } else {
                    // Handle network errors
                    setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
            }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    
    return (
        
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent sx={{ p: '.5rem', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.25rem'} fontWeight={'500'}>Services</Typography>
                    <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', justifyContent: 'start', gap: '.75rem'}} mb={'1.25rem'}>

                        {data.services.map((data, ind)=>{
                            return(
                                <Box key={ind} className='small-rounded-btn' sx={{height: '2.3rem', p: '0 .5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '.3rem', border: '1px solid gray', width: '15rem'}}>
                                    <Typography variant='h6' fontWeight={'500'}>{data}</Typography>
                                </Box>
                            )
                        })}

                    </Box>
                    <Typography variant='h5' mt={'.2rem'} mb={'.75rem'} fontWeight={'500'}>Concerns</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>
                        {data.concerns}
                    </Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Current Mileage</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{vehicle.current_mileage}km</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Planned Date</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{formatDate(data.proposedDate)}</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Maintenance Personnel</Typography>
                    <Typography variant='h5' fontWeight={'400'}>Engr Oladimaji</Typography>
            </CardContent>
            <AlertMessage />
        </Card>
    )
}



export const StatusCard = ({data})=>{
    const [status, setStatus] = useState('completed')

    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} >Vehicle Maintenance Status</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',gap: '1.5rem', width: '100%'}}>
                    
                    {!isSM && <Box className={data.status === "pending" ? "pending-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><MdOutlinePendingActions size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Pending</Typography>
                    </Box>}                    
                    
                    {isSM && <Box className={data.status === "pending" ? "pending-stat stat":"stat"} sx={{height: '2.25rem'}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '1.75rem', borderRadius: '.3rem' }}><MdOutlinePendingActions size={'1.35rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Pending</Typography>
                    </Box>}                    
                    
                    {!isSM && <Box className={data.status === "accepted" ? "accepted-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><GoChecklist size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Accepted</Typography>
                    </Box>}                    

                    {isSM && <Box className={data.status === "accepted" ? "accepted-stat stat":"stat"} sx={{height: '2.25rem'}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '1.75rem', borderRadius: '.3rem' }}><GoChecklist size={'1.35rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Accepted</Typography>
                    </Box>}                    

                    {!isSM && <Box className={data.status === "in-shop"?"in-shop-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}> <GiHomeGarage size={'1.5rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Shop</Typography>
                    </Box> }                   

                    {isSM && <Box className={data.status === "in-shop"?"in-shop-stat stat":"stat"} sx={{height: '2.25rem'}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '1.75rem', borderRadius: '.3rem' }}> <GiHomeGarage size={'1.4rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Shop</Typography>
                    </Box> }                   

                    {!isSM && <Box className={data.status === "in-progress"?"in-progress-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}> <GrInProgress size={'1.3rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Progress</Typography>
                    </Box>}                    

                    {isSM && <Box className={data.status === "in-progress"?"in-progress-stat stat":"stat"} sx={{height: '2.25rem'}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '1.75rem', borderRadius: '.3rem' }}> <GrInProgress size={'1.2rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Progress</Typography>
                    </Box>}                    

                    {!isSM && <Box className={data.status === "completed"?"completed-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{ display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}> <FaSquareCheck size={'1.4rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Completed</Typography>
                    </Box> }
                
                    {isSM && <Box className={data.status === "completed"?"completed-stat stat":"stat"} sx={{height: '2.25rem'}}>
                        <Box className={''} sx={{ display: 'flex', alignItems: 'center',  height: '100%', width: '1.75rem', borderRadius: '.3rem' }}> <FaSquareCheck size={'1.37rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Completed</Typography>
                    </Box>} 
                

                </Box>
            
            </CardContent>
        
        </Card>
    )
}


export const FeedbackCard = ({})=>{
        
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', }}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Personnel Feedback</Typography>
                    
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Vehicle Type</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>Car</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Repair Done</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>No report available.</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Repair done</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>No reports available</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Completion Date</Typography>
                    <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>31 January, 2024</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Image Report</Typography>
                    <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar> 
                    <FeedBackModal />
            </CardContent>
        
        </Card>
    )
}

export const ReportCardSkeleton = ()=>{

    return (
        <Card  sx={{ minWidth: '15rem', cursor: 'pointer', p: '0' }}>
            <CardContent sx={{p: '0 .5rem'}}>
                <Skeleton animation="wave" width={'100%'} height={'10rem'} sx={{mt: '-.75rem', mb: '-.75rem'}} />

                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'flex-start', mb: '-.85rem', gap: '.75rem'}}>
                        <Skeleton animation="wave" width={'100%'} height={'4rem'} sx={{mt: '-.75rem', mb: '-.75rem'}} />
                        <Skeleton animation="wave" width={'100%'} height={'4rem'} sx={{mt: '-.75rem', mb: '-.75rem'}} />

                </Box>
            </CardContent>
        
        </Card>
    )
}

export const ReportCard = ({data})=>{

    return (
        <Card  sx={{ minWidth: '15rem', cursor: 'pointer', p: '0' }}>
            <CardContent sx={{p: '0 .5rem'}}>
                <Box sx={{backgroundImage: `url(${data.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '.3rem',
                    mb: '1rem',
                    mt: '.5rem',
                    height: '8rem',
                    }}>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'flex-start', mb: '-.85rem'}}>
                    <Typography variant={'h6'} fontWeight={'400'} mb={'.5rem'} >Incident Location</Typography>
                    <Typography variant={'h6'} fontWeight={'500'} mb={'.5rem'} >{data.location}</Typography>

                    <Typography variant={'h6'} fontWeight={'400'} mb={'.5rem'} >Description</Typography>
                    <Typography variant={'h6'} fontWeight={'500'}  >{data.description}</Typography>
                </Box>
            </CardContent>
        
        </Card>
    )
}


export const LandingPageCard = ({title, note})=>{

        const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
        const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
        const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
        const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
    <Card sx={{ width: '100%', cursor: 'pointer' }}>
        {!isSM && <CardContent>
            <Typography variant="h3" fontWeight={'600'} gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" fontWeight={'500'} mt={'.75rem'} lineHeight={'1.65rem'} component="div">
                {note}
            </Typography>
        
        </CardContent>}
        
        {isSM && <CardContent>
            <Typography variant="h4" fontWeight={'500'} gutterBottom>
                {title}
            </Typography>
            <Typography variant="h6" fontWeight={'400'} mt={'.75rem'} lineHeight={'1.65rem'} component="div">
                {note}
            </Typography>
        
        </CardContent>}
        
    </Card>
    );
}


export const MaintDashCard = ({title, value, icon, suffix})=>{

    
    return (
        <Card  sx={{ minWidth: '18rem', height: '6.5rem', cursor: 'pointer' }}>
            <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',gap: 1.5,  }}>
                <Avatar sx={{ background: '#E8EFFC', color: '#1B61E4', height: '4.5rem', width: '4.5rem', borderRadius: '.3rem', }}> {icon} </Avatar>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start',}}>
                    <Typography variant="h5" component="div" sx={{height: '2.75rem', fontWeight: '500'}}>
                        {title}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {value}{suffix}
                    </Typography>

                </Box>
            
            </CardContent>
        
        </Card>
    )
}


export const MaintPersonnelCard = ({info})=>{
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
    },[])
    
    return (

        <>
        {show && <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', pb: '-.85rem'}}>
            <CardContent>
                <Typography variant="h4" sx={{mb: '1.5rem', display: 'flex', justifyContent: 'center', fontWeight:'500',}} gutterBottom>
                    Maintenance Personnel
                </Typography>
                <Box sx={{backgroundImage: `url(${maint_personnel})` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',height: '10rem', width: '15rem', borderRadius: '.5rem', m: '0 auto', mb: '1.5rem'}}></Box>
                <Typography variant="h6" component="div" sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{mb: '1rem'}} gutterBottom>
                        {info.lastName} {info.firstName}
                    </Typography>
                    <Typography variant="h5" sx={{mb: '1rem'}} gutterBottom>
                        {info.staffId}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {info.phone}
                    </Typography>
                </Typography>
            
            </CardContent>
        
        </Card>}
        </>
    )
}


export const UpcomingWorksCard = ({})=>{

    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h4" fontWeight={'500'} sx={{mb: '1.5rem'}} >
                    Upcoming Works
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', mb: '.5rem'}}>
                    <Typography variant="h5" fontWeight={'600'} component="div">Maintenance</Typography>
                    <Typography variant="h5"  fontWeight={'600'} component="div">Date</Typography>
                </Box>
                
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
                <Box sx={{height: '2.25rem' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray'}}>
                    <Typography variant="h5" fontWeight={'400'} component="div">Services</Typography>
                    <Typography variant="h5"  fontWeight={'400'} component="div">31 Jan, 2024</Typography>
                </Box>
            
            </CardContent>
        
        </Card>
    )
}



export const MaintReportCard = ({})=>{
        
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', }}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'2rem'} fontWeight={'500'} textAlign={'center'} >Maintenance Report</Typography>
                    
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Service(s) Done</Typography>
                    <input className='input  search-input' name = {"username"} value={""} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', marginBottom: '1.5rem'}}/>

                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Service Description</Typography>
                    <input className='input  search-input' name = {"username"} value={""} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', marginBottom: '1.5rem'}}/>
                    
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Completion Date</Typography>
                    <input className='input  search-input' name = {"username"} value={"Select date"} onChange={(e)=> handleChange(e) }type="date" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray',  marginBottom: '1.5rem'}}/>

                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Image Report</Typography>
                    <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar> 

                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: '2rem', gap: '1rem'}}>
                        <Box className="mid-btn back-btn" sx={{width: '11rem'}}>
                            <Typography variant='h5' >Edit</Typography>
                        </Box>
                        <Box className="mid-btn primary-btn" sx={{ width: '11rem'}}>
                            <Typography variant='h5'>Submit</Typography>
                        </Box>
                    </Box>

            </CardContent>
        
        </Card>
    )
}

export const MaintStatusCard = ()=>{


    useEffect(() => {
        
    }, [status])
    return (
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} >Vehicle Maintenance Status</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',gap: '1.5rem', width: '100%'}}>
                    
                    <Box className={status === "pending" ? "pending-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><MdOutlinePendingActions size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Pending</Typography>
                    </Box>                    

                    <GoChecklist id={'accepted'} classname={'accepted-stat stat'} name={'accepted'} title={"Vehicle Status: Accepted"} icon={<GiHomeGarage size={'1.5rem'} />} />

                    <SelectMaintStatusModal id={'in-shop'} classname={'in-shop-stat stat'} name={'In Shop'} title={"Vehicle Status: In Shop"} icon={<GiHomeGarage size={'1.5rem'} />} />

                    <SelectMaintStatusModal id={'in-progress'} classname={'in-progress-stat stat'} name={'In Progress'} title={"Vehicle Status: In Progress"} icon={<GrInProgress size={'1.3rem'} />} />

                    <SelectMaintStatusModal id={'completed'} classname={'completed-stat stat'} name={'Completed'} title={"Vehicle Status: Completed"} icon={<FaSquareCheck size={'1.4rem'} />} />                   

                </Box>
            
            </CardContent>
        
        </Card>
    )
}


export const MaintFeedbackCard = ({})=>{
        
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', }}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'}>Maintenance Report</Typography>
                    
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Vehicle Type</Typography>
                    <Typography variant='h6' mb={'1.25rem'} fontWeight={'500'}>Car</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Repair Done</Typography>
                    <Typography variant='h6' mb={'1.25rem'} fontWeight={'500'}>No report available.</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Repair done</Typography>
                    <Typography variant='h6' mb={'1.25rem'} fontWeight={'500'}>No reports available</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Completion Date</Typography>
                    <Typography variant='h6' mb={'1.25rem'} fontWeight={'500'}>31 January, 2024</Typography>
                    <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Image Report</Typography>
                    <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar> 
                    <MaintFeedBackModal />
            </CardContent>
        
        </Card>
    )
}


export const VehicleServiceMaintStatusCard = ({data})=>{
    const [statusModal, setStatusModal] = useState(false)
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(data.status)

    useEffect(() => {
        if(data){
            setStatus(data.status);
            setShow(true)};
    }, [data])

    const handleStatus = (fish)=>{
        setStatus(fish)
        if(statusModal){
            setStatusModal(false)
        }
        if (!statusModal){
            setStatusModal(true)
        }
    }
    
    return (
        <>
        {show?
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} textAlign={'center'} >Current Maintenance Status</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',gap: '1.5rem', width: '100%'}}>
                    
                    <Box className={status === "pending" ? "pending-stat stat":"stat"} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><MdOutlinePendingActions size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Pending</Typography>
                    </Box>                    
                    
                    <Box className={status === "accepted" ? "accepted-stat stat":"stat"} onClick={()=> handleStatus('accepted')}  sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><GoChecklist size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Accepted</Typography>
                    </Box>                    

                    <Box className={status === "in-shop" ? "in-shop-stat stat":"stat"} onClick={()=> handleStatus('in-shop')} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><GiHomeGarage size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Shop</Typography>
                    </Box>                    

                    <Box className={status === "in-progress" ? "in-progress-stat stat":"stat"} onClick={()=> handleStatus('in-progress')} sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><GiHomeGarage size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">In Progress</Typography>
                    </Box>                    

                    <Box className={status === "completed" ? "completed-stat stat":"stat"}onClick={()=> handleStatus('completed')}  sx={{}}>
                        <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}><FaSquareCheck size={'1.6rem'} /> </Box>
                        <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">Completed</Typography>
                    </Box>                                     

                </Box>
            
                {statusModal && <VehicleServiceSeletctStatusModal newStatus={status} res={data} statusModal={statusModal} />}
            </CardContent>
        
        </Card>
        :
        <Card  sx={{ width: '100%', cursor: 'pointer', mt: '.75rem'}}>
            <CardContent sx={{ }}>
                <Typography variant='h4' fontWeight={'500'} mb={'2rem'} >Current Maintenance Status</Typography>
                <Box>
                    <Skeleton animation="wave" width={'100%'} height={'5rem'} sx={{mt: '-1rem', mb: '-1rem'}} />
                    <Skeleton animation="wave" width={'100%'} height={'5rem'} sx={{mt: '-1rem', mb: '-1rem'}} />
                </Box>
            
            </CardContent>
        
        </Card>}

        </>
    )
}



export const VehicleServiceMaintReportCard = ({data})=>{
    const [showReport, setShowReport] = useState(false)
    const [serv, setServ] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [index, setIndex] = useState([])
    const [report, setReport] = useState(false)
    const [showDrop, setShowDrop] = useState(false)
    const [maintReport, setMaintReport] = useState({services: [], issues: "", date: "", image: ""})
    const {setOpenAlert, setAlertMsg, setAlertSeverity, personnelReport, setPersonnelReport} = ChatState()
    const services = ['Oil Change', 'Brake Inspension and Repair', 'Tire replacement', 'Suspension Inspection/Repair', 'Engine Check', 'AC Inspection/Repair', 'Head Lamp Replacement', 'Tracficator(s) Replacement' ]
        
    useEffect(()=>{
        if(data._id){
            setShowReport(true)
            setMaintReport({...maintReport, issues: data.personnelFeedback.issues, date: data.personnelFeedback.completion_date, services: data.personnelFeedback.services})
            setServ(data.personnelFeedback.repair_done)
            if (data.personnelFeedback.images){
                setMaintReport({...maintReport, image: data.personnelFeedback.images[0]})
            }
        }
    },[data])

    

    const showInfoPage = ()=>{
        setReport(false)
    }

    const showFeedbackPage = ()=>{
        setReport(true)
    }

    const handleSubmit = ()=>{
        setLoading(true)
        if(!maintReport.issues || !maintReport.services.length || !maintReport.date){
            setOpenAlert(true); setAlertSeverity("warning"); setAlertMsg("Please fill all fields."); setLoading(false)
        }else{
            updateMaintLog()
        }
    }

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setMaintReport({...maintReport, [name]: value})
    }

    const updateMaintLog = async()=>{
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            if (token === null){navigate('/login')}
                const maint_id = data._id
                const issues = maintReport.issues
                const repair_done = maintReport.services
                const completion_date = maintReport.date
                const box = []
                const images = box.push(maintReport.image)

                const updateMaint = await axios.patch("https://futa-fleet-guard.onrender.com/api/maint-log/maintenance-feedback",
                {maint_id, issues, repair_done, completion_date, images},{
                    headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                    }
                }
                );
                setAlertMsg("Maintenance report has been created successfully"); setOpenAlert(true); setAlertSeverity('success');setLoading(false);
                setMaintReport({services: [], issues: "", date: "", image: ""}); setReport(false)
                if (personnelReport){setPersonnelReport(false)}
                if (!personnelReport){setPersonnelReport(true)}

        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);setLoading(false);
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true);setLoading(false);
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true);setLoading(false);
            }
        }
    }

    const handleDropdown = ()=>{
        if (showDrop){setShowDrop(false)}
        if (!showDrop){setShowDrop(true)}
    }

    const handleDroplist = (data, ind)=>{
        const services = maintReport.services
        if(services.includes(data)){
            const newServices = services.filter((res)=> res !== data)
            setMaintReport({...maintReport, services: newServices})
        }else{
        services.push(data)
        setMaintReport({...maintReport, services: services})
        }
    }

    const handleRemoveService = (data)=>{
        const newServices = maintReport.services.filter((res)=> res !== data)
        setMaintReport({...maintReport, services: newServices})
    }

    const {images, repair_done, issues, completion_date, concerns } = data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    
    return (
        <Card  sx={{ background: '#FFFFF' , width: '100%', cursor: 'pointer', }}>
            <CardContent sx={{ p: '.5rem', pb: '0', borderRadius: '.5rem' }}>
                    <Box  mb={'1.5rem'} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
                        <Box  onClick={()=>showInfoPage()} sx={{width: '100%'}}>
                            <Box className="mid-btn hollow-btn" sx={{height: '2.25rem', width: 'fit-content', padding: '0 .5rem'}}>
                                <Typography variant={'h5'}>View Report</Typography>
                            </Box>
                        </Box>
                        <Box  onClick={()=>showFeedbackPage()} sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <Box className="mid-btn hollow-btn" sx={{height: '2.25rem', width: 'fit-content', padding: '0 .5rem'}}>
                                <Typography variant={'h5'}>Edit Report</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {report ? 

                    <Box>
                        <Typography variant='h4' mb={'2rem'} fontWeight={'500'} textAlign={'center'} >Maintenance Reports</Typography>
                        
                        {/* The is a drop down with a list of things done */}
                        <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Service Description</Typography>
                        <textArea className='input  search-input' name = {"issues"} value={maintReport.issues} onChange={(e)=> handleChange(e) } type="text" cols={'30'} rows={'10'} style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', marginBottom: '1.5rem', resize: 'none'}} />

                        <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Service(s) Done</Typography>

                        {maintReport.services.length > 0 && 
                        <Box sx={{ maxHeight: '11rem',p: '.5rem', borderRadius: '.3rem', mb: '.75rem', border: '1px solid gray', overflowY: 'auto'}}>
                            {maintReport.services.map((data, ind)=>{
                                return(
                                    <Box key={ind} className={'small-rounded-btn'}>
                                        <Box onClick={()=>handleRemoveService(data)} className={'service-icon'} sx={{display: 'flex', alignItems: 'center', height: '100%', mr: '.5rem', cursor: 'pointer'}}><IoIosCloseCircleOutline size={'1.2rem'} /> </Box>
                                        <Typography variant='h6'>{data}</Typography> 
                                    </Box>
                                )
                            })}
                        </Box>}

                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >Select services</Typography>
                                {!showDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>
                            {showDrop && 
                            <Box className="cont-abs">
                                {services.map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        {(maintReport.services.includes(data)) ? <IoIosCheckboxOutline size={'1.25rem'} />:
                                        <IoIosSquareOutline size={'1.5rem'} />}
                                        <Typography variant={'h5'} fontWeight={'500'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                        
                        <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Completion Date</Typography>
                        <input className='input  search-input' name = {"date"} value={maintReport.date} onChange={(e)=> handleChange(e) }type="date" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray',  marginBottom: '1.5rem'}}/>

                        <Typography variant='h5' mb={'.75rem'} fontWeight={'400'}>Image Report</Typography>
                        <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar> 

                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: '2rem', gap: '1rem'}}>
                            <Box className="mid-btn back-btn" sx={{width: '11rem', height: '2.25rem'}}>
                                <Typography variant='h5' >Clear</Typography>
                            </Box>
                            <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}  sx={{ textTransform: 'none', width: '8rem', display: 'flex', positoin: 'relative' , height: '2.5rem'}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Submit</Typography> : ''}
                        </Box>
                        </Box>
                    </Box>
                        :
                    <Box>
                    {showReport ? 
                        <Box>
                            <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'} textAlign={'center'} >Maintenance Report</Typography>
                        
                            <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Vehicle Owner Complain</Typography>
                            <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{data.concerns}</Typography>

                            <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Service Description</Typography>
                            <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{data.personnelFeedback.issues}</Typography>

                            <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Service(s) Done</Typography>
                                {data.personnelFeedback.repair_done.length &&  
                                <Box sx={{minHeight: '0', height:'fit-content', borderRadius: '.3rem', border: '1px solid gray', p: '.5rem',mb: '1rem'}} >
                                {serv.map((den, ind)=>{
                                    return(
                                        <Box key={ind} className={'small-rounded-btn'}>
                                            <Typography variant='h5' fontWeight={'400'} >{den}</Typography> 
                                        </Box>
                                        )
                                    })}
                                </Box>}
                            <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Completion Date</Typography>
                            <Typography variant='h5' mb={'1.25rem'} fontWeight={'400'}>{formatDate(data.personnelFeedback.completion_date)}</Typography>

                            <Typography variant='h5' mb={'.75rem'} fontWeight={'500'}>Image Report</Typography>
                            <Avatar sizes='10rem' sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar /> </Avatar> 
                            <MaintFeedBackModal />
                        </Box>
                        :
                        <Box>
                            <Typography variant='h4' mb={'1.5rem'} fontWeight={'500'} textAlign={'center'} >Fetching Maintenance Report</Typography>
                        
                            <Skeleton animation='wave' width={'100%'} sx={{height: '5rem', mt: '-.75rem', mb: '-.75rem'}} />
                            <Skeleton animation='wave' width={'100%'} sx={{height: '5rem', mt: '-.75rem', mb: '-.75rem'}} />
                            <Skeleton animation='wave' width={'100%'} sx={{height: '10rem', mt: '-.75rem', mb: '-.75rem'}} />
                        </Box>
                        }
                    </Box>}


            <AlertMessage />

            </CardContent>
        
        </Card>
    )
}