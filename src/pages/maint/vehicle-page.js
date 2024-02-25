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
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard } from 'components/role-card';
import Table, { CustomizedTables,CustomizedTablesVlog ,ReactVirtualizedTable } from 'components/table';
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CreateLogModal} from 'components/modal';
import SideBar from 'components/side-bar';
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import one from '../../asset/one.jpg'
import two from '../../asset/two.jpg'
import three from '../../asset/three.jpg'
import MenuBar from 'components/menu-bar';


const VehiclePage = ()=>{
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
                                <Typography variant={'h4'} fontWeight={'500'}>Hunder Accord 2012 Model</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Vehicle Brand</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>Hunder</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Plate Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>KTU-09EL</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Engine Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>ABCDEFGH2024</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Chasis Number</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>EFGHIJK2345</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Fuel Type</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>PMS</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Transmission Type</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>Automatic Transmission</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Body Color</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>Gray</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Current Mileage</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>120,000Km</Typography>
                            </Box>

                            <Box className='car-box' sx={{border: '1px solid gray', borderRadius: '.3rem', p: '.5rem'}}>
                                <Typography mb={'.75rem'} variant={'h5'} fontWeight={'500'}>Last Recored Loaction</Typography>
                                <Typography variant={'h4'} fontWeight={'500'}>Akure, Obanla</Typography>
                            </Box>


                        </Box> 
                    </Box>
                </Grid>
                </Box>
            </Grid> 
        </Grid>
    )
}

export default VehiclePage