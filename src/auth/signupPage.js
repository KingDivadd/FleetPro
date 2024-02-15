import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import MaintPersonnel, { Assigee, DriverCard } from 'components/role-card';
import { AiOutlineRollback } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import david from "../asset/david.jpg"
import auth1 from '../asset/auth1.png'
import auth2 from '../asset/auth2.png'
import AlertMessage from '../components/snackbar'
import CircularProgress from '@mui/material/CircularProgress';



const Signup = () => {
    const [credentials, setCredentials] = useState({role: "", firstName: '', lastName: '', email: '',staffId: '', phone: '',password: ''})
    const [level, setLevel] = useState(true)
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const {userRole, setUserRole, setAlertMsg, setOpenAlert,  setAlertSeverity, user, setUser} = ChatState()
    
    const navigate = useNavigate()
    
    const [width, setWidth] = useState(window.innerWidth)
    const theme = useTheme();
    
    const resize = ()=>{
        setWidth(window.innerWidth)
    }
    
    useEffect(() => {
        // window.addEventListener('resize', resize)
        // return()=>{
        //     window.removeEventListener('resize', resize)
        // }
        setCredentials({...credentials, role: userRole.value})
    }, [width, userRole])

    const isNonMobileScreens = useMediaQuery("(min-width: 925px)");
    const MobileScreens = useMediaQuery("(min-width: 780px)");

    const checkConnectivity = () => {
        setIsOnline(navigator.onLine);
    };

    setInterval(() => {
        checkConnectivity()
    }, 1000);
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        // first check if all filds are filled
        if (!credentials.role || !credentials.lastName || !credentials.firstName || !credentials.email || !credentials.staffId || !credentials.phone || !credentials.password){
            setAlertMsg("Please fill all fields"); setOpenAlert(true);  setAlertSeverity('warning'); setLoading(false);
        }else{

            if (!navigator.onLine){
                setAlertMsg("Network Error"); setOpenAlert(true);  setAlertSeverity('warning'); setLoading(false);
            }
            else{    
                try {
                    setLoading(true)
                    const {role, firstName, lastName, email, password, staffId, phone} = credentials
                    const auth = await axios.post("https://futa-fleet-guard.onrender.com/api/auth/signup", {role, firstName, lastName, email, phone, staffId, password}, {
                        headers: {
                            "Content-type": "Application/json"
                        }
                    })
                    console.log(auth.data)
                    sessionStorage.setItem('token', auth.data.token)
                    sessionStorage.setItem('userInfo', JSON.stringify(auth.data))
                    setAlertMsg("Account created successfully."); setAlertSeverity('success'); setOpenAlert(true); setLoading(false)
                    setCredentials({...credentials, role: "", firstName: '', lastName: '', email: '',staffId: '', phone: '',password: ''})
                    navigate('/dashboard')

                    } catch (err) {
                        console.log(err)
                        // will check for internet
                        if (!navigator.onLine) {
                            setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
                        } else if (err.response) {
                            // Handle server errors
                            setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true);setLoading(false)
                        } else {
                            // Handle network errors
                            setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
                        }
                    }
            }
        }
    }

    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name
        setCredentials({...credentials, [name]: value})
    }
    

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <Grid container component="main" sx={{ height: '100vh', p:'.5rem', overflowY: 'auto',}}>
        
            {!isSM && <> 
            
            {!isMD &&   <>
                {userRole.boo ?
                <Grid item xs={0} sm={5} md={5} sx={{backgroundImage: `url(${auth2})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1.5rem',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                p: '2.5rem'
                }}> 
                    <Typography variant={'h2'} fontWeight={'400'} color={'white'}>FleetPro</Typography>
                    
                </Grid>
                :
                <Grid item xs={0} sm={5} md={5} sx={{backgroundImage: `url(${auth1})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1.5rem',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                p: '2.5rem'

                }}>
                    <Box>
                    <Typography variant={'h2'} fontWeight={'400'} color={'white'}>FleetPro</Typography>
                        <Box sx={{width: '100%', mt: '4rem'}}>
                            <Typography variant={'h2'} fontWeight={'600'} color={'white'}> Are you wanting to stay connected with your vehicle ?</Typography>
                            <Typography mt={'1rem'} variant={'h6'} fontWeight={'500'} color={'white'}>Start managing your maintenance needs with our user-friendly app.  </Typography>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',p: '.75rem', border: '1px solid white', borderRadius: '.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', background: '#D1DFFA'}}>
                        <Typography variant={'h6'} fontWeight={'500'} color={'#1B61E4'}>I find it very easy to monitor and get all maintenance issues relating to my vehicle sorted without having to stress myself.</Typography>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '.5rem'}}>
                            <Box sx={{
                            backgroundImage: `url(${david})`,
                            backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',
                            height: '3rem', width: '3rem', borderRadius: '50%',p: '0.25rem', backgroundColor: '#1B61E4'
                            }}></Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                            <Typography variant={'h5'} fontWeight={'500'} color={'#1B61E4'}>Prof Dahunsi</Typography>
                            <Typography variant={'h6'} fontWeight={'500'} color={'#1B61E4'}>Director of CESRA </Typography>
                        </Box>
                        </Box>
                        
                    </Box>

                </Grid>
                }
            </>}

            {isMD &&  <>
                {userRole.boo ?
                <Grid item xs={0} sm={5} md={5} sx={{backgroundImage: `url(${auth2})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1rem',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                p: '1.75rem'
                }}> 
                    <Typography variant={'h3'} fontWeight={'500'} color={'white'}>FleetPro</Typography>
                    
                </Grid>
                :
                <Grid item xs={0} sm={5} md={5} sx={{backgroundImage: `url(${auth1})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '1rem',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
                p: '1.75rem'

                }}>
                    <Box>
                    <Typography variant={'h3'} fontWeight={'500'} color={'white'}>FleetPro</Typography>
                        <Box sx={{width: '100%', mt: '4rem'}}>
                            <Typography variant={'h3'} fontWeight={'600'} color={'white'}> Are you wanting to stay connected with your vehicle ?</Typography>
                            <Typography mt={'1.5rem'} variant={'h6'} fontWeight={'500'} color={'white'}>Start managing your maintenance needs with our user-friendly app.  </Typography>
                        </Box>
                    </Box>

                    <Box sx={{width: '100%',p: '.75rem', border: '1px solid white', borderRadius: '.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', background: '#D1DFFA'}}>
                        <Typography variant={'h6'} fontWeight={'500'} color={'#1B61E4'}>I find it very easy to monitor and get all maintenance issues relating to my vehicle sorted without having to stress myself.</Typography>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '.5rem'}}>
                            <Box sx={{
                            backgroundImage: `url(${david})`,
                            backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',
                            height: '3rem', width: '3rem', borderRadius: '50%',p: '0.25rem', backgroundColor: '#1B61E4'
                            }}></Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                            <Typography variant={'h5'} fontWeight={'500'} color={'#1B61E4'}>Prof Dahunsi</Typography>
                            <Typography variant={'h6'} fontWeight={'500'} color={'#1B61E4'}>Director of CESRA </Typography>
                        </Box>
                        </Box>
                        
                    </Box>

                </Grid>
                }
            </>}
            
            </>}

            {userRole.boo 
            ?
            <>
                {!isMD && <>
                    <Grid item xs={12} sm={7} md={7}  sx={{pl: '.5rem', background: theme.palette.background.alt, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography component={"h2"} variant='h2' color={'cornflowerblue'} sx={{fontWeight: '500', mb: 1}}>What are you registering as?</Typography>
                            <Typography component="h5" variant="h4" color= {'black'}> In order to preceed, you need to select your role. </Typography> 
                            <Box sx={{mt: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: '1.5rem',}}>
                                <MaintPersonnel onClick={()=> console.log("hello")}  />
                                <Assigee  onClick={()=> console.log("assignee")} />
                                <DriverCard onClick={()=> console.log("driver")}  />
                            </Box>
                        </Box>
                    </Grid>
                </>}

                {isMD &&  <>
                    <Grid item xs={12} sm={7} md={7} sx={{p: '.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography variant='h3' color={'cornflowerblue'} textAlign={'center'} sx={{fontWeight: '500', mb: 1}}>What are you registering as?</Typography>
                            <Typography fontWeight={'400'} textAlign={'center'} variant="h5" color= {'black'}> In order to preceed, you need to select your role. </Typography> 
                            <Box sx={{mt: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: '1.5rem',}}>
                                <MaintPersonnel onClick={()=> console.log("hello")}  />
                                <Assigee  onClick={()=> console.log("assignee")} />
                                <DriverCard onClick={()=> console.log("driver")}  />
                            </Box>
                        </Box>
                    </Grid>
                </>}
            </>
            :
            
            <>
                {!isSM && <Grid item xs={12} sm={7} md={7} sx={{pl: '.5rem', background: theme.palette.background.alt, overflowY: 'auto',p: '.5rem 0',}}> 
                    <Box sx={{ my:1, mx: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Typography component={"h2"} variant='h2' color={'black'} sx={{fontWeight: '500'}}>Create Account</Typography>
                        <Box sx={{cursor: 'pointer'}} onClick={()=> navigate('/login')} >
                            <Typography variant='h7' color='cornflowerblue' sx={{textTransform: 'none'}}>Already have an account, Login</Typography> 
                        </Box>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, p:'0 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>First Name</Typography>
                            <input className='input  search-input' name = {"firstName"} value={credentials.firstName} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Last Name</Typography>
                            <input className='input  search-input' name = {"lastName"} value={credentials.lastName} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}> Email</Typography>
                            <input className='input  search-input' name = {"email"} value={credentials.email} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Staff Id</Typography>
                            <input className='input  search-input' name = {"staffId"} value={credentials.staffId} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Phone</Typography>
                            <input className='input  search-input' name = {"phone"} value={credentials.phone} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{width: '100%', maxWidth: '575px'}}>
                            <Typography variant='h5' sx={{mb: '.45rem', }}>Password</Typography>
                            <input className='input  search-input' name = {"password"} value={credentials.password} onChange={(e)=> handleChange(e) } type="password" style={{width: '100%', height:'2.8rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        
                        <Box sx={{mt: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', width: '100%',maxWidth: '575px', gap: 4, pr: 0,}}>
                            
                            <Box className='mid-btn back-btn'  onClick={()=> setUserRole({...userRole, "boo":true})} sx={{height: '2.8rem',  textTransform: 'none',}}>
                                <AiOutlineRollback size={'1.5rem'} />
                                <Typography variant='h5' pl={'.5rem'} >Select Role</Typography>
                            </Box>  

                            <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}  fullWidth  sx={{ height: '2.8rem', textTransform: 'none', position: 'relative'}}>
                                {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                                {!loading ?<><Typography variant='h5'>Create Account</Typography>
                                <MdOutlineNavigateNext size={'1.7rem'} /> </> : ''}
                            </Box>                     
                        </Box>
                    </Box>
                </Grid>}

                {isSM && <Grid item xs={12} sm={7} md={7} sx={{background: theme.palette.background.alt,  overflowY: 'auto',p: '.5rem 0',}}> 
                    <Box sx={{ my:1, mx: 1, mb: '2.5rem'}}>
                        <Typography variant='h3' color={'black'} sx={{fontWeight: '500', display: 'flex', justifyContent: 'center'}}>Create Account</Typography>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{  p:'0 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>First Name</Typography>
                            <input className='input  search-input' name = {"firstName"} value={credentials.firstName} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Last Name</Typography>
                            <input className='input  search-input' name = {"lastName"} value={credentials.lastName} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}> Email</Typography>
                            <input className='input  search-input' name = {"email"} value={credentials.email} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Staff Id</Typography>
                            <input className='input  search-input' name = {"staffId"} value={credentials.staffId} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mb: 3, width: '100%', maxWidth: '575px'}} >
                            <Typography  variant='h5' sx={{mb: '.45rem'}}>Phone</Typography>
                            <input className='input  search-input' name = {"phone"} value={credentials.phone} onChange={(e)=> handleChange(e) }type="text" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{width: '100%', maxWidth: '575px'}}>
                            <Typography variant='h5' sx={{mb: '.45rem', }}>Password</Typography>
                            <input className='input  search-input' name = {"password"} value={credentials.password} onChange={(e)=> handleChange(e) } type="password" style={{width: '100%', height:'2.5rem', background: "white", color: 'black', border: '1px solid gray'}}/>
                        </Box>
                        <Box sx={{mt: 4.5, display: 'flex', justifyContent: 'center', cursor: 'pointer'}} onClick={()=> navigate('/login')} >
                            <Typography variant='h7' color='cornflowerblue' sx={{textTransform: 'none'}}>Already have an account, Login</Typography> 
                        </Box>

                        <Box sx={{mt: 4.5, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', width: '100%',maxWidth: '575px', gap: 4, pr: 0,}}>
                            
                            <Box className='mid-btn back-btn'  onClick={()=> setUserRole({...userRole, "boo":true})} sx={{height: '2.5rem',  textTransform: 'none',}}>
                                <AiOutlineRollback size={'1.5rem'} />
                                <Typography variant='h5' pl={'.5rem'} >Select Role</Typography>
                            </Box>  

                            <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}  fullWidth  sx={{ height: '2.5rem', textTransform: 'none', position: 'relative'}}>
                                {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                                {!loading ?<><Typography variant='h5'>Create Account</Typography>
                                <MdOutlineNavigateNext size={'1.7rem'} /> </> : ''}
                            </Box>                     
                        </Box>
                    </Box>
                </Grid>}
            </>

            }
            <AlertMessage />
        </Grid>
    );
}



export default Signup