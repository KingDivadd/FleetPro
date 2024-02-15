import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {Box, Grid, useMediaQuery} from '@mui/material';
import { ChatState } from 'context/chatContext';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { IoIosCloseCircleOutline } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { IoMdAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";  //checked box
import { IoIosSquareOutline } from "react-icons/io"; // uncheck box
import SelectFetchedUser from 'components/check-box-list';
import { GoStar, GoStarFill } from 'react-icons/go';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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


export default function AddVehicleModal() {
    const [createVehicle, setCreateVehicle] = useState({brand:'', vehicle_name: "", fuel_type:"", vehicle_color:"", chasis_no:"", manufacture_year:"", vehicle_image:"", plate_no:"", current_mileage:"", engine_no:"", vehicle_type:"", transmission:"", })
    
    const [next, setNext] = useState(true)
    const [age, setAge] = useState("")
    const [open, setOpen] = React.useState(false);
    const {setOpenAlert, setAlertSeverity, setAlertMsg, updateVehicle, setUpdateVehicle} = ChatState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showDrop, setShowDrop] = useState(false)
    const [showVehDrop, setShowVehDrop] = useState(false)
    const [showTransDrop, setShowTransDrop] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)

    useEffect(()=>{
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
    },[width])

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if (name === "current_mileage"){
            const newValue = value.replace(/,/g,"")
            setCreateVehicle({...createVehicle, current_mileage: newValue})
        }
        if (name !== "current_mileage"){
            setCreateVehicle({...createVehicle, [name]: value})
        }
    }

    function handleNext() {setNext(false)}
    function handleBack() {setNext(true)}

    const handleSubmit = async()=>{
        setLoading(true)

        if (!createVehicle.brand || !createVehicle.vehicle_name || !createVehicle.fuel_type ||  !createVehicle.vehicle_color || !createVehicle.chasis_no || !createVehicle.plate_no || !createVehicle.current_mileage || !createVehicle.engine_no || !createVehicle.vehicle_type || !createVehicle.transmission  ){
            setOpenAlert(true); setAlertMsg("Please provide all vehicle information"); setAlertSeverity('warning'); setLoading(false); console.log(createVehicle)
        }
        else{
            handleCreateVehicle()
        }
    }

    const handleCreateVehicle = async()=>{
        const token = sessionStorage.getItem('token')
        if (token === null){navigate('/login')}
        try {
            const newVehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/add-vehicle",
            createVehicle,{
                headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
                }
            }
            );
            setAlertMsg(newVehicle.data.msg); setAlertSeverity("success"); setOpenAlert(true); setLoading(false);
            if (updateVehicle){setUpdateVehicle(false)}
            if (!updateVehicle){setUpdateVehicle(true)}
            setCreateVehicle({...createVehicle, brand:'', vehicle_name: "", fuel_type:"", vehicle_color:"", chasis_no:"", manufacture_year:"", vehicle_image:"", plate_no:"", current_mileage:"", engine_no:"", vehicle_type:"", transmission:"", })

            } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false);
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false);
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false);
            }
        }
    }
    
    const handleDropdown = ()=>{
        if (showDrop){setShowDrop(false)}
        if (!showDrop){setShowDrop(true); setShowTransDrop(false); setShowVehDrop(false); }
    }
    const handleVehDropdown = ()=>{
        if (showVehDrop){setShowVehDrop(false)}
        if (!showVehDrop){setShowVehDrop(true); setShowTransDrop(false); setShowDrop(false) }
    }
    const handleTransDropdown = ()=>{
        if (showTransDrop){setShowTransDrop(false)}
        if (!showTransDrop){setShowTransDrop(true); setShowVehDrop(false); setShowDrop(false)}
    }

    const handleDroplist = (data)=>{
        const fuel = data.toLowerCase()
        setCreateVehicle({...createVehicle, fuel_type: fuel})
        setShowDrop(false)
    }
    const handleVehDroplist = (data)=>{
        const fish = data.toLowerCase()
        setCreateVehicle({...createVehicle, vehicle_type: fish})
        setShowVehDrop(false)
    }
    const handleTransDroplist = (data)=>{
        const fish = data.toLowerCase()
        setCreateVehicle({...createVehicle, transmission: fish})
        setShowTransDrop(false)
    }

    return (
        <div style={{borderColor: '#FFFFF'}}>
            <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem',  gap:'.5rem'}} >
                <FaCar size={'1.3rem'} />
                <Typography variant='h5'>New Vehicle</Typography> 
            </Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle? styleVlogMobile: styleVlog}>

                    <Typography variant='h4' fontWeight={'500'} textAlign={'center'} sx={{mb: '.5rem'}}>Add a new Vehicle</Typography>

                    {next?  
                    <Grid>
                        <Box sx={{mt: 4}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Vehicle Brand</Typography>
                            <input className='input' name = {"brand"} value={createVehicle.brand} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Vehicle Name</Typography>
                            <input className='input' name = {"vehicle_name"} value={createVehicle.vehicle_name} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Body Color</Typography>
                            <input className='input' name = {"vehicle_color"} value={createVehicle.vehicle_color} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{width: '100%', mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Vehicle Type</Typography>
                            <Box className="cont" mb={'1.25rem'}>
                                <Box onClick={handleVehDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant={'h5'} fontWeight={'400'} >{createVehicle.vehicle_type}</Typography>
                                    {!showVehDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                    <AiOutlineCaretUp size={'1rem'} />}
                                </Box>
                                {showVehDrop && 
                                <Box className="cont-abs">
                                    {["Car","Bus", "SUV", "Pickup Truck"].map((data, ind)=>{
                                        return(
                                        <Box  key={ind} onClick={()=> handleVehDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                            <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                        </Box>
                                        )
                                    })}
                                </Box>}
                            </Box>
                        </Box> 

                        <Box sx={{width: '100%', mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Fuel Type</Typography>
                            <Box className="cont" mb={'1.25rem'}>
                                <Box onClick={handleDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant={'h5'} fontWeight={'400'} >{createVehicle.fuel_type.toUpperCase()}</Typography>
                                    {!showDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                    <AiOutlineCaretUp size={'1rem'} />}
                                </Box>
                                {showDrop && 
                                <Box className="cont-abs">
                                    {["PMS","Diesel"].map((data, ind)=>{
                                        return(
                                        <Box  key={ind} onClick={()=> handleDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                            <Typography variant={'h5'} fontWeight={'500'}>{data}</Typography>
                                        </Box>
                                        )
                                    })}
                                </Box>}
                            </Box>
                        </Box> 

                        <Box sx={{width: '100%', mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Transmission Type</Typography>
                            <Box className="cont" mb={'1.25rem'}>
                                <Box onClick={handleTransDropdown} sx={{width: '100%', minHeight: '2.5rem', height: 'auto', border: '1px solid gray', borderRadius: '.3rem', display: 'flex', p: '0 .5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant={'h5'} fontWeight={'400'} >{createVehicle.transmission}</Typography>
                                    {!showTransDrop ? <AiOutlineCaretDown size={'1rem'} /> :
                                    <AiOutlineCaretUp size={'1rem'} />}
                                </Box>
                                {showTransDrop && 
                                <Box className="cont-abs">
                                    {["Manual","Automatic"].map((data, ind)=>{
                                        return(
                                        <Box  key={ind} onClick={()=> handleTransDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                            <Typography variant={'h5'} fontWeight={'400'}>{data}</Typography>
                                        </Box>
                                        )
                                    })}
                                </Box>}
                            </Box>
                        </Box> 

                        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',gap: '1rem', mt: 5, width: '100%',}}>
                            <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', height: '2.25rem', width: '8rem', display: 'flex' }}>
                                <Typography variant='h5'>Close</Typography>
                            </Box>
                            <Box className='mid-btn primary-btn' onClick={handleNext}  sx={{  textTransform: 'none',  height: '2.25rem', width: '8rem', display: 'flex', justifySelf: 'flex-end' }}>
                                <Typography variant='h5'>Next</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    :
                    <Grid>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Plate No</Typography>
                            <input className='input' name = {"plate_no"} value={createVehicle.plate_no} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Engine No</Typography>
                            <input className='input' name = {"engine_no"} value={createVehicle.engine_no} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Chasis No</Typography>
                            <input className='input' name = {"chasis_no"} value={createVehicle.chasis_no} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>
                        
                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Vehicle Manufacture Year</Typography>
                            <input className='input' name = {"manufacture_year"} value={createVehicle.manufacture_year} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box sx={{mt: 3}}>
                            <Typography variant='h5' fontWeight={'500'} sx={{mb: '.5rem'}}>Current Mileage</Typography>
                            <input className='input' name = {"current_mileage"} value={Number(createVehicle.current_mileage).toLocaleString()} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                        </Box>
                        

                    <Box sx={{display: 'flex', algnItems: 'flex-end', justifyContent: 'space-between',gap: '1rem', mt: 5, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleBack}  sx={{ textTransform: 'none', width: '8rem', display: 'flex' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>
                        <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}   sx={{ height: '2.5rem', textTransform: 'none', position: 'relative', width: '9rem'}}>
                            {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                            {!loading ? <Typography variant='h5'>Add Vehicle</Typography> : ''}
                        </Box>
                    </Box>

                    </Grid>}
                    
                    
                </Box>
            </Modal>
        </div>
    );
}

export function AddDriverModal() {
    const [createLog, setCreateLog] = useState({startLocation: '', endLocation: '', startMileage: '', endMileage: '', route: '', fuelLevel: '' })

    const [age, setAge] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e)=>{
        setAge(e.target.value)
        const name = e.target.name
        const value = e.target.value
        setCreateLog({...createLog, [name]: value})
    }

    const handleCreateLog = (e)=>{
        // e.preventDefault()
    }
    return (
        <div style={{borderColor: '#FFFFF'}}>
            <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem',  gap:'.5rem'}} >
                <IoPersonAddOutline size={'1.3rem'} />
                <Typography variant='h5'>Add Driver</Typography> 
            </Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={styleVlog}>
                    <Box >
                        <Typography variant="h4" fontWeight={'500'}>New Vehicle Log</Typography>
                    </Box>
                    <Box sx={{mt: 4}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Starting Location</Typography>
                        <input className='input' name = {"startLocation"} value={createLog.startLocation} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Ending Location</Typography>
                        <input className='input' name = {"endLocation"} value={createLog.endLocation} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Starting Mileage</Typography>
                        <input className='input' name = {"startMileage"} value={createLog.startMileage} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Ending Mileage</Typography>
                        <input className='input' name = {"endMileage"} value={createLog.endMileage} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Route</Typography>
                        <input className='input' name = {"route"} value={createLog.route} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black'}}/>
                    </Box>
                    <Box sx={{width: '100%', mt: 4 }}>
                        <Typography variant='h5' sx={{mb: '.5rem'}}>Current Fuel Level</Typography>
                        <FormControl sx={{ width: '100%'}} size="small">
                            <Select labelId="demo-select-small-label"  id="demo-select-small" value={createLog.fuelLevel} label="Age" onChange={handleChange} >
                                    <MenuItem name={'fuelLevel'} value={"Full"}><Typography variant="h6">Full</Typography> </MenuItem>
                                    <MenuItem name={'fuelLevel'} value={"Quarter Full"}><Typography variant="h6">Quarter Full</Typography> </MenuItem>
                                    <MenuItem name={'fuelLevel'} value={"Mid"}><Typography variant="h6">Mid</Typography> </MenuItem>
                                    <MenuItem name={'fuelLevel'} value={"Quarter Empty"}><Typography variant="h6">Quarter Empty</Typography> </MenuItem>
                                    <MenuItem name={'fuelLevel'} value={"Reserve"}><Typography variant="h6">Reserve</Typography> </MenuItem>
                            </Select>
                        </FormControl>
                    </Box> 
                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',justifyContent: 'space-between',gap: '1rem', mt: 4, width: '100%',}}>
                        <Box className='mid-btn back-btn' onClick={handleClose}  sx={{ textTransform: 'none', width: '8rem', display: 'flex' }}>
                            <Typography variant='h5'>Back</Typography>
                        </Box>
                        <Box className='mid-btn primary-btn' onClick={handleCreateLog}  sx={{  textTransform: 'none' , width: '8rem', display: 'flex', justifySelf: 'flex-end' }}>
                            <IoMdAdd size={'1.5rem'} />
                            <Typography variant='h5'>Create Log</Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

const FetchedUsers = ({key, data, checkIcon, setCheckIcon, setUserSelect, userSelect})=>{

    function handleUser(data){

        setUserSelect({...userSelect, value: `${data.lastName} ${data.firstName}` })

        if(checkIcon){
            setCheckIcon(false)
        }
        if (!checkIcon){
            setCheckIcon(true)
            setUserSelect({...userSelect, show: true})
        }
    }
    return(
        <Box onClick={()=>handleUser(data)} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '2.5rem',p: '0 .5rem', gap: '1.5rem', background: 'white', width: '100%', mb: '.5rem', mr: '-.5rem', borderRadius: '.3rem', cursor: 'pointer'}}>
            {/* <Box sx={{height: '2.5rem', width: '2rem', display: 'flex', alignItems: 'center', }}>
                {checkIcon ? <IoIosCheckboxOutline size={'1.55rem'} /> : <IoIosSquareOutline size={'2rem'} />}
            </Box> */}
            <Typography variant='h4' fontWeight={'400'} sx={{mt: '.5rem', height: '2.5rem', display: 'flex', alignSelf: 'center'}}>{data.lastName} {data.firstName}</Typography>
        </Box>
    )
}

export function AssignVehicle({vehicle}) {
    const [chosen, setChosen] = useState("")
    const [next,setNext] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {setOpenAlert, setAlertMsg, setAlertSeverity, updateVehicle, setUpdateVehicle} = ChatState()
    const [show, setShow] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)


    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        if (!navigator.onLine){
            console.log('network error')
        }else{
            fetchUsers()
        }
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

    const fetchUsers = async()=>{
        try {
            const users = await axios.get("https://futa-fleet-guard.onrender.com/api/user/users", {}, {
                headers: {
                    "Content-Type":  "Application/json",
                }
            });
            const userBox = users.data.users
            const filterUsers = userBox.filter(data => data.role !== 'driver')
            setAllUsers(filterUsers)
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

    const handleChange = (e)=>{
        setAge(e.target.value)
        const name = e.target.name
        const value = e.target.value
        setCreateLog({...createLog, [name]: value})
    }

    const handleNext = (e)=>{
        setNext(false)
    }


    const handleSubmit = async()=>{
        setLoading(true)
        const token = sessionStorage.getItem('token')
        const vehicle_id = vehicle._id
        const assignee_id = chosen._id
        try {
            const updatedVehicle = await axios.patch("https://futa-fleet-guard.onrender.com/api/vehicle/assign-vehicle", {vehicle_id, assignee_id}, {
                headers: {
                    "Content-Type":  "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setOpenAlert(true); setAlertSeverity('success'); setAlertMsg(updatedVehicle.data.msg);
            if (updateVehicle){setUpdateVehicle(false)}
            if (!updateVehicle){setUpdateVehicle(true)}
            setLoading(false)
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
            } else if (err.response) {
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
            } else {
                setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
            }
        }
    }

    const selectUser = (data)=>{
        console.log(data)
        setChosen(data)
    }

    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <div style={{borderColor: '#FFFFF', outline: 'none', p: '.75rem' }}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '10rem',  gap:'.5rem'}} >
                <Typography variant='h5'>Assign Vehicle</Typography> 
            </Box>}
            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '9rem',  gap:'.5rem', height: '2.25rem'}} >
                <Typography variant='h5'>Assign Vehicle</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle? styleVlogMobile : styleVlog}>

                    {next?
                    <Box sx={{height: 'auto', maxHeight: '87.5vh'  }}>
                        <Typography variant='h4' fontWeight='500' mb={'1.25rem'} textAlign='center' >Vehicle Assignment</Typography>

                        <input className={'input'} placeholder='Serch for user here.' name = {"search"} value={''} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.25rem', background: "white", color: 'black'}}/>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: '.75rem', mb: '1rem'}}>
                            <Box className="mid-btn" onClick={()=> setChosen("")} sx={{height: '2.25rem', width: '8rem', border: '1px solid gray'}} >
                                <Typography variant='h5' fontWeight='h5'>Clear </Typography>
                            </Box>
                            <Box className="mid-btn" sx={{height: '2.25rem', width: '8rem', border: '1px solid gray'}} >
                                <Typography variant='h5' fontWeight='h5'>Filter </Typography>
                            </Box>
                        </Box>
                        <Box sx={{width: '100%', height: '2.25rem',border: '1px solid gray', borderRadius: '.3rem', p: '0 .5rem', mb: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Typography variant='h5' fontWeight='h5'>{chosen.lastName} {chosen.firstName}</Typography>
                        </Box>
                        <Box sx={{height: '55vh', borderRadius: '.3rem', background: 'whitesmoke', border: '1px solid whitesmoke', overflowY: 'auto'}}>
                            {allUsers.map((data, ind)=>{
                                return(
                                    <Box className='drop-list' onClick={()=>selectUser(data)} key={ind} sx={{height: '2.25rem', display: 'flex', justifyContent: 'flex-start', gap: '.75rem'}}>
                                        {chosen === data ? <IoIosCheckboxOutline size={'1.25rem'} />:
                                        <IoIosSquareOutline size={'1.5rem'} />}
                                        <Typography variant='h5' fontWeight={'400'}>{data.lastName} {data.firstName}</Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '1.25rem'}}>
                            <Box className="mid-btn back-btn" onClick={handleClose} sx={{width: '8rem', height: '2.25rem'}} >
                                <Typography variant='h5' fontWeight={'400'} >Cancel</Typography>
                            </Box>
                            <Box className="mid-btn primary-btn" onClick={handleNext}  sx={{width: '8rem', height: '2.25rem'}} >
                                <Typography variant='h5' fontWeight={'400'} >Next</Typography>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <Box> 
                        <Typography variant='h4' fontWeight='500' mb={'1.25rem'} textAlign='center' >Vehicle Assignment</Typography>
                        <Typography variant='h5' fontWeight='500' mb={'1.25rem'} textAlign='center' >You are about to assign vehicle with the following information to</Typography>
                        <Typography variant='h4' fontWeight='500' mb={'1.25rem'} textAlign='center' >{chosen.lastName} {chosen.firstName}</Typography>

                        <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                            <Typography variant='h5' fontWeight='500' mb={'1.25rem'} >Vehicle Name</Typography>
                            <Typography variant='h5' fontWeight='500' mb={'1.25rem'} >{vehicle.vehicle_name}</Typography>
                        </Box>

                        <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center', mb: '1.25rem'}}>
                            <Typography variant='h5' fontWeight='500' mb={'1.25rem'} >Plate Number</Typography>
                            <Typography variant='h5' fontWeight='500' mb={'1.25rem'} >{vehicle.plate_no}</Typography>
                        </Box>

                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Box className="mid-btn back-btn" onClick={()=> setNext(true)} sx={{width: '8.5rem', height: '2.25rem'}} >
                                <Typography variant='h5' fontWeight='400' >Back</Typography>
                            </Box>

                            <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}   sx={{ height: '2.5rem', textTransform: 'none', position: 'relative', width: '8.5rem', height: '2.25rem'}}>
                                {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                                {!loading ? <Typography variant='h5'>Proceed</Typography> : ''}
                            </Box>
                        </Box>
                    </Box>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export function PersonnelFeedBackModal({data}) {
    const [view, setView] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [feedback, setFeedback] = useState({issues: "", system: [], images: ''})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputError, setInputError] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)

    useEffect(()=>{

        console.log('Personnel Feedbcack data ', data)

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
    },[width])

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    const handleChange = (e)=>{
        const name = e.target.name()
        const value = e.target.value()
    }

    const {completion_date, images, issues, repair_done} = data
    
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <div style={{borderColor: '#FFFFF'}}>
            {!isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem', height: '2.25rem' }} >
                <Typography variant='h5'>Personnel Feedback</Typography> 
            </Box>}
            {isSM && <Box className='mid-btn primary-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem', height: '2.25rem' }} >
                <Typography variant='h5'>Personnel Feedback</Typography> 
            </Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle? reportStyleMobile : reportStyle}>
                    
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '1.5rem'}}>
                        <Box className={view ?"primary-btn register": "primary-btn hollow-btn"} onClick={()=> setView(true)} sx={{width: '5rem',height: '2.25rem', border: '1px solid #1B61E4'}}>
                            <Typography variant={'h5'} >View</Typography>
                        </Box>
                        <Box className={!view ? "primary-btn register" : "primary-btn hollow-btn"} onClick={()=> setView(false)} sx={{height: '2.25rem', width: '5rem'}} >
                            <Typography variant={'h5'}>Edit</Typography>
                        </Box>
                    </Box>


                    {view ? 
                    <Box>
                        <Typography variant='h4' fontWeight='500' mb={'1.25rem'} textAlign={'center'} >Personnel Feedback</Typography>                        
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Diagnostic Findings</Typography>
                            {issues ?
                            <Typography variant='h5' fontWeight={'400'} mb='.75rem'>{issues}</Typography>:
                            <Typography variant='h5' fontWeight={'400'} mb='.75rem'>Nil</Typography>}
                        </Box>
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Repair Done</Typography>
                            <Box>
                            {repair_done.map((data, ind)=>{
                                return (
                                    <Box key={ind} className={'mid-btn small-rounded-btn'} sx={{height: '2rem'}}>
                                        <Typography variant='h5' fontWeight={'400'} >{data}</Typography>
                                    </Box>
                                )
                            })}
                            </Box>
                        </Box>
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Completetion Date</Typography>
                            <Typography variant='h5' fontWeight={'400'} mb='.75rem'>31 Feb, 2o24</Typography>
                        </Box>
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Image</Typography>
                            {images.lenth ?
                            <Box sx={{height: '11rem'}}>image here</Box>
                            
                            :
                            <Avatar sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar  size={'1.5rem'}/> </Avatar>}
                        </Box>
                        <Box className="mid-btn back-btn" onClick={()=> handleClose()}>
                            <Typography variant='h5' >Close</Typography>
                        </Box>

                        
                    </Box>
                        :
                    <Box>
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Diagnostic Findings</Typography>
                            <input className={inputError?'input input-error':'input'} name = {"issues"} value={''} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.25rem', background: "white", color: 'black'}}/>
                        </Box>
                        
                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.7rem'>System Repaired</Typography>

                            {/* <SelectFetchedUser /> */}
                            <Box sx={{height: '2.25rem', border: '1px solid gray', borderRadius: '.3rem' }}></Box>
                        </Box>

                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Completion Date</Typography>
                            <input className={inputError?'input input-error':'input'} name = {"issues"} value={''} onChange={(e)=> handleChange(e) } type="date" style={{width: '100%', height:'2.25rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box mb={'1rem'}>
                            <Typography variant='h5' fontWeight={'500'} mb='.75rem'>Add Image</Typography>
                            <input className={inputError?'input input-error':'input'} name = {"issues"} value={''} onChange={(e)=> handleChange(e) } type="text" style={{width: '100%', height:'2.25rem', background: "white", color: 'black'}}/>
                        </Box>

                        <Box>
                            <Avatar sx={{ background: '#1B61E4', color: 'white', height:'11rem', width: '100%', borderRadius: '.3rem', }}> <FaCar  size={'1.5rem'}/> </Avatar>
                        </Box>

                        {!isSM && <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                            <Box className='mid-btn back-btn'  sx={{mt: '1.5rem', height: '2.25rem', width: '10rem' }}>
                                <Typography variant='h5'>Cancel</Typography>
                            </Box>
                            <Box className='mid-btn primary-btn'  sx={{mt: '1.5rem', height: '2.25rem', width: '10rem' }}>
                                <Typography variant='h5'>Submit</Typography>
                            </Box>
                        </Box>}
                        
                        {isSM && <Box sx={{display: 'flex', justifyContent: 'space-between'}}> 
                            <Box className='mid-btn back-btn'  sx={{mt: '1.5rem', height: '2.25rem', width: '7rem' }}>
                                <Typography variant='h5'>Cancel</Typography>
                            </Box>
                            <Box className='mid-btn primary-btn'  sx={{mt: '1.5rem', height: '2.25rem', width: '7rem' }}>
                                <Typography variant='h5'>Submit</Typography>
                            </Box>
                        </Box>}
                    </Box>}

                </Box>
            </Modal>
        </div>
    );
}

export function PlannersFeedBackModal({data}) {
    const [feedback, setFeedback] = useState("")
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(data.rating)
    const [width, setWidth] = useState(window.innerWidth)
    const [modalStyle, setModalStyle] = useState(false)


    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        setCount(data.rating)
        setFeedback(data.feedback)

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div style={{borderColor: '#FFFFF'}}>
            <Box className='mid-btn hollow-btn' onClick={handleOpen} sx={{width: '100%',mt: '1rem' , height: '2.25rem' }} >
                <Typography variant='h5'>View Feedback</Typography> 
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={modalStyle? reportStyleMobile : reportStyle}>
                    <Typography variant="h4" fontWeight={'500'} textAlign={'center'} >Vehicle's Owner Rating</Typography>
                    {/* <Typography variant='h5' fontWeight={'500'} sx={{mt: '.75rem'}}>Are you satisfied </Typography> */}
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', m: '1.25rem 0', gap: '.75rem'}}>
                        <Box sx={{cursor: 'pointer'}}>{count >= 1? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 2? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 3? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 4? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>
                        <Box sx={{cursor: 'pointer'}}>{count >= 5? <GoStarFill className='starFill' size={'2rem'} />:<GoStar className='star' size={'2rem'} />} </Box>

                    </Box>
                    
                    <Typography variant='h5' fontWeight={'500'} sx={{mb: '1.3rem'}}>Feedback</Typography>
                    <Typography variant='h5' fontWeight={'400'} sx={{mb: '1.3rem'}}>{feedback}</Typography>

                    <Box className='mid-btn back-btn' onClick={handleClose}  sx={{mt: '1.5rem', height: '2.25rem' }}>
                        <Typography variant='h5'>Close</Typography>
                    </Box>
                    
                </Box>
            </Modal>
        </div>
    );
}

