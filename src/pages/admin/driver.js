import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard } from 'components/role-card';
import Table, { CustomizedTables,CustomizedTablesVlog ,ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import {CreateLogModal} from 'components/modal';
import AddVehicleModal, {AddDriverModal} from "../../components/admin-component/modal"
import SideBar from 'components/side-bar';
import AdminSideBar from 'components/admin-component/side-bar';
import AdminSideBarMobile from 'components/admin-component/side-bar-mobile';
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import MenuBar from 'components/menu-bar';
import VehicleTables, {DriversTable} from 'components/admin-component/table';



const Drivers = ()=>{
    const [page, setPage] = useState("")
    const [text, setText] = useState("")
    const [age, setAge] = useState("")
    const [modal, setModal] = useState(false)
    const [filter, setFilter] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getPage = localStorage.getItem("page")
        setPage(getPage)
    }, [])
    const handlePage = (value)=>{
        console.log(value)
        localStorage.setItem("page", value)
        navigate(`/${value}`)
    }

    const handleWorkbay = (e)=>{
        setText(e.target.value)
    }

    const handleFilter = ()=>{
        if (filter){
            setFilter(false)
        }
        if (!filter){
            setFilter(true)
        }
    }
    return (
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden',}}>
            <AdminSideBar />
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ overflowY:'auto', height: '100vh'}} >
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                <MenuBar />
                {/* right bottom section */}
                <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden"}}  >
                    <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '2rem' }} >
                            <Typography variant='h2' sx={{fontWeight: '600'}}>Drivers</Typography>
                            {/* <AddVehicleModal /> */}
                        </Box>
                        <Box  sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',justifyContent: 'space-between',width: '100%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem'}}>
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
                                    <Box sx={{position: 'absolute', p: '.2rem', height: '100%', left: '.15rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><IoSearch size={'1.5rem'} /></Box>
                                    <input className='input  search-input' name = 'serch-text' value={text} placeholder='Search for maint. logs' onChange={(e)=> handleWorkbay(e) }type="text" style={{width: '23rem', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray', paddingLeft: '2.5rem'}}/>   
                                </Box>

                                <Box className='hollow-btn' onClick={handleFilter} sx={{width: '8rem', p: '0 .85rem' }}>
                                    <Box sx={{height: '100%', display: 'flex', alignItems: 'center'}}>
                                        {filter ? <TbSortAscending size={'1.5rem'} /> : <TbSortDescending size={'1.5rem'} /> }
                                    </Box>
                                    <Typography variant='h5' fontWeight={'500'}>Filter</Typography> 
                                </Box>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                <input type="date" name="" id="" style={{height: '2.5rem', width: '10rem', outline: 'none', padding: '0 .75rem', fontSize: '1rem', outline: 'none'}} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',  mt: '.5rem',background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                        {/* the table */}
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden'}}>
                            <DriversTable />
                        </Box> 
                    </Box>
                </Grid>
                </Box>
            </Grid> 
        </Grid>
    )
}

export default Drivers