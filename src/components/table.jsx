import  {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {MaintHisModal } from './modal'
import { UpdateDailyLogModal } from './modal';
import Skeleton from '@mui/material/Skeleton';
import AlertMessage from './snackbar';



export default function Tables(){

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h4" fontWeight={'500'}>Maintenacne ID</Typography>
            <Typography variant="h4" fontWeight={'500'}>Concern</Typography>
            <Typography variant="h4" fontWeight={'500'}>Mileage (km)</Typography>
            <Typography variant="h4" fontWeight={'500'}>Personnel In-Charge</Typography>
            <Typography variant="h4" fontWeight={'500'}>Status</Typography>
        </Box>
    )
}
// export function TableBody(){

//     return (
//         <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
//             <Typography variant="h5" fontWeight={'400'}>FUTAWORK/0001</Typography>
//             <Typography variant="h5" fontWeight={'400'}>Service required</Typography>
//             <Typography variant="h5" fontWeight={'400'}>1,200(km)</Typography>
//             <Typography variant="h5" fontWeight={'400'}>Engr Obsanjo</Typography>
//             <Typography variant="h5" fontWeight={'400'}>In Shop</Typography>
//         </Box>
//     )
// }

const sample = [
    ['FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Shop'],
    ['FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Shop'],
    ['FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Shop'],
    ['FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Shop'],
    ['FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Shop'],
];

// function createData(id, maint, concerns, mileage, supervisor, cost, status) {
//     return { id, maint, concerns, mileage, supervisor, cost, status };
// }
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    cursor: 'pointer',
}));

function createData(date,maint, concern, mileage, supervisor, cost, status) {
    return {date, maint, concern, mileage, supervisor, cost, status };
}

const rows = [
    createData('23 Feb, 2024','FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'Pnding'),
    createData('22 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'Pending'),
    createData('20 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'Pending'),
    createData('19 Feb, 2024','FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'Pending'),
    createData('18 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Progress'),
    createData('17 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'In Progress'),
    createData('16 Feb, 2024','FUTAWORK/0001', "Service required", '1,200km', "Engr Osasona", "12,000", 'Completed'),
    createData('15 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'Completed'),
    createData('14 Feb, 2024','FUTAWORK/0002', "Service required", '1,200km', "Engr Osasona", "12,000", 'Completed'),

    
    ];

export function PlannedMaintTables() {
    const navigate = useNavigate()
    const {planMaintInput, setPlanMaintInput, setOpenAlert, setAlertMsg, setAlertSeverity, newPlannedMaint, setNewPlannedMaint} = ChatState()
    const [planMaintTable, setPlanMaintTable] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [vehicle_id, setVehicle_id] = useState("")

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (userInfo === null){
            navigate('/login')
        }else{
            setUser(userInfo.loggedInUser)
            if(!navigator.onLine){
                setAlertMsg("Network Error!!!"); setAlertSeverity("warning"); setOpenAlert(true)
            }else if (navigator.onLine){
                const user = JSON.parse(sessionStorage.getItem('userInfo'))
                let vehicle;
                if (user.loggedInUser.role !== 'driver'){
                    vehicle = user.loggedInUser.vehicle
                    if (vehicle === null || vehicle === undefined){
                        setOpenAlert(true); setAlertMsg("No vehicle is assiged to you yet"); setAlertSeverity('warning')
                    }else{
                        setVehicle_id(vehicle)
                        fetchTableInfo(vehicle)
                    }
                }
                else if (user.loggedInUser.role === 'driver'){
                    let owner = user.vehicle_assignee
                    vehicle = owner.vehicle
                    if (vehicle === null || vehicle === undefined){
                        setOpenAlert(true); setAlertMsg("No vehicle is assiged to you yet"); setAlertSeverity('warning')
                    }else{
                        setVehicle_id(vehicle)
                        fetchTableInfo(vehicle)
                    }

                }
            }
        }
    }, [planMaintInput, newPlannedMaint])

    const fetchTableInfo = async(vehicle) =>{
        try {
            const token = sessionStorage.getItem('token')
            if(token === null){
                navigate('/login')
            }
            const table = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/all-planned-maint", {vehicle}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setUser(table.data.allPlannedMaint)
            setPlanMaintTable(table.data.allPlannedMaint)
            setLoading(false)
            setShow(true)
            clearInterval(fetchTableInfo)
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

    const fetchUserInfo = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token === null){ navigate('/login')}
                const userInfo = await axios.post("https://futa-fleet-guard.onrender.com/api/user/find-user",
                {},
                {
                    headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                    }
                }
                );
                const user = userInfo.data.loggedInUser
                const vehicle = user.vehicle
                clearInterval(fetchUserInfo)
                try {
                    const token = sessionStorage.getItem('token')
                    if(token === null){
                        navigate('/login')
                    }
                    const table = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/all-planned-maint", {vehicle}, {
                        headers: {
                            "Content-Type":  "Application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    setPlanMaintTable(table.data.allPlannedMaint)
                    setLoading(false)
                    setShow(true)
                    clearInterval(fetchUserInfo)
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
            };

    const handleClick = (row, ind)=>{ 
        sessionStorage.setItem("workbayRow", JSON.stringify(row))
        navigate(`./${row.maint_id.toLowerCase()}`)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };

    return (
        <>
            {!show ?  
                <TableContainer component={Paper} sx={{height: '100%' ,maxHeight: '35rem'}}>
                    <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell><Typography variant='h5' fontWeight={'500'}>Maixntenance Id</Typography> </StyledTableCell>
                            <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Concerns</Typography></StyledTableCell>
                            <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Personnel In Charge</Typography></StyledTableCell>
                            <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Planned Date</Typography></StyledTableCell>
                            <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Status</Typography></StyledTableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        
                        {[1,2,3,4,5,6,7,8,9,0].map((row, ind) => {
                            return (
                            <StyledTableRow key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(row, ind)} >
                                <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                            </StyledTableRow>
                            )
                        })}

                        </TableBody>
                    </Table>
                    </TableContainer>
            :
            <>
                {planMaintTable.length ? 
                    <TableContainer component={Paper} sx={{height: '100%' ,maxHeight: '35rem'}}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'500'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}}>Maintenance Id</Typography> </StyledTableCell>
                            <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'500'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}}>Concerns</Typography></StyledTableCell>
                            <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'500'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}}>Personnel In Charge</Typography></StyledTableCell>
                            <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'500'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}}>Planned Date</Typography></StyledTableCell>
                            <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'500'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}}>Status</Typography></StyledTableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        
                        {planMaintTable.map((row, ind) => {
                            const {proposedDate, services, personnel, status, maint_id} = row
                            return (
                            <StyledTableRow key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(row, ind)} >
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{maint_id}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{services[0]}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{"Oladimeji Adebisi"}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{formatDate(proposedDate)}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{status}</Typography></StyledTableCell>
                            </StyledTableRow>
                            )
                        })}

                        </TableBody>
                    </Table>
                    </TableContainer>
            :
            <Box sx={{height: '31.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    
                <Typography variant='h3' fontWeight={'500'} textAlign={'center'} >
                    Click the plan maintenance button to plan a maintenance
                </Typography>
            </Box>
            }
            </>
            
            }
        </>
    );
}

const StyledTableCellVlog = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRowVlog = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    cursor: 'pointer',
}));

function createVlogData(id,date, startingLocation, endingLocation, route, startingMileage, endingMileage, fuelLevel, createdBy) {
    return { id,date, startingLocation, endingLocation, route, startingMileage, endingMileage, fuelLevel, createdBy };
}

export function DriverLogTable() {
    const navigate = useNavigate()
    const [dailyLog, setDailyLog] = useState([])
    const {setOpenAlert, setAlertMsg, setAlertSeverity, planMaintInput, newDailyLog} = ChatState()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [clickedData, setClickedData] = useState([])


    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if(userInfo === null){
            navigate('/login')
        }else{
            setUser(userInfo)
            if(!navigator.onLine){
                setAlertMsg("Network Error"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            }else{
                fetchTableInfo()
            }
        }
    }, [planMaintInput, newDailyLog])

    const fetchTableInfo = async() =>{
        try {
                const start_date =""
                const end_date = ""
                const filter = ""
                    const token = sessionStorage.getItem('token')
                    if(token === null){
                        navigate('/login')
                    }
                    const table = await axios.post("https://futa-fleet-guard.onrender.com/api/drivers-log/all-logs", {start_date, end_date, filter}, {
                        headers: {
                            "Content-Type":  "Application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    setDailyLog(table.data.dailyLogs)
                    setShow(true)
                    clearInterval(fetchTableInfo)
                } catch (err) {
                    console.log(err)
                    if(!navigator.onLine){
                    setAlertMsg(err.message); setAlertSeverity('warning'); setOpenAlert(true); setShow(false)
                    }else{
                        setAlertMsg(err.response.data.err); setAlertSeverity('warning'); setOpenAlert(true); setShow(false)
                    }
                }
    }

    const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token ===  null){
                    navigate('/login')
                }
                const userInfo = await axios.post(
                "https://futa-fleet-guard.onrender.com/api/user/find-user",
                {},
                {
                    headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                    }
                }
                );

                const user = userInfo.data.loggedInUser
                const vehicle = user.vehicle
                try {
                    const token = sessionStorage.getItem('token')
                    if(token === null){
                        navigate('/login')
                    }
                    const table = await axios.post("https://futa-fleet-guard.onrender.com/api/drivers-log/all-logs", {vehicle}, {
                        headers: {
                            "Content-Type":  "Application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    console.log(table.data.dailyLogs)
                    setDailyLog(table.data.dailyLogs)
                    setShow(false)
                    clearInterval(fetchUserInfo)
                } catch (err) {
                    console.log(err)
                    if(!navigator.onLine){
                    setAlertMsg(err.message); setAlertSeverity('warning'); setOpenAlert(true); setShow(true)
                    }else{
                        setAlertMsg(err.response.data.err); setAlertSeverity('warning'); setOpenAlert(true); setShow(true)
                    }
                }
            } catch (err) {
                console.log(err)
                if(!navigator.onLine){
                    setAlertMsg(err.message); setAlertSeverity('warning'); setOpenAlert(true); setShow(true)
                }else{
                    setAlertMsg(err.response.data.err); setAlertSeverity('warning'); setOpenAlert(true); setShow(true)
                }
            }
            };

    const handleClick = (row)=>{
        if (showModal){setShowModal(false)}
        if (!showModal){setShowModal(true)}
        setClickedData(row)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };

    return (
    <>
            {show ? <>
            {dailyLog.length ?
            <TableContainer component={Paper} sx={{height: '100%', maxHeight: '35rem'}}>
                <Table sx={{ minWidth: 1100 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCellVlog><Typography variant='h5' fontWeight={'500'}>Date</Typography> </StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Log Time</Typography></StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Current Location</Typography></StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Starting Mileage</Typography></StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Ending Mileage</Typography></StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Starting Fuel Level</Typography></StyledTableCellVlog>
                        <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Ending Fuel Level</Typography></StyledTableCellVlog>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dailyLog.map((row, ind)=>{
                        const {_id, createdAt, logTime, addedBy, vehicle, currentLocation, startingMileage, endingMileage, startingFuelLevel, endingFuelLevel} = row
                        return (
                            <StyledTableRowVlog key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(row, ind)} >
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{formatDate(createdAt)}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{logTime}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{currentLocation}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{Number(startingMileage).toLocaleString()}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{Number(endingMileage).toLocaleString()}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{startingFuelLevel}</Typography></StyledTableCell>
                                <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{endingFuelLevel}</Typography></StyledTableCell>
                            </StyledTableRowVlog>

                        )
                    })}

                    </TableBody>
                    
                </Table>
                <AlertMessage />
                <UpdateDailyLogModal showModal={showModal} log={clickedData} />
            </TableContainer>
            :
            <Box sx={{height: '32rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h3' fontWeight={'500'} >
                    Click on the create log button to add the daily vehicle usage log.
                </Typography>
            </Box>

            }
            </>
                :
            <>
                <TableContainer component={Paper} sx={{height: '100%', maxHeight: '35rem'}}>
                    <Table sx={{ minWidth: 1100 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCellVlog><Typography variant='h5' fontWeight={'500'}>Date</Typography> </StyledTableCellVlog>

                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Log Time</Typography></StyledTableCellVlog>
                            
                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Current Location</Typography></StyledTableCellVlog>

                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Starting Mileage</Typography></StyledTableCellVlog>

                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Ending Mileage</Typography></StyledTableCellVlog>

                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Starting Fuel Level</Typography></StyledTableCellVlog>

                            <StyledTableCellVlog ><Typography variant='h5' fontWeight={'500'}>Ending Fuel Level</Typography></StyledTableCellVlog>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {[1,2,3,4,5,6,7,8,9,10].map((row, ind)=>{
                            return (
                                <StyledTableRowVlog key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(row, ind)} >
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                    <StyledTableCell size='small' ><Skeleton animation="wave" width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                                </StyledTableRowVlog>

                            )
                        })}

                        </TableBody>
                        
                    </Table>
                    <AlertMessage />
                </TableContainer>
            </>}
            <AlertMessage />
    </>
    )
}


function createMaintData(date, maint_id, concern,services, personnel, status) {
    return {date, maint_id, concern, services, personnel, status };
}

const maintRows = [
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),
    createMaintData('01 Feb, 2024' ,'FUTAWORK/0001', "Service required","Brake Repair", "Engr Osasona", 'In Shop'),

    ];

export function VehicleServiceTables() {
    const [show, setShow] = useState(false)
    const [plannedMaint, setPlannedMaint] = useState([])
    const navigate = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userInfo'))
        if (user === null){navigate('/login')}
        if (navigator.onLine){
            allVehiclesPlannedMaint()
        }
    }, [])

    const allVehiclesPlannedMaint = async()=>{
        
        try {
            const start_date =""
            const end_date = ""
            const status = ""
                const token = sessionStorage.getItem('token')
                if(token === null){
                    navigate('/login')
                }
                const table = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/all-vehicles-planned-maint", {start_date, end_date, status}, {
                    headers: {
                        "Content-Type":  "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                setPlannedMaint(table.data.allVehiclesPlannedMaint)
                setShow(true)
            } catch (err) {
                console.log(err)
                if(!navigator.onLine){
                setAlertMsg(err.message); setAlertSeverity('warning'); setOpenAlert(true); setShow(false)
                }else{
                    setAlertMsg(err.response.data.err); setAlertSeverity('warning'); setOpenAlert(true); setShow(false)
                }
            }
    
    }

    const handleClick = (data)=>{
        navigate(`./${data._id}`)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
        };
    return (
        <>
        {show ?
        <TableContainer component={Paper} sx={{height: '100%', maxHeight: '35rem'}}>
        <Table sx={{ minWidth: 1150 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell><Typography variant='h5' fontWeight={'500'}>Maintenance Id</Typography> </StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Concerns</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Repair Area(s)</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Planned Date</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Status</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Maint. Supervisor</Typography></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {plannedMaint.map((data, ind) => {
                const {maint_id, concerns,services, personnel,proposedDate, status,_id } = data
                return (
                <StyledTableRow key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(data)} >
                    <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{maint_id}</Typography></StyledTableCell>
                    <StyledTableCell size='small' ><Typography variant='h5'  noWrap  fontWeight={'400'} sx={{ maxWidth: '15rem'}}>{concerns} </Typography></StyledTableCell>
                    <StyledTableCell size='small' ><Typography variant='h5' noWrap fontWeight={'400'} sx={{ maxWidth: '15rem'}} >{services}</Typography></StyledTableCell>
                    <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{formatDate(proposedDate)}</Typography></StyledTableCell>
                    <StyledTableCell size='small' ><Typography variant='h5' className={`${status}`} fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{status}</Typography></StyledTableCell>
                    <StyledTableCell size='small' ><Typography variant='h5' fontWeight={'400'} sx={{height: '2rem', display: 'flex', alignItems: 'center'}} >{personnel}</Typography></StyledTableCell>
                </StyledTableRow>
                )
            })}
            </TableBody>
        </Table>
        </TableContainer>
        :
        <TableContainer component={Paper} sx={{height: '100%', maxHeight: '35rem'}}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell><Typography variant='h5' fontWeight={'500'}>Maintenance Id</Typography> </StyledTableCell>
                    <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Concerns</Typography></StyledTableCell>
                    <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Repair Area(s)</Typography></StyledTableCell>
                    <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Planned Date</Typography></StyledTableCell>
                    <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Status</Typography></StyledTableCell>
                    <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Maint. Supervisor</Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {[1,2,3,4,5,6,7,8,9,10].map((row, ind) => {
                    return (
                    <StyledTableRow key={ind} sx={{cursor: 'pointer'}} onClick={()=> handleClick(row, ind)} >
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                        <StyledTableCell size='small' ><Skeleton animation="wave"  width={'100%'} sx={{mt: '-.7rem', mb: '-.7rem', height: '3.5rem', display: 'flex', alignItems: 'center'}} /></StyledTableCell>
                    </StyledTableRow>
                    )
                })}
            </TableBody>
        </Table>
        <AlertMessage />
        </TableContainer>
        }
        </>
    );
}



function createMaintLog(date, maint_id, concern, personnel, cost) {
    return {date, maint_id, concern, personnel, cost };
}

const maintLogRows = [
    createMaintLog('02 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '12,000'),
    createMaintLog('04 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '20,000'),
    createMaintLog('05 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '13,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '15,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '12,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '20,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '13,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '15,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '12,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '20,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '13,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '15,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '12,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '20,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '13,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '15,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '12,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '20,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '13,000'),
    createMaintLog('01 Feb, 2024' ,'FUTAWORK/0001', "Service required", "Engr Osasona", '15,000'),
    ];

export function MaintLogTable() {
    const {showHis, setShowHis, maintData, setMaintData} = ChatState()
    const navigate = useNavigate()
    
    const handleClick = (row)=>{
        console.log(row)
        setMaintData(row)
        setShowHis(true)
    }
    return (
        <TableContainer component={Paper} sx={{height: '100%', maxHeight: '35rem'}}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell><Typography variant='h5' fontWeight={'500'}>Date</Typography> </StyledTableCell>
                <StyledTableCell><Typography variant='h5' fontWeight={'500'}>Maintenance Id</Typography> </StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Concerns</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Supervisor</Typography></StyledTableCell>
                <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Cost</Typography></StyledTableCell>
                {/* <StyledTableCell ><Typography variant='h5' fontWeight={'500'}>Status</Typography></StyledTableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            
            {maintLogRows.map((row, ind) => {
                const {date, maint_id, concern, personnel, cost } = row
                return (
                <StyledTableRow key={ind} sx={{cursor: 'pointer'}} style={{ height: '2rem' }} onClick={()=> handleClick(row)} >
                    <StyledTableCell  style={{ height: '2rem' }}><Typography variant='h5' fontWeight={'400'}>{date}</Typography></StyledTableCell>
                    <StyledTableCell  style={{ height: '2rem' }}><Typography variant='h5' fontWeight={'400'}>{maint_id}</Typography></StyledTableCell>
                    <StyledTableCell style={{ height: '2rem' }}><Typography variant='h5' fontWeight={'400'}>{concern}</Typography></StyledTableCell>
                    <StyledTableCell  style={{ height: '2rem' }}><Typography variant='h5' fontWeight={'400'}>{personnel}</Typography></StyledTableCell>
                    <StyledTableCell style={{ height: '2rem' }}><Typography variant='h5' fontWeight={'400'}>{cost}</Typography></StyledTableCell>
                    {/* <StyledTableCell ><Typography variant='h5' fontWeight={'400'}>{status}</Typography></StyledTableCell> */}
                </StyledTableRow>
                )
            })}
            </TableBody>
        </Table>

        {showHis && <MaintHisModal />}

        </TableContainer>
    );
}