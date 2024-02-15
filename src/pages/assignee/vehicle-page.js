import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import SideBar from 'components/side-bar';
import SideBarMobile from 'components/side-bar-mobile';
import AdminSideBar from 'components/admin-component/side-bar';
import AdminSideBarMobile from 'components/admin-component/side-bar-mobile';
import MaintSideBar from 'components/maint-side-bar';
import MaintSideBarMobile from 'components/maint-side-bar-mobile';
import one from '../../asset/one.jpg'
import two from '../../asset/two.jpg'
import three from '../../asset/three.jpg'
import MenuBar from 'components/menu-bar';
import AlertMessage from 'components/snackbar';
import { SkeletonAnimations } from 'components/skeleton';
import Skeleton from '@mui/material/Skeleton';


const VehiclePage = ()=>{
    const navigate = useNavigate()
    const [vehicle, setVehicle] = useState({})
    const {setOpenAlert, setAlertSeverity, setAlertMsg} = ChatState()
    const [show, setShow] = useState(false)
    const [vehiclePresent, setVehiclePresent] = useState(true)
    const [role, setRole]= useState("")
    const [menuIcon, setMenuIcon] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)


    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userInfo'))
        if(user === null){
            navigate('/login')
        }else{
            setRole(user.loggedInUser.role)
            let vehicle;
            if (user.loggedInUser.role !== 'driver'){
                vehicle = user.loggedInUser.vehicle
                if (vehicle === null || vehicle === undefined){
                    setAlertMsg("No vehicle is assiged to you yet."); setAlertSeverity("warning"); setOpenAlert(true); setShow(false); setVehiclePresent(false)
                }else{
                    setVehiclePresent(true)
                    fetchUserVehicle()
                }
            }
            else if (user.loggedInUser.role === 'driver'){
                let owner = user.vehicle_assignee
                vehicle = owner.vehicle
                if (vehicle === null || vehicle === undefined){
                    setAlertMsg("No vehicle is assiged to you yet."); setAlertSeverity("warning"); setOpenAlert(true); setShow(false); setVehiclePresent(false)
                }else{
                    fetchUserVehicle()
                    setVehiclePresent(true)
                }
            }
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

    
    const fetchUserVehicle = async()=>{
        
        // console.log('here', JSON.parse(sessionStorage.getItem('userInfo').loggedInUser))
        try {
            // setRole(JSON.parse(sessionStorage.getItem('userInfo').loggedInUser.role))
            const token = sessionStorage.getItem('token')
            const userVehicle = await axios.post("https://futa-fleet-guard.onrender.com/api/vehicle/user-vehicle",{},{
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                    }
            })
            setVehicle(userVehicle.data.userVehicle)
            setShow(true)
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
            setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setShow(false)
            } else if (err.response) {
            // Handle server errors
            setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setShow(false);

            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true); setShow(false);
            }
        }
    }

    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <>
            {vehiclePresent?
                <>
            {show ?
            <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>

            {(role === "vehicle_assignee" || role === "driver") && <SideBar />}
            {((role === "vehicle_assignee" || role === "driver") && menuIcon) && <SideBarMobile />}

            {role === "vehicle_coordinator" && <AdminSideBar />}
            {(role === "vehicle_coordinator" && menuIcon) && <AdminSideBarMobile />}

            {role === "maintenance_personnel" && <MaintSideBar />}
            {(role === "maintenance_personnel" && menuIcon) && <MaintSideBarMobile />}



            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{overflowY:'auto', height: '100vh'}} >
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                <MenuBar />
                {/* right bottom section */}
                <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden",}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '.75rem',}}>
                        <Box sx={{backgroundImage: `url(${one})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '.5rem',
                                height: '19rem',
                                }}>
                        </Box>
                        <Box sx={{backgroundImage: `url(${two})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '0.5rem',
                                height: '19rem',
                                }}>
                        </Box>

                        <Box sx={{backgroundImage:  `url(${three})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '0.5rem',
                                height: '19rem',
                                }}>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.25rem',}}>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Vehicle Name</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.vehicle_name}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Vehicle Brand</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.brand}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Plate Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.plate_no}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Engine Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.engine_no}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Chasis Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.chasis_no}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Fuel Type</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.fuel_type}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Transmission Type</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.transmission}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Body Color</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.vehicle_color}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Current Mileage</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.current_mileage}</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Last Recored Loaction</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>{vehicle.current_location}</Typography>
                            </Box>


                        </Box> 
                    </Box>
                </Grid>
                </Box>
            </Grid> 
            <AlertMessage />
            </Grid>
            :
            <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>


                {(role === "vehicle_assignee" || role === "driver") && <SideBar />}
                {((role === "vehicle_assignee" || role === "driver") && menuIcon) && <SideBarMobile />}

                {role === "vehicle_coordinator" && <AdminSideBar />}
                {(role === "vehicle_coordinator" && menuIcon) && <AdminSideBarMobile />}

                {role === "maintenance_personnel" && <MaintSideBar />}
                {(role === "maintenance_personnel" && menuIcon) && <MaintSideBarMobile />}

            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{overflowY:'auto', height: '100vh'}} >
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                <MenuBar />
                {/* right bottom section */}
                <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden",}}  >
                    {!isSM && <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))', gap: '.75rem',}}>
                            <Skeleton animation="wave" width={'100%'} sx={{mt: '-1.25rem', mb: '-1.25rem', height: '19rem'}} />
                            <Skeleton animation="wave" width={'100%'} sx={{mt: '-1.25rem', mb: '-1.25rem', height: '19rem'}} />
                            <Skeleton animation="wave" width={'100%'} sx={{mt: '-1.25rem', mb: '-1.25rem', height: '19rem'}} />

                    </Box>}

                    {isSM && <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))', gap: '.75rem',}}>
                            <Skeleton animation="wave" width={'100%'} sx={{mt: '-1.25rem', mb: '-1.25rem', height: '19rem'}} />

                    </Box>}

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        {!isSM && <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))', gap: '1.25rem',}}>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                        </Box>} 
                        
                        {isSM && <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))', gap: '1.25rem',}}>
                            
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem', height: '4rem'}}>
                                <Skeleton animation="wave" height={'100%'} width={'100%'} />
                            </Box>
                        </Box>} 
                    </Box>
                </Grid>
                </Box>
            </Grid> 
            <AlertMessage />
            </Grid>
            }
            </>

            :

            <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            {(role === "vehicle_assignee" || role === "driver") && <SideBar />}
            {((role === "vehicle_assignee" || role === "driver") && menuIcon) && <SideBarMobile />}

            {role === "vehicle_coordinator" && <AdminSideBar />}
            {(role === "vehicle_coordinator" && menuIcon) && <AdminSideBarMobile />}

            {role === "maintenance_personnel" && <MaintSideBar />}
            {(role === "maintenance_personnel" && menuIcon) && <MaintSideBarMobile />}
            
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{overflowY:'auto', height: '100vh'}} >
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                <MenuBar />
                {/* right bottom section */}
                <Grid sx={{height:'calc(100vh - 3.5rem)', mt: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', ml: '.5rem', borderRadius: '.3rem'}}>
                    <Typography variant={'h3'} textAlign={'center'} fontWeight={'500'} >
                        No Vehicle is assiged to you yet.
                    </Typography>
                </Grid>
                </Box>
            </Grid> 
            </Grid>}
            <AlertMessage />
        </>
    )
}

export default VehiclePage