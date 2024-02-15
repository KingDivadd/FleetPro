import * as React from 'react';
import { useState, useEffect } from 'react';
import {Box, useMediaQuery} from '@mui/material';
import { ChatState } from 'context/chatContext';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../index.css"
import AlertMessage from '../components/snackbar'
import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { GoStarFill, GoStar } from "react-icons/go";
import MenuItem from '@mui/material/MenuItem';
import { IoIosCheckboxOutline, IoIosCloseCircleOutline, IoIosSquareOutline } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FaLessThanEqual } from 'react-icons/fa6';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '.3rem'
};
const styleMobile = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '.3rem'
};
const planMaintStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '.3rem'
};
const planMaintStyleMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '.3rem'
};

const reportStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '.3rem',
    outline: 'none', 
};
const reportStyleMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '.3rem',
    outline: 'none', 
};

const styleVlog = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '.3rem'
};

const styleVlogMobile = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '.3rem'
};




export default function PlanMaintenance() {
    const [open, setOpen] = React.useState(false);
    const [maintLog, setMaintLog] = useState({vehicle:'', concerns: '', services: [], date: ''})
    const [submit, setSubmit] = useState(false)
    const [openServices, setOpenServices]= useState(false)
    const {setAlertMsg, setOpenAlert, setAlertSeverity,newPlannedMaint, setNewPlannedMaint} = ChatState()
    const [loading, setLoading] = useState(false)
    const [showDrop, setShowDrop] = useState(false)
    const navigate = useNavigate()
    const [modalStyle, setModalStyle] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)


    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    const services = ['Oil Change', 'Brake Inspension and Repair', 'Tire replacement', 'Suspension Inspection/Repair', 'Engine Check', 'AC Inspection/Repair', 'Head Lamp Replacement', 'Tracficator(s) Replacement' ]
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
    window.addEventListener('resize', resize)
        if (width <= 599 ){
            setModalStyle(true)
        }
        if (width > 599){
            setModalStyle(false)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [width])


    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setMaintLog({...maintLog, [name]: value})
    }

    const handleSubmit = async()=>{
        setLoading(true)
            if (!navigator.onLine){
                setAlertMsg("Network Error !!!"); setAlertSeverity("warning"); setOpenAlert(true);
            }else if(navigator.onLine){
                const token = sessionStorage.getItem('token')
                if(token === null){
                    navigate('/login')
                }
                try {
                    const user = await axios.post("https://futa-fleet-guard.onrender.com/api/user/find-user", {}, {
                        headers: {
                            "Content-Type":  "Application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const vehicle_id = user.data.loggedInUser.vehicle
                    setMaintLog({...maintLog, vehicle: vehicle_id})
                    clearInterval(handleSubmit)

                    try {
                        const vehicle = vehicle_id
                        const concerns = maintLog.concerns
                        const services = maintLog.services
                        const proposedDate = maintLog.date

                        const maint = await axios.post("https://futa-fleet-guard.onrender.com/api/maint-log/plan-maint", {vehicle, concerns, services, proposedDate}, {
                        headers: {
                            "Content-Type":  "Application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                        if(newPlannedMaint){setNewPlannedMaint(false)}
                        if (!newPlannedMaint){setNewPlannedMaint(true)}
                        setMaintLog({vehicle:'', concerns: '', services: [], date: ''})
                        handleClose()
                        clearInterval(handleSubmit)
                        setLoading(false)
                    } catch (err) {
                        if (!navigator.onLine) {
                            setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
                        } else if (err.response) {
                            setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false)
                        } else {
                            setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false)
                        }
                    }

                } catch (err) {
                    if (!navigator.onLine) {
                        setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
                        // setInterval(handleSubmit, 3000)
                    } else if (err.response) {
                        // Handle server errors
                        setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
                    } else {
                        // Handle network errors
                        setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
                    }
                }
            }
        
    }
    
    const handleServices = ()=>{
        if(openServices){setOpenServices(false)}
        if(!openServices){setOpenServices(true)}
    }
    const handleServiceSelect =(data)=>{
        const services = maintLog.services
        if(services.includes(data)){
            const newServices = services.filter((res)=> res !== data)
            setMaintLog({...maintLog, services: newServices})
        }else{
        services.push(data)
        setMaintLog({...maintLog, services: services})
        }
    }
    const handleDropdown = ()=>{
        if (showDrop){setShowDrop(false)}
        if (!showDrop){setShowDrop(true)}
    }

    const handleDroplist = (data, ind)=>{
        const services = maintLog.services
        if(services.includes(data)){
            const newServices = services.filter((res)=> res !== data)
            setMaintLog({...maintLog, services: newServices})
        }else{
        services.push(data)
        setMaintLog({...maintLog, services: services})
        }
    }

    const handleRemoveService = (data)=>{
        const newServices = maintLog.services.filter((res)=> res !== data)
        setMaintLog({...maintLog, services: newServices})
    }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '13rem' }} >
                <Typography variant='h5'>Plan Maintenance</Typography> 
            </Box>}

            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '11rem', height: '2.25rem' }} >
                <Typography variant='h5'>Plan Maintenance</Typography> 
            </Box>}

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle ? planMaintStyleMobile : planMaintStyle }>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h4"  fontWeight={'500'}>Plan new Maintenance</Typography>
                    </Box>

                    <Box sx={{mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Concerns</Typography>
                        <textarea cols={'30'} rows={'10'} className='input' name = {"concerns"} value={maintLog.concerns} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'4.5rem', background: "white", color: 'black', resize: 'none'}}/>
                    </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Services</Typography>
                        <Box  sx={{ position: 'relative'}}>
                            {maintLog.services.length > 0 && 
                        <Box sx={{ maxHeight: '11rem',p: '.5rem', borderRadius: '.3rem', mb: '.75rem', border: '1px solid gray', overflowY: 'auto'}}>
                            {maintLog.services.map((data, ind)=>{
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
                                        {(maintLog.services.includes(data)) ? <IoIosCheckboxOutline size={'1.25rem'} />:
                                        <IoIosSquareOutline size={'1.5rem'} />}
                                        <Typography variant={'h5'} fontWeight={'500'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                        </Box>
                    </Box>

                    <Box sx={{mt: 3, zIndex: '2'}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Date</Typography>
                        <input className='input' name = {"date"} value={maintLog.date} onChange={(e)=> handleChange(e) } type="date" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        {!isSM && <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '9rem', display: 'flex' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>}

                        {isSM && <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '7rem', display: 'flex', height: '2.25rem' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>}

                        {!isSM && <Box disabled={loading} type="submit" className='mid-btn primary-btn' onClick={(e)=>handleSubmit(e)}  fullWidth  sx={{height: '2.5rem', textTransform: 'none', position: 'relative', width: '9rem',}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Plan Maint</Typography> : ''}
                        </Box>}

                        {isSM && <Box disabled={loading} type="submit" className='mid-btn primary-btn' onClick={(e)=>handleSubmit(e)}  fullWidth  sx={{height: '2.25rem', textTransform: 'none', position: 'relative', width: '7rem',}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Plan Maint</Typography> : ''}
                        </Box>}

                    </Box>
                </Box>
            </Modal>
            <AlertMessage />
        </div>
    );
}


export function CreateLogModal() {
    const [createLog, setCreateLog] = useState({vehicle_id: '', logTime: 'Select log time.', currentLocation: '', startingMileage: '', endingMileage: '', startingFuelLevel: 'Select fuel level', endingFuelLevel: 'Select fuel level' })
    const [logTime, setLogTime] = useState(false)
    const [startingFuel, setStartingFuel] = useState(false)
    const [endingFuel, setEndingFuel] = useState(false)
    const [openServices, setOpenServices]= useState(false)
    const [loading, setLoading] = useState(false)
    const {setOpenAlert, setAlertMsg, setAlertSeverity, newDailyLog, setNewDailyLog} = ChatState()
    const [showLogDrop, setShowLogDrop] = useState(false)
    const [showMFuelDrop, setShowMFuelDrop] = useState(false)
    const [showEFuelDrop, setShowEFuelDrop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
    
        window.addEventListener('resize', resize)
        if (width <= 599 ){
            setModalStyle(false)
        }
        if (width > 599){
            setModalStyle(true)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [width])

    const [age, setAge] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if (name === "startingMileage" || name === "endingMileage"){
            const newValue = value.replace(/,/g, '')
            setCreateLog({...createLog, [name]: newValue})
        }else{
            setCreateLog({...createLog, [name]: value})
        }
        
    }

    const handleSubmit = async(e)=>{
        // e.preventDefault()
        setLoading(true)
        if (!navigator.onLine){ 
            setAlertMsg("Network Error!!!"); setAlertSeverity('warning'); setOpenAlert(true); setLoading(false);
        }
        else{
            try {
            const token = localStorage.getItem('token');
            if (token === null){navigate('/login')}
            const user = JSON.parse(sessionStorage.getItem('userInfo'))
            if (user=== null){navigate('/login')}

            const vehicle = JSON.parse(sessionStorage.getItem('userInfo')).loggedInUser.vehicle
            setCreateLog({...createLog, vehicle_id: vehicle })

            const logInfo = await axios.post("https://futa-fleet-guard.onrender.com/api/drivers-log/new-log", {vehicle_id: createLog.vehicle_id, currentLocation: createLog.currentLocation, startingMileage: createLog.startingMileage, endingMileage: createLog.endingMileage, startingFuelLevel: createLog.startingFuelLevel, endingFuelLevel: createLog.endingFuelLevel, logTime: createLog.logTime}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setLoading(false)
            setOpenAlert(true); setAlertMsg(logInfo.data.msg); setAlertSeverity('success');
            if (newDailyLog){setNewDailyLog(false)}
            if (!newDailyLog){setNewDailyLog(true)}
            handleClose()
            setCreateLog({...createLog, vehicle_id: '', logTime: 'Select log time.', currentLocation: '', startingMileage: '', endingMileage: '', startingFuelLevel: '', endingFuelLevel: '' })
        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false);
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
            }
        }

        }
    }

    function handleLogDropdown(){
        if (showLogDrop){setShowLogDrop(false)}
        if (!showLogDrop){setShowLogDrop(true); setShowMFuelDrop(false); setShowEFuelDrop(false) }
    }
    function handleMFuelDropdown(){
        if (showMFuelDrop){setShowMFuelDrop(false)}
        if (!showMFuelDrop){setShowMFuelDrop(true); setShowEFuelDrop(false); setShowLogDrop(false)}
    }
    function handleEFuelDropdown(){
        if (showEFuelDrop){setShowEFuelDrop(false)}
        if (!showEFuelDrop){setShowEFuelDrop(true); setShowMFuelDrop(false); setShowLogDrop(false) }
    }

    function handleLogDroplist(data){
        const fish = data.toLowerCase(); setCreateLog({...createLog, logTime: fish}); setShowLogDrop(false);
    }

    function handleMFuelDroplist(data){
        setCreateLog({...createLog, startingFuelLevel: data}); setShowMFuelDrop(false);
    }

    function handleEFuelDroplist(data){
        setCreateLog({...createLog, endingFuelLevel: data}); setShowEFuelDrop(false);
    }

    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem', }} >
                <Typography variant='h5'>Create Log</Typography> 
            </Box>}
            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '8rem', height: '2.25rem' }} >
                <Typography variant='h5'>Create Log</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle ? styleVlog : styleVlogMobile}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h4" fontWeight={'500'}>New Vehicle Log</Typography>
                    </Box>


                    <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Log Time</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleLogDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.logTime}</Typography>
                                {!showLogDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showLogDrop && 
                            <Box className="cont-abs">
                                {["Morning", "Evening"].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleLogDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box> 


                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Current Location</Typography>
                        <input className='input' name = {"currentLocation"} value={createLog.currentLocation} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>

                    {createLog.logTime === 'morning' && <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Starting Odometer</Typography>
                        <input className='input' name = {"startingMileage"} value={Number(createLog.startingMileage).toLocaleString() } onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>}

                    {createLog.logTime === 'evening' && <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Ending Odometer</Typography>
                        <input className='input' name = {"endingMileage"} value={Number(createLog.endingMileage).toLocaleString()} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>}

                    {createLog.logTime === 'morning' && <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Fuel Level</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleMFuelDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.startingFuelLevel}</Typography>
                                {!showMFuelDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showMFuelDrop && 
                            <Box className="cont-abs">
                                {['Full', 'Quarter full', 'Half full', 'Quarter empty', 'Reserve'].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleMFuelDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box>}

                    {createLog.logTime === 'evening' && <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Fuel Level</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleEFuelDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.endingFuelLevel}</Typography>
                                {!showEFuelDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showEFuelDrop && 
                            <Box className="cont-abs">
                                {['Full', 'Quarter full', 'Half full', 'Quarter empty', 'Reserve'].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleEFuelDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box>}

                    
                    <Box sx={{display: 'flex', alignItems: 'flex-end' ,justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem', display: 'flex', position: 'relative' }}>
                            <Typography variant='h5'>Close</Typography>
                        </Box>
                        
                        <Box disabled={loading} className='mid-btn primary-btn' onClick={(e)=>handleSubmit(e)}  sx={{height: '2.5rem', textTransform: 'none', position: 'relative', width: '9rem',}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Create Log</Typography> : ''}
                        </Box>

                    </Box>
                </Box>
            </Modal>
            <AlertMessage />
        </div>
    );
}


export function UpdateDailyLogModal({showModal, log}) {
    const [createLog, setCreateLog] = useState({vehicle_id: '', logTime: 'Select log time.', currentLocation: '', startingMileage: '', endingMileage: '', startingFuelLevel: 'Select fuel level', endingFuelLevel: 'Select Fuel level' })
    const [logTime, setLogTime] = useState(false)
    const [startingFuel, setStartingFuel] = useState(false)
    const [endingFuel, setEndingFuel] = useState(false)
    const [openServices, setOpenServices]= useState(false)
    const [loading, setLoading] = useState(false)
    const {setOpenAlert, setAlertMsg, setAlertSeverity, newDailyLog, setNewDailyLog} = ChatState()
    const [showLogDrop, setShowLogDrop] = useState(false)
    const [showMFuelDrop, setShowMFuelDrop] = useState(false)
    const [showEFuelDrop, setShowEFuelDrop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        if(showModal){
            setCreateLog({...createLog, log_id: log._id, currentLocation: log.currentLocation, startingMileage: log.startingMileage, endingMileage: log.endingMileage, startingFuelLevel: log.startingFuelLevel, endingFuelLevel: log.endingFuelLevel, logTime: log.logTime  })
            handleOpen()} 
            if (!showModal){handleClose()}
        
        window.addEventListener('resize', resize)
        if (width <= 599 ){
            setModalStyle(false)
        }
        if (width > 599){
            setModalStyle(true)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [width, showModal])

    const [age, setAge] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if (name === "startingMileage" || name === "endingMileage"){
            const newValue = value.replace(/,/g, '')
            setCreateLog({...createLog, [name]: newValue})
        }else{
            setCreateLog({...createLog, [name]: value})
        }
        
    }

    const handleSubmit = async(e)=>{
        // e.preventDefault()
        setLoading(true)
        if (!navigator.onLine){ 
            setAlertMsg("Network Error!!!"); setAlertSeverity('warning'); setOpenAlert(true); setLoading(false);
        }
        else{
            try {
            const token = localStorage.getItem('token');
            if (token === null){navigate('/login')}
            const user = JSON.parse(sessionStorage.getItem('userInfo'))
            if (user=== null){navigate('/login')}

            const logInfo = await axios.patch("https://futa-fleet-guard.onrender.com/api/drivers-log/edit-log", {log_id: log._id, currentLocation: createLog.currentLocation, startingMileage: createLog.startingMileage, endingMileage: createLog.endingMileage, startingFuelLevel: createLog.startingFuelLevel, endingFuelLevel: createLog.endingFuelLevel, logTime: createLog.logTime}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setOpenAlert(true); setAlertMsg(logInfo.data.msg); setAlertSeverity('success');
            setLoading(false)
            if (newDailyLog){setNewDailyLog(false)}
            if (!newDailyLog){setNewDailyLog(true)}
            handleClose()
            setCreateLog({...createLog, vehicle_id: '', logTime: 'Select log time.', currentLocation: '', startingMileage: '', endingMileage: '', startingFuelLevel: '', endingFuelLevel: '' })
        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false);
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
            }
        }

        }
    }

    function handleLogDropdown(){
        if (showLogDrop){setShowLogDrop(false)}
        if (!showLogDrop){setShowLogDrop(true); setShowMFuelDrop(false); setShowEFuelDrop(false) }
    }
    function handleMFuelDropdown(){
        if (showMFuelDrop){setShowMFuelDrop(false)}
        if (!showMFuelDrop){setShowMFuelDrop(true); setShowEFuelDrop(false); setShowLogDrop(false)}
    }
    function handleEFuelDropdown(){
        if (showEFuelDrop){setShowEFuelDrop(false)}
        if (!showEFuelDrop){setShowEFuelDrop(true); setShowMFuelDrop(false); setShowLogDrop(false) }
    }

    function handleLogDroplist(data){
        const fish = data.toLowerCase(); setCreateLog({...createLog, logTime: fish}); setShowLogDrop(false);
    }

    function handleMFuelDroplist(data){
        setCreateLog({...createLog, startingFuelLevel: data}); setShowMFuelDrop(false);
    }

    function handleEFuelDroplist(data){
        setCreateLog({...createLog, endingFuelLevel: data}); setShowEFuelDrop(false);
    }

    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <div style={{borderColor: '#FFFFF'}}>
            
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle ? styleVlog : styleVlogMobile}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h4" fontWeight={'500'}>Update Vehicle Log</Typography>
                    </Box>


                    <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Log Time</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleLogDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.logTime}</Typography>
                                {!showLogDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showLogDrop && 
                            <Box className="cont-abs">
                                {["Morning", "Evening"].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleLogDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box> 


                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Current Location</Typography>
                        <input className='input' name = {"currentLocation"} value={createLog.currentLocation} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>

                    {createLog.logTime === 'morning' && <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Starting Odometer</Typography>
                        <input className='input' name = {"startingMileage"} value={Number(createLog.startingMileage).toLocaleString() } onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>}

                    {createLog.logTime === 'evening' && <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight='500'  sx={{mb: '.75rem'}}>Ending Odometer</Typography>
                        <input className='input' name = {"endingMileage"} value={Number(createLog.endingMileage).toLocaleString()} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>}

                    {createLog.logTime === 'morning' && <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Fuel Level</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleMFuelDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .75rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.startingFuelLevel}</Typography>
                                {!showMFuelDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showMFuelDrop && 
                            <Box className="cont-abs">
                                {['Full', 'Quarter full', 'Half full', 'Quarter empty', 'Reserve'].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleMFuelDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box>}

                    {createLog.logTime === 'evening' && <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.75rem'}}>Fuel Level</Typography>
                        <Box className="cont" mb={'1.25rem'}>
                            <Box onClick={handleEFuelDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant={'h5'} fontWeight={'400'} >{createLog.endingFuelLevel}</Typography>
                                {!showEFuelDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                <AiOutlineCaretUp size={'1rem'} />}
                            </Box>

                            {showEFuelDrop && 
                            <Box className="cont-abs">
                                {['Full', 'Quarter full', 'Half full', 'Quarter empty', 'Reserve'].map((data, ind)=>{
                                    return(
                                    <Box  key={ind} onClick={()=> handleEFuelDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                        <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box>}

                    
                    <Box sx={{display: 'flex', alignItems: 'flex-end' ,justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem', display: 'flex', position: 'relative' }}>
                            <Typography variant='h5'>Close</Typography>
                        </Box>
                        
                        <Box disabled={loading} className='mid-btn primary-btn' onClick={(e)=>handleSubmit(e)}  sx={{height: '2.5rem', textTransform: 'none', position: 'relative', width: '9rem',}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Update Log</Typography> : ''}
                        </Box>

                    </Box>
                </Box>
            </Modal>
            <AlertMessage />
        </div>
    );
}

export function ReportModal() {
    const [report, setReport] = useState({location: '', description: '', image: 'Clicks Here to upload image'})
    const {setOpenAlert, setAlertMsg, setAlertSeverity, newIncedentReport, setNewIncedentReport} = ChatState()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [bigWidth, setBigWidth] = useState(true)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useState(()=>{

        window.addEventListener('resize', resize)
        if (width <= 599 ){
            setBigWidth(false)
        }
        if (width > 599){
            setBigWidth(true)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    },[width])

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setReport({...createLog, [name]: value})
    }

    const handleCreateReport = async()=>{
        setLoading(true)
        if (!navigator.onLine){
            setOpenAlert(true); setAlertMsg('Network Error!!!'); setAlertSeverity('warning')
        }else{
            try {
                const vehicle_id = ""; const location = report.location; const description = report.description; const image = report.image 

                const token = sessonStorage.getItem('token')
                if (token === null){navigate('/login')}
                const newReport = await axios.post("https://futa-fleet-guard.onrender.com/api/incedents/new-incedent", {vehicle_id, location, description, image },{
                    headers: {
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`          
                    }
                })
                setLoading(false)
                setOpenAlert(true); setAlertMsg('Report created successfully.'); setAlertSeverity('success')
                if (newIncedentReport){setNewIncedentReport(false)}
                if (!newIncedentReport){setNewIncedentReport(true)}

            } catch (err) {
                if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);setLoading(false);
                } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
                } else {
                    setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false);
                }
            }
        }
    }
    
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem', }} >
                <Typography variant='h5'>Create Report</Typography> 
            </Box>}
            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '8rem', height: '2.25rem' }} >
                <Typography variant='h5'>Create Report</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={bigWidth ? reportStyle : reportStyleMobile}>
                    <Box >
                        <Typography variant="h4" fontWeight={'500'}>Incedent Report</Typography>
                    </Box>

                    <Box sx={{mt: 4}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Incident Location</Typography>
                        <input className='input' name = {"location"} value={report.location} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Description</Typography>
                        <textarea className="input" onChange={(e)=> handleChange(e) } value={report.description} name="description" id="description" cols="30" rows="10" style={{width: '100%', height:'4.5rem', background: "white", color: 'black', resize: 'none'}}></textarea>
                    </Box>

                    <Box sx={{mt: 3, width: '100%'}}>
                        <Typography  variant='h5' sx={{mb: '.5rem'}}>Upload Image</Typography>
                        <input className='input' id="image" name = {"image"} onChange={(e)=> handleChange(e) } type="file" style={{width: '0', height:'0rem', background: "white", color: 'black', visibility: 'hidden', cursor: 'pointer'}}/>
                        <Box bgcolor={'primary.light'} sx={{height: '2.5rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', borderRadius: '.2rem', mt: '-1.5rem', cursor: 'pointer'}}>
                            <label htmlFor="image" style={{cursor: 'pointer', height: '2.5rem', width: '100%',display:'flex', alignItems: 'center', }}> {report.image}</label> 
                        </Box>
                    </Box>
                    
                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '9rem', display: 'flex' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>

                        <Box disabled={loading} className='mid-btn primary-btn' onClick={handleCreateReport}  sx={{ textTransform: 'none', width: '9rem', display: 'flex', positoin: 'relative' }}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Create Report</Typography> : ''}
                        </Box>

                    </Box>
                </Box>
            </Modal>
            <AlertMessage />
        </div>
    );
}

export function FeedBackModal() {
    const [feedback, setFeedback] = useState("")
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(0)
    const [index, setIndex] = useState([])
    const [inputError, setInputError] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e)=>{
        setFeedback(e.target.value)
        setInputError(false)
    }

    const handleSubmit = (e)=>{
        if(!feedback){
            setInputError(true)
        }
        if(feedback){
        sessionStorage.setItem('count', count)
        sessionStorage.setItem('feedback', feedback)
        setOpen(false)
        }
    }
    const handleClick = (ind)=>{
        setIndex([...index, ind])
        if(!index.includes(ind)){
            setCount(count + 1)
        }
        if(index.includes(ind)){
            setCount(count - 1)
            const newIndex = index.filter(data => data !== ind)
            setIndex(newIndex)
        }
    }
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem' }} >
                <Typography variant='h5'>Give Feedback</Typography> 
            </Box>}
            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem', height: '2.25rem' }} >
                <Typography variant='h6'>Give Feedback</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={reportStyle}>
                    <Typography variant="h4" fontWeight={'600'}>Rate your experience</Typography>
                    <Typography variant='h5' fontWeight={'500'} sx={{mt: '.75rem'}}>Are you satisfied with your service</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', m: '1.25rem 0', gap: '.75rem'}}>
                        <Box onClick={()=>handleClick('1')} sx={{cursor: 'pointer'}}>{count >= 1? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box onClick={()=>handleClick('2')} sx={{cursor: 'pointer'}}>{count >= 2? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box onClick={()=>handleClick('3')} sx={{cursor: 'pointer'}}>{count >= 3? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box onClick={()=>handleClick('4')} sx={{cursor: 'pointer'}}>{count >= 4? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box onClick={()=>handleClick('5')} sx={{cursor: 'pointer'}}>{count >= 5? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                    </Box>
                    
                    <Typography variant='h5' fontWeight={'500'} sx={{mb: '1.3rem'}}>Drop Feedback</Typography>
                    <input className={inputError?'input input-error':'input'} name = {"feedback"} value={feedback} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>

                    <Box className='mid-btn primary-btn' onClick={handleSubmit}  sx={{mt: '1.5rem' }}>
                        <Typography variant='h5'>Submit</Typography>
                    </Box>
                    
                </Box>
            </Modal>
        </div>
    );
}

export function AcceptRequestModal() {
    const [feedback, setFeedback] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e)=>{
        setFeedback(e.target.value)
    }

    const handleProceed = (e)=>{
        // run a request to patch the planMaint and change it to accepted
        setOpen(false)
    }

    const acceptRequest = ()=>{

    }

    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <>{!isMD && <Box className='mid-btn primary-btn' onClick={acceptRequest} sx={{width: '10rem',mt: '1rem' }} >
                <Typography variant='h5'>Accept Request</Typography> 
            </Box>}
            {isMD && <Box className='mid-btn primary-btn' onClick={acceptRequest} sx={{width: '9.5rem',mt: '1rem', height: '2.25rem' }} >
                <Typography variant='h5'>Accept Request</Typography> 
            </Box>}</>}
            {isSM && <Box className='mid-btn primary-btn' onClick={acceptRequest} sx={{width: '9rem',mt: '1rem', height: '2.25rem' }} >
                <Typography variant='h5'>Accept Request</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={reportStyle}>
                    <Typography variant="h4" fontWeight={'500'}>Accept Request</Typography>
                    <Typography variant='h5' fontWeight={'400'} sx={{mt: '1rem'}}>You have accepted this request, click the button below to proceed</Typography>                    

                    <Box className='mid-btn primary-btn' onClick={handleProceed}  sx={{mt: '1.5rem' }}>
                        <Typography variant='h5'>Proceed</Typography>
                    </Box>
                    
                </Box>
            </Modal>
        </div>
    );
}

export function SelectMaintStatusModal({id, classname, name,title,icon }) {
    const [open, setOpen] = React.useState(false);
    const {status, setStatus} = ChatState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleProceed = (id)=>{
        // run a request to patch the planMaint and change it to accepted
        setStatus(id)
        sessionStorage.setItem("status", id)
        setOpen(false)

    }
    return (
        <div style={{borderColor: '#FFFFF', width: '100%'}}>
            <Box onClick={handleOpen} className={status === `${id}`?`${classname} `:"stat"} sx={{width: '100%'}}>
                <Box className={''} sx={{display: 'flex', alignItems: 'center',  height: '100%', width: '2rem', borderRadius: '.3rem' }}>{icon}</Box>
                <Typography variant="h5" fontWeight={'500'} ml={'.5rem'} component="div">{name}</Typography>
            </Box> 

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={reportStyle}>
                    <Typography variant="h4" fontWeight={'600'}>{title}</Typography>
                    <Typography variant='h5' fontWeight={'500'} sx={{mt: '1rem'}}>Click the button below to proceed</Typography>                    
                    
                    <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem' }}>
                            <Typography variant='h5'>Cancel</Typography>
                        </Box>
                        <Box className='mid-btn primary-btn' onClick={()=>handleProceed(id)}  sx={{  textTransform: 'none' , width: '8rem', }}>
                            <Typography variant='h5'>Proceed</Typography>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}


export function MaintFeedBackModal() {
    const [feedback, setFeedback] = useState("")
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(0)

    useEffect(() => {
        const rateCount = sessionStorage.getItem('count')
        const feedback = sessionStorage.getItem('feedback')
        setFeedback(feedback)
        setCount(rateCount)
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleCreateLog = (e)=>{
    }
    return (
        <div style={{borderColor: '#FFFFF'}}>
            <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem' }} >
                <Typography variant='h5'>View Feedback</Typography> 
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={reportStyle}>
                    <Typography variant="h4" fontWeight={'600'}>Personnel Rating</Typography>
                    {/* <Typography variant='h5' fontWeight={'500'} sx={{mt: '.75rem'}}>Are you satisfied </Typography> */}
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', m: '1.25rem 0', gap: '.75rem'}}>
                        <Box sx={{cursor: 'pointer'}}>{count >= 1? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 2? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 3? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 4? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 5? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>

                    </Box>
                    
                    <Typography variant='h5' fontWeight={'600'} sx={{mb: '1.3rem'}}>Feedback</Typography>
                    <Typography variant='h5' fontWeight={'500'} sx={{mb: '1.3rem'}}>{feedback}</Typography>

                    <Box className='mid-btn back-btn' onClick={handleClose}  sx={{mt: '1.5rem' }}>
                        <Typography variant='h5'>Close</Typography>
                    </Box>
                    
                </Box>
            </Modal>
        </div>
    );
}

export function CreateMaintLogModal() {
    const [open, setOpen] = React.useState(false);
    const [maintLog, setMaintLog] = useState({concerns: '', services: [], cost: ''})
    const [openServices, setOpenServices]= useState(false)
    const {alertMsg, setAlertMsg, openAlert,setOpenAlert, alertSeverity, setAlertSeverity} = ChatState()

    const services = ['Oil Change', 'Brake Inspension and Repair', 'Tire replacement', 'Suspension Inspection/Repair', 'Engine Check', 'AC Inspection/Repair', 'Head Lamp Replacement', 'Tracficator(s) Replacement' ]
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value        
        if(name === 'cost' && typeof(Number(value)) !== 'number'){
        }
        if(name === 'cost' && typeof(Number(value)) === 'number'){
            setMaintLog({...maintLog, [name]: value})
        }
        if(name ==='concerns'){
            setMaintLog({...maintLog, [name]: value})
        }
        
    }

    const handleSubmit = ()=>{
        // e.target.preventDefault()
        // const ned = {serverity: 'warning', msg: 'Cost cannot be string', open: true}
        // setAlertMsg("Cost cannot...sss") ;setOpenAlert(true) ;setAlertSeverity("warning")
        setOpenAlert(true)
    }
    
    const handleServices = ()=>{
        if(openServices){setOpenServices(false)}
        if(!openServices){setOpenServices(true)}
    }
    const handleServiceSelect =(data)=>{
        const services = maintLog.services
        if(services.includes(data)){
            const newServices = services.filter((res)=> res !== data)
            setMaintLog({...maintLog, services: newServices})
        }else{
        services.push(data)
        setMaintLog({...maintLog, services: services})
        }
    }

    const handleRemoveService = (data)=>{
        const newServices = maintLog.services.filter((res)=> res !== data)
        setMaintLog({...maintLog, services: newServices})
    }

    return (
        <div style={{borderColor: '#FFFFF'}}>
            <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem' }} >
                <Typography variant='h5'>Create Log</Typography> 
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={planMaintStyle}>
                    <Box >
                        <Typography variant="h4" fontWeight={'500'}>Create Maintenance Log</Typography>
                    </Box>

                    <Box sx={{mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Concerns</Typography>
                        <textarea cols={'30'} rows={'10'} className='input' name = {"concerns"} value={maintLog.concerns} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'4.5rem', background: "white", color: 'black', resize: 'none'}}/>
                    </Box>

                    {maintLog.services.length > 0 && 
                        <Box sx={{ maxHeight: '11rem',p: '.5rem', borderRadius: '.3rem', mb: '.75rem', border: '1px solid gray', overflowY: 'auto'}}>
                            {maintLog.services.map((data, ind)=>{
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
                                        {(maintLog.services.includes(data)) ? <IoIosCheckboxOutline size={'1.25rem'} />:
                                        <IoIosSquareOutline size={'1.5rem'} />}
                                        <Typography variant={'h5'} fontWeight={'500'}>The firstt</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Cost</Typography>
                        <input className='input' name = {"cost"} value={maintLog.cost} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', zIndex: '5'}}/>
                    </Box>

                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem', display: 'flex' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>
                        <Box className='mid-btn primary-btn' onClick={(e)=>handleSubmit(e)}  sx={{  textTransform: 'none' , width: '8rem', display: 'flex', justifySelf: 'flex-end' }}>
                            <Typography variant='h5'>Create Log</Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <AlertMessage />
        </div>
    );
}

export function MaintHisModal() {
    const [open, setOpen] = React.useState(false);
    const [maintLog, setMaintLog] = useState({concerns: '', services: [], cost: ''})
    const [openServices, setOpenServices]= useState(false)
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const {alertMsg, setAlertMsg, openAlert,setOpenAlert, alertSeverity, setAlertSeverity, showHis, setShowHis, maintData, setMaintData,} = ChatState()

    const services = ['Oil Change', 'Brake Inspension and Repair', 'Tire replacement', 'Suspension Inspection/Repair', 'Engine Check', 'AC Inspection/Repair', 'Head Lamp Replacement', 'Tracficator(s) Replacement' ]
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setShowHis(false)}

    useEffect(()=>{
        handleOpen()
    }, [showHis])


    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        
        
        if(name === 'cost' && typeof(Number(value)) !== 'number'){
        }
        if(name === 'cost' && typeof(Number(value)) === 'number'){
            setMaintLog({...maintLog, [name]: value})
        }
        if(name ==='concerns'){
            setMaintLog({...maintLog, [name]: value})
        }
        
    }


    const handleServices = ()=>{
        if(openServices){setOpenServices(false)}
        if(!openServices){setOpenServices(true)}
    }
    const handleServiceSelect =(data)=>{
        const services = maintLog.services
        if(services.includes(data)){
            const newServices = services.filter((res)=> res !== data)
            setMaintLog({...maintLog, services: newServices})
        }else{
        services.push(data)
        setMaintLog({...maintLog, services: services})
        }
    }

    const handleRemoveService = (data)=>{
        const newServices = maintLog.services.filter((res)=> res !== data)
        setMaintLog({...maintLog, services: newServices})
    }

    const handleEdit = ()=>{
        setAlertSeverity("success")
        setAlertMsg("Log updated successfully.")
        setOpenAlert(true)

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    return (
        <div style={{borderColor: '#FFFFF'}}>
            {/* <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem' }} >
                <Typography variant='h5'>Create Log</Typography> 
            </Box> */}

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >

                <Box sx={planMaintStyle}>
                    <Box >
                        <Typography variant="h4" fontWeight={'500'}>Update Maintenance Log</Typography>
                        <Typography variant="h5" mt={'1.2rem'} fontWeight={'500'}>{maintData.maint_id}</Typography>
                    </Box>

                    <Box sx={{mt: 4}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Concerns</Typography>
                        <textarea cols={'30'} rows={'10'} className='input' name = {"concerns"} value={maintData.concern} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'4.5rem', background: "white", color: 'black', resize: 'none'}}/>
                    </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Services</Typography>
                        {maintLog.services.length > 0 && 
                        <Box sx={{ maxHeight: '11rem',p: '.5rem', borderRadius: '.3rem', mb: '.75rem', border: '1px solid gray', overflowY: 'auto'}}>
                            {maintLog.services.map((data, ind)=>{
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
                                        {(maintLog.services.includes(data)) ? <IoIosCheckboxOutline size={'1.25rem'} />:
                                        <IoIosSquareOutline size={'1.5rem'} />}
                                        <Typography variant={'h5'} fontWeight={'500'}>The firstt</Typography>
                                    </Box>
                                    )
                                })}
                            </Box>}
                        </Box>
                    </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Cost</Typography>
                        <input className='input' name = {"cost"} value={maintData.cost} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>

                    <Box sx={{display: 'flex',justifyContent: 'space-between', alignItems: 'center',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem', display: 'flex' }}>
                            <Typography variant='h5'>Close</Typography>
                        </Box>

                        
                        <Box disabled={loading} className='mid-btn primary-btn' onClick={handleEdit}  sx={{ textTransform: 'none', width: '8rem', display: 'flex', positoin: 'relative' }}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Update Log</Typography> : ''}
                        </Box>

                    </Box>
                </Box>

                
            </Modal>
            <AlertMessage />
        </div>
    );
}


export function VehicleServiceSeletctStatusModal({res, statusModal, newStatus}) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const {setOpenAlert, setAlertMsg, setAlertSeverity, statusUpdate, setStatusUpdate} = ChatState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalStyle, setModalStyle] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)
    

    const resize = ()=>{
        setWidth(window.innerWidth)
    }


    useEffect(() => {
        if (newStatus === 'pending'){
            handleClose()
        }
        handleOpen()

        window.addEventListener('resize', resize)
        if (width <= 599 ){
            setModalStyle(true)
        }
        if (width > 599){
            setModalStyle(false)
        }
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [statusModal])
    
    const handleProceed = ()=>{
        if (navigator.onLine){
            changeStatus()
        }
    }

    const changeStatus = async()=>{
        setLoading(true)
        const token = sessionStorage.getItem('token')
        if (token === null){navigate('/login')}
        const maint_id = res._id
        const status = newStatus
        try {
            const maint = await axios.patch("https://futa-fleet-guard.onrender.com/api/maint-log/update-maint-status", {maint_id, status}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            setAlertMsg(maint.data.msg); setOpenAlert(true); setAlertSeverity("success");
            setLoading(false)
            handleClose()
            if (statusUpdate){setStatusUpdate(false)}
            if (!statusUpdate){setStatusUpdate(true)}
            
        } catch (err) {
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false)
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setLoading(false)
            }
        }
    }

    return (
        <div style={{borderColor: '#FFFFF', width: '100%'}}>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle ? reportStyleMobile: reportStyle}>
                    <Typography variant="h4" fontWeight={'600'} textAlign={'center'}>{loading? "Updating...": "Update"} Maintenance Status</Typography>
                    <Typography variant='h5' fontWeight={'500'} textAlign='center' sx={{mt: '1.25rem'}}>Click the button below to proceed</Typography>                    
                    
                    <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem' }}>
                            <Typography variant='h5'>Cancel</Typography>
                        </Box>
                        <Box disabled={loading} type="submit" className='mid-btn primary-btn' onClick={handleProceed}  fullWidth  sx={{height: '2.25rem', textTransform: 'none', position: 'relative', width: '8rem',}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Proceed</Typography> : ''}
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}