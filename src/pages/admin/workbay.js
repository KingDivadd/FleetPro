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
import MenuBar from 'components/menu-bar';
import AdminSideBar from 'components/admin-component/side-bar';
import AdminSideBarMobile from 'components/admin-component/side-bar';
import AlertMessage from 'components/snackbar';

const Workbay = ()=>{
    const [search, setSearch] = useState("")
    const {planMaintInput, setPlanMaintInput} = ChatState()
    const [vehiclePresent, setVehiclePresent] = useState(true)
    const navigate = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userInfo'))
        if(user === null){
            navigate('/login')
        }else{
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
    }, [])

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setSearch(value)
        setPlanMaintInput(value)
    }
    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            <AdminSideBar />
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                <Box sx={{width: '100%', height: 'auto'}}>
                {/* right top section */}
                <MenuBar />
                {/* right bottom section */}
                {vehiclePresent? <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
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
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', overflow: 'hidden'}}>
                            <PlannedMaintTables />
                        </Box> 
                    </Box>
                </Grid>
                :
                <Grid sx={{height:'calc(100vh - 3.5rem)', mt: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', ml: '.5rem', borderRadius: '.3rem'}}>
                    <Typography variant={'h3'} fontWeight={'500'} >
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