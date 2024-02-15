import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { PersonOutlineOutlined, NotificationsActiveOutlined } from '@mui/icons-material';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, {  DashCard, MaintAnalyticsCard, ServiceChartCard,  MaintPersonnelCard, MaintDashCard, UpcomingWorksCard } from 'components/role-card';
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
import SideBar from 'components/side-bar';
import SideBarMobile from 'components/side-bar-mobile'
import MaintSideBar from 'components/maint-side-bar';
import MaintSideBarMobile from 'components/maint-side-bar-mobile';
import MenuBar from 'components/menu-bar';
import { MdPendingActions } from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import { LuCalendarClock } from "react-icons/lu";
import AlertMessage from 'components/snackbar';

const MaintDashboard = ()=>{
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [menuIcon, setMenuIcon] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [show, setShow] = useState(false)
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => { 
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if(userInfo === null){
            navigate('/login')
        }else{
            setUser(userInfo)
            setShow(true)
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
        <>{show && 
        <Grid container component={'main'}  sx={{height: '100vh', overflowY: 'hidden', background: '#FAFAFA'}}>
            {menuIcon && <MaintSideBarMobile />}
            <MaintSideBar />
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
                            <Typography component="h5" variant="h4">Everything you need to know about the institution's fleet.</Typography>
                        </Box>}
                        {isSM && <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: 1 }}>
                            <Typography component={"h2"} variant='h3' color={'black'} sx={{fontWeight: '600'}}>Welcome {user.loggedInUser.firstName}</Typography>
                            <Typography component="h5" variant="h5">Everything you need to know about the institution's fleet.</Typography>
                        </Box>}

                        <Box sx={{mt: '2rem',display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '.75rem',}}>
                            <MaintDashCard title={'Services Provided'} value={0} icon={ <TfiLayoutAccordionList size={'2rem'} color='#1B61E4' />} suffix={""} />
                            <MaintDashCard title={'Pending Requests'} value={0} icon={ <MdPendingActions size={'2.2rem'} color='#FF571A' />} suffix={""} />
                            <MaintDashCard title={'Completed Requests'} value={0} icon={ <FiCheckSquare size={'2rem'} color='#00B300'/>} suffix={""} />
                            <MaintDashCard title={'Avg Response Time'} value={0} icon={ <LuCalendarClock size={'2rem'} color='#1B61E4' />} suffix={""} />
                        </Box>

                        <Box sx={{mt: '.75rem'}}>
                            <MaintAnalyticsCard />
                        </Box>
                    </Grid>

                    {!isSM && <>
                    {!isMD && 
                    <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem', pr: '.7rem',}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                            <MaintPersonnelCard info={user.loggedInUser} />
                            <UpcomingWorksCard />
                        </Box>

                    </Grid>}
                    {isMD && <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem',}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                            <MaintPersonnelCard info={user.loggedInUser} />
                            <UpcomingWorksCard />
                        </Box>

                    </Grid>}</>
                    }
                    {isSM && <Grid item xs={12} sm={12} md={4.5} lg={3.5} sx={{ overflowY:'auto', p: '.5rem .35rem'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'flex-start', gap: '.75rem' }}>
                            <MaintPersonnelCard info={user.loggedInUser} />
                            <UpcomingWorksCard />
                        </Box>

                    </Grid>}
                </Grid>
                </Box>
            </Grid> 
        </Grid>}
        </>
    )
}

export default MaintDashboard