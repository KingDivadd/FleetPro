import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard } from 'components/role-card';
import  { PlannedMaintTables, ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import PlanMaintenance from 'components/modal';
import SideBar from 'components/side-bar';
import MaintSideBar from 'components/maint-side-bar'
import MaintSideBarMobile from 'components/maint-side-bar-mobile'
import AdminSideBar from 'components/admin-component/side-bar'
import AdminSideBarMobile from 'components/admin-component/side-bar-mobile'
import MenuBar from 'components/menu-bar';
import AlertMessage from 'components/snackbar';
import SideBarMobile from 'components/side-bar-mobile';


const Workbay = ()=>{
    const [search, setSearch] = useState("")
    const [vehiclePresent, setVehiclePresent] = useState(true)
    const navigate = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity, planMaintInput, setPlanMaintInput, menu, setMenu} = ChatState()
    const [role, setRole] = useState("")
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
                    setAlertMsg("No vehicle is assiged to you yet"); setOpenAlert(true); setAlertSeverity("warning")
                    setVehiclePresent(false)
                }else{
                    setVehiclePresent(true)
                }
            }
            else if (user.loggedInUser.role === 'driver'){
                let owner = user.vehicle_assignee
                vehicle = owner.vehicle
                if (vehicle === null || vehicle === undefined){
                    setAlertMsg("No vehicle is assiged to you yet"); setOpenAlert(true); setAlertSeverity("warning")
                    setVehiclePresent(false)
                }else{
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

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setSearch(value)
        setPlanMaintInput(value)
    }
    
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            {(role === "vehicle_assignee" || role === "driver") && <SideBar />}
            {((role === "vehicle_assignee" || role === "driver") && menuIcon) && <SideBarMobile />}

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
                {vehiclePresent? <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >

                    {!isSM && 
                    <>
                        {!isMD && <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                                <Typography variant='h2' sx={{fontWeight: '600'}}>Workbay</Typography>
                                <PlanMaintenance />
                            </Box>
                            <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
                                        <Box sx={{position: 'absolute', p: '.2rem', height: '100%', left: '.15rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><IoSearch size={'1.5rem'} /></Box>
                                        <input className='input  search-input' name = 'serch-text' value={planMaintInput} placeholder='Search for maint. logs' onChange={(e)=> handleChange(e) } type="text" style={{width: '23rem', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', paddingLeft: '2.5rem'}}/>   
                                    </Box>
                                </Box>
                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                    <input className='input' onChange={handleChange} type="date" name="search" value={search} style={{height: '2.5rem', width: '11rem', outline: 'none', padding: '0 .75rem', fontSize: '1rem'}} />
                                </Box>
                            </Box>
                        </Box>}

                        {isMD && <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                            <Typography variant='h3' sx={{fontWeight: '500'}}>Workbay</Typography>
                            <PlanMaintenance />
                        </Box>

                        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', width: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', width: '100%'}}>
                                    <Box sx={{position: 'absolute', p: '.2rem', height: '100%', left: '.15rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><IoSearch size={'1.35rem'} /></Box>
                                    <input className='input  search-input' name = 'serch-text' value={planMaintInput} placeholder='Search for maint. logs' onChange={(e)=> handleChange(e) } type="text" style={{height:'2.5rem', width: '100%', background: "white", color: 'black', border: '1px solid gray', paddingLeft: '2.5rem'}}/>   
                                </Box>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                                <Box className="mid-btn primary-btn" sx={{width: '10rem', height: '2.25rem'}}>Filter</Box>
                                <input className='input' onChange={handleChange} type="date" name="search" value={search} style={{height: '2.25rem', width: '10rem', outline: 'none', padding: '0 .75rem', fontSize: '1rem'}} />
                            </Box>
                        </Box>
                        </Box>}
                    </>
                    
                    }

                    {isSM && <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                            <Typography variant='h3' sx={{fontWeight: '500'}}>Workbay</Typography>
                            <PlanMaintenance />
                        </Box>

                        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', width: '100%'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', width: '100%'}}>
                                    <Box sx={{position: 'absolute', p: '.2rem', height: '100%', left: '.15rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><IoSearch size={'1.35rem'} /></Box>
                                    <input className='input  search-input' name = 'serch-text' value={planMaintInput} placeholder='Search for maint. logs' onChange={(e)=> handleChange(e) } type="text" style={{height:'2.5rem', width: '100%', background: "white", color: 'black', border: '1px solid gray', paddingLeft: '2.5rem'}}/>   
                                </Box>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                                <Box className="mid-btn primary-btn" sx={{width: '7rem', height: '2.25rem'}}>Filter</Box>
                                <input className='input' onChange={handleChange} type="date" name="search" value={search} style={{height: '2.25rem', width: '10rem', outline: 'none', padding: '0 .75rem', fontSize: '1rem'}} />
                            </Box>
                        </Box>
                    </Box>}

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', overflow: 'hidden'}}>
                            <PlannedMaintTables />
                        </Box> 
                    </Box>
                </Grid>
                :
                <Grid sx={{height:'calc(100vh - 3.5rem)', mt: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', ml: '.5rem', borderRadius: '.3rem'}}>
                    <Typography variant={'h3'} textAlign={'center'} fontWeight={'500'} >
                        No vehicle is assiged to you yet.
                    </Typography>
                </Grid>
                
                }
                </Box>
            </Grid> 
            <AlertMessage />
        </Grid>
    )
}

export default Workbay