import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined, LensBlurRounded } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard, ReportCard } from 'components/role-card';
import Table, { CustomizedTables,CustomizedTablesVlog ,ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CreateLogModal, ReportModal} from 'components/modal';
import SideBar from 'components/side-bar';
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import one from '../../asset/one.jpg'
import two from '../../asset/two.jpg'
import three from '../../asset/three.jpg'
import MenuBar from 'components/menu-bar';


const Report = ()=>{
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

    const handlePlanMaint = ()=>{
        console.log("plan maintenance")
        if(modal){
            setModal(false)
        }
        if (!modal){
            setModal(true)
        }
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
            <SideBar />
            {/* right side */}
            <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{overflowY:'auto', height: '100vh' }} >
                {/* right top section */}
                <Box sx={{width: '100%', height: 'auto'}}>
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.5rem',  p: '0 .5rem', overflow: "hidden",}}  >
                        <Box sx={{width: '100%', background: 'white', borderRadius: '.3rem',p:'.75rem'}}>
                            <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1.5fr))',justifyContent: 'space-between',gap: '1rem',mb: '1rem'}}>
                                <Typography variant="h2" fontWeight={'600'}>Incedent Report</Typography>
                                <Box sx={{width:'100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <ReportModal />
                                </Box>
                            </Box>
                            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '.75rem',mt: '.75rem'}} >
                                <ReportCard image={one} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={two} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={three} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={one} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={two} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={three} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                                <ReportCard image={one} location={"Akure, Oja Oba Market"} description={"A Vehicle hit my car which was parked at the side of the road."} />
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Grid> 
        </Grid>
    )
}

export default Report