import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined } from '@mui/icons-material';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DashCard, DriverCard, MaintAnalyticsCard, ServiceChartCard, ActiveDriverCard } from 'components/role-card';
import ActiveAdminCard from 'components/admin-component/card';
// import '../index.css'
import { IoMdHome } from "react-icons/io";
import { MdNoteAlt,MdHelpCenter } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { VscFeedback } from "react-icons/vsc";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { GiPathDistance, GiAutoRepair } from "react-icons/gi";
import { BsCalendarEventFill ,BsCalendar2PlusFill} from "react-icons/bs";
import AdminSideBar from 'components/admin-component/side-bar';
import AdminSideBarMobile from 'components/admin-component/side-bar-mobile';
import MenuBar from 'components/menu-bar';
import { FaCarAlt } from "react-icons/fa";
import { FaCarBurst } from "react-icons/fa6";
import { FaCarOn } from "react-icons/fa6";
import { FaCarCrash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const AdminDashboard = ()=>{
    const navigate = useNavigate()
    const [menuIcon, setMenuIcon] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => { 
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if (userInfo === null){navigate('/login')}
        else{
            setUser(userInfo); setShow(true);
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

    
    const handlePage = (value)=>{
        console.log(value)
        localStorage.setItem("page", value)
        navigate(`/${value}`)
    }

    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <>
            {show && <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden', background: '#FAFAFA'}}>
                {menuIcon && <AdminSideBarMobile />}
                <AdminSideBar />
                {/* right side */}
                <Grid item xs={12} sm={8} md={9.5} lg={10} direction="column" justifyContent="space-between" alignItems="flex-start" sx={{background: '#FAFAFA', height: '100vh', overflowY:'auto'}} >
                    <Box sx={{width: '100%', height: 'auto'}}>
                    {/* right top secction */}
                    <MenuBar />
                    {/* right bottom section */}
                    <Grid container sx={{ mt: '.75rem',p:'.35rem'}}  >
                        <Grid  item xs={12} sm={12} md={7.5} lg={8.5}  sx={{background: '#FAFAFA',p: '.5rem .35rem', borderRadius: '.3rem', overflowY:'auto', }}>
                            {!isSM && <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: 1 }}>
                                <Typography component={"h2"} variant='h2' color={'black'} sx={{fontWeight: '600'}}>Welcome {user.loggedInUser.firstName}</Typography>
                                <Typography component="h5" variant="h4">Manage all vehicles.</Typography>
                            </Box>}
                            {isSM && <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: 1 }}>
                                <Typography component={"h2"} variant='h3' color={'black'} sx={{fontWeight: '600'}}>Welcome {user.loggedInUser.firstName}</Typography>
                                <Typography component="h5" variant="h5">Manage all vehicles.</Typography>
                            </Box>}

                            <Box sx={{mt: '2rem',display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '.75rem',}}>
                                <DashCard title={'Available Vehicles'} value={0} icon={ <FaCarAlt size={'2rem'} color='#1B61E4' />} suffix={""} />
                                <DashCard title={"Unassigned Vehicles"} value={40} icon={<FaCarOn size={'2rem'} color='orangered' />} suffix={""} />
                                <DashCard title={"Assigned Driver"} value={90} icon={<IoPerson  size={'2rem'} color='orangered'/>} suffix={"Km"} />
                                <DashCard title={"Unassigned Driver"} value={"200"} icon={<IoPerson  size={'2rem'} color='green'/>} suffix={"Km"} />
                                <DashCard title={"Vehicle Assignee"} value={"28 January, 2024"} icon={<IoPerson size={'2rem'} color='#1B61E4
                                ' />} suffix={""} />
                                <DashCard title={"Unoperational Vehicles"} value={"10 Febuary, 2024"} icon={<FaCarCrash size={'2rem'} color='brown' />} suffix={""} />
                            </Box>
                            <Box sx={{mt: '.75rem'}}>
                                <MaintAnalyticsCard />
                            </Box>
                        </Grid>

                        {!isSM && <>
                        {!isMD && 
                        <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem', pr: '.7rem',}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                                <ActiveAdminCard />
                                <ServiceChartCard />
                            </Box>

                        </Grid>}
                        {isMD && <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem',}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                                <ActiveAdminCard />
                                <ServiceChartCard />
                            </Box>

                        </Grid>}</>
                        }
                        {isSM && <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                                <ActiveAdminCard />
                                <ServiceChartCard />
                            </Box>

                        </Grid>}
                    </Grid>
                    </Box>
                </Grid> 
            </Grid>}
        </>
    )
}

export default AdminDashboard