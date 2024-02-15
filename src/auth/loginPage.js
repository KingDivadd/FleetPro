import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import david from '../asset/david.jpg'
import AlertMessage from '../components/snackbar'
import auth1 from '../asset/auth1.png'

const Login = () => {
        const [credentials, setCredentials] = useState({ username: "", password: "" })
        const [loading, setLoading] = useState(false);
        const [inputError, setInputError] = useState(false)
        const [show, setShow] = useState(false)
        const [nam, setNam] = useState([])
        const [isOnline, setIsOnline] = useState(navigator.onLine);

        const navigate = useNavigate()

        const { setAlertMsg, setOpenAlert, setAlertSeverity, user, setUser } = ChatState() //serverity: 'warning', msg: 'Field cannot be empty', openAlert: true
        const [width, setWidth] = useState(window.innerWidth)
        const theme = useTheme();

        const resize = () => {
            setWidth(window.innerWidth)
        }

        useEffect(() => {
            window.addEventListener('resize', resize)
            return () => {
                window.removeEventListener('resize', resize)
            }
        }, [width])
        const isNonMobileScreens = useMediaQuery("(min-width: 925px)");
        const MobileScreens = useMediaQuery("(min-width: 780px)");

        const handleChange = (e) => {
            const value = e.target.value
            const name = e.target.name
            setCredentials({...credentials, [name]: value })
        }

        const checkConnectivity = () => {
            setIsOnline(navigator.onLine);
        };
        setInterval(() => {
            checkConnectivity()
        }, 1000);

        const fetchUserInfo = async() => {
            try {
                const token = sessionStorage.getItem('token')
                const user = await axios.post("https://futa-fleet-guard.onrender.com/api/user/find-user", {}, {
                    headers: {
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                sessionStorage.setItem('userInfo', JSON.stringify(user.data))
                navigate('/dashboard')
            } catch (err) {
                if (!navigator.onLine) {
                    setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
                } else if (err.response) {
                    // Handle server errors
                    setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
                } else {
                    // Handle network errors
                    setAlertMsg("An error occurred"); setAlertSeverity("warning"); setOpenAlert(true); setLoading(false)
                }
            }
        }


        const handleSubmit = async(e) => {
            e.preventDefault()
            if (!credentials.password || !credentials.username) {
                setAlertMsg("Fields cannot be empty!!!"); setAlertSeverity('warning'); setOpenAlert(true); setLoading(false)
            } else {
                if(!navigator.onLine){
                    setAlertMsg("Network Error!!!"); setAlertSeverity('warning'); setOpenAlert(true); setLoading(false)
                }else{
                    setLoading(true);
                    handleLogin()
                }
            }
        }

        const handleLogin = async(e)=>{
            try {
                    const email_staffId = credentials.username
                    const password = credentials.password
                    const auth = await axios.post("https://futa-fleet-guard.onrender.com/api/auth/login", { email_staffId, password }, {
                        headers: {
                            "Content-type": "Application/json"
                        }
                    })
                    sessionStorage.setItem('token', auth.data.token)
                    setLoading(false)
                    setCredentials({ password: "", username: "" })
                    fetchUserInfo()
                } catch (err) {
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

        const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
        const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
        const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
        const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));


        return ( 
        <Grid container component = "main" sx = {{ height: '100vh', p: '.5rem', backgroundColor: "white",}}>
            {!isSM && <>{!isMD && <Grid item spacing = { '3rem' } xs = { 0 } sm = { 5 } md = { 5 } sx = {{ backgroundImage: `url(${auth1})`, backgroundRepeat: 'no-repeat', backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '1.5rem', p: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                <Box> 
                    <Typography variant = { 'h2' } fontWeight = { '400' } color = { 'white' } > FleetPro </Typography> 
                    <Box sx = {{ width: '100%', mt: '4rem' }}>
                        <Typography variant = { 'h2' } fontWeight = { '600' } color = { 'white' } > Get ready to revolutionizes how you track, schedule, and log </Typography> 
                        <Typography mt = { '1rem' } variant = { 'h6' } fontWeight = { '500' } color = { 'white' } > Start managing your maintenance with our user - friendly app. </Typography> 
                    </Box> 
                </Box>

                <Box sx = {{ width: '100%', p: '.75rem', border: '1px solid white', borderRadius: '.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', background: '#D1DFFA' }} >
                    <Typography variant = { 'h6' } fontWeight = { '500' } color = { '#1B61E4' } > Start managing your maintenance needs with our user - friendly app. </Typography> 
                    <Box sx = {{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '.5rem' }} >
                        <Box sx = {{
                                backgroundImage: `url(${david})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '3rem',
                                width: '3rem',
                                borderRadius: '50%',
                                p: '0.25rem',
                                backgroundColor: '#1B61E4'
                            }} > </Box> 
                        <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Typography variant = { 'h5' } fontWeight = { '500' } color = { '#1B61E4' } > Prof Dahunsi </Typography> 
                            <Typography variant = { 'h6' } fontWeight = { '500' } color = { '#1B61E4' } > Director of CESRA </Typography> 
                        </Box> 
                    </Box>

                </Box>

            </Grid>}

            {isMD && <Grid item spacing = { '3rem' } xs = { 0 } sm = { 5 } md = { 5 } sx = {{ backgroundImage: `url(${auth1})`, backgroundRepeat: 'no-repeat', backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '1rem', p: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                <Box> 
                    <Typography variant = { 'h2' } fontWeight = { '400' } color = { 'white' } > FleetPro </Typography> 
                    <Box sx = {{ width: '100%', mt: '4rem' }}>
                        <Typography variant = { 'h3' } fontWeight = { '500' } color = { 'white' } > Get ready to revolutionizes how you track, schedule, and log </Typography> 
                        <Typography mt = { '1rem' } variant = { 'h6' } fontWeight = { '500' } color = { 'white' } > Start managing your maintenance with our user - friendly app. </Typography> 
                    </Box> 
                </Box>

                <Box sx = {{ width: '100%', p: '.75rem', border: '1px solid white', borderRadius: '.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem', background: '#D1DFFA' }} >
                    <Typography variant = { 'h6' } fontWeight = { '500' } color = { '#1B61E4' } > Start managing your maintenance needs with our user - friendly app. </Typography> 
                    <Box sx = {{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '.5rem' }} >
                        <Box sx = {{
                                backgroundImage: `url(${david})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '3rem',
                                width: '3rem',
                                borderRadius: '50%',
                                p: '0.25rem',
                                backgroundColor: '#1B61E4'
                            }} > </Box> 
                        <Box sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Typography variant = { 'h5' } fontWeight = { '500' } color = { '#1B61E4' } > Prof Dahunsi </Typography> 
                            <Typography variant = { 'h6' } fontWeight = { '500' } color = { '#1B61E4' } > Director of CESRA </Typography> 
                        </Box> 
                    </Box>

                </Box>

            </Grid>}</>}

            <Grid item xs = { 12 } sm = { 7 } md = { 7 } sx = {{ background: theme.palette.background.alt, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                {!isSM && <Box sx = {{ my: 8, ml: '.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, maxWidth: '575px' }} >
                    <Typography component = { "h2" }  variant = 'h2' color = { 'black' } sx = {{ fontWeight: '600' }} > Welcome Back </Typography> 
                    <Avatar sx = {{ m: 1, bgcolor: 'warning.main' }} > <LockOutlinedIcon /> </Avatar> 
                    <Typography component = "h4" variant = "h4" > Sign in </Typography> 
                </Box>
}
                {isSM && 
                <Box sx = {{ my: 6, mx: 2, mb: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, maxWidth: '575px', width: '100%' }} >
                    <Typography  variant = 'h3' color = { 'black' } sx = {{ fontWeight: '600' }} > Welcome Back </Typography> 
                    <Avatar sx = {{ m: 1, bgcolor: 'warning.main' }} > <LockOutlinedIcon /> </Avatar> 
                    <Typography variant = "h5" fontWeight={'600'} > Sign in </Typography> 
                </Box>}

                {!isSM && <Box component = "form" noValidate onSubmit = { handleSubmit } sx = {{ mt: 1, p: '0 .5rem',ml: '.5rem', width: '100%', maxWidth: '575px', }} >

                    <Box >
                        <Typography variant = 'h5'
                        sx = {{ mb: '.5rem' }} > Email / Staff Id </Typography> 
                        <input className = {(inputError && nam.includes("username")) ? 'input-error input' : 'input' } name = { "username" } value = { credentials.username } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '3rem', background: "white", color: 'black', border: '1px solid gray' }}/> 
                    </Box> 

                    <Box sx = {{ mt: 3 }} >
                        <Typography variant = 'h5' sx = {{ mb: '.5rem' }} > Password </Typography> 
                        <input className = {(inputError && nam.includes("passsword")) ? 'input-error input' : 'input' } name = { "password" } value = {credentials.password }onChange = {
                            (e) => handleChange(e) } type = "password" style = {{ width: '100%', height: '3rem', background: "white", color: 'black', border: '1px solid gray' }}/> 
                    </Box> 

                    <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}  fullWidth  sx={{ height: '2.8rem',mt: '2.5rem', textTransform: 'none', position: 'relative'}}>
                        {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                        {!loading ? <Typography variant='h5'>Login</Typography> : ''}
                    </Box>
                    
                </Box>}

                {isSM && <Box component = "form" noValidate onSubmit = { handleSubmit } sx = {{ mt: '3rem', p: '0 1rem', width: '100%', maxWidth: '575px', }} >

                    <Box >
                        <Typography variant = 'h5'
                        sx = {{ mb: '.5rem' }} > Email / Staff Id </Typography> 
                        <input className = {(inputError && nam.includes("username")) ? 'input-error input' : 'input' } name = { "username" } value = { credentials.username } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2.5rem', background: "white", color: 'black', border: '1px solid gray' }}/> 
                    </Box> 

                    <Box sx = {{ mt: 3 }} >
                        <Typography variant = 'h5' sx = {{ mb: '.5rem' }} > Password </Typography> 
                        <input className = {(inputError && nam.includes("passsword")) ? 'input-error input' : 'input' } name = { "password" } value = {credentials.password }onChange = {
                            (e) => handleChange(e) } type = "password" style = {{ width: '100%', height: '2.5rem', background: "white", color: 'black', border: '1px solid gray' }}/> 
                    </Box> 

                    <Box disabled={loading} className='mid-btn primary-btn' onClick={handleSubmit}  fullWidth  sx={{ height: '2.5rem',mt: 5, textTransform: 'none', position: 'relative'}}>
                        {loading && <CircularProgress  size={26} style={{ position: 'absolute', left: '50%', top: '50%', marginTop: -12, marginLeft: -12, color: 'white' }} />}
                        {!loading ? <Typography variant='h5'>Login</Typography> : ''}
                    </Box>
                    
                </Box>}

                    {!isSM && <Grid container sx = {{ p: '2rem .5rem', maxWidth: '575px', ml: '.5rem'}} >
                        <Grid item xs >
                        <Box onClick = {() => navigate('/recover-password') } sx = {{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Typography variant = 'h7' color = 'cornflowerblue' sx = {{ textTransform: 'none' }} > Forgot password ? </Typography>  </Box> </Grid> <Grid item xs >
                        <Box onClick = {() => navigate('/signup') } sx = {{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                        <Typography variant = 'h7' color = 'cornflowerblue' sx = {{ textTransform: 'none' }} >Don't have an account? Sign Up </Typography>  </Box> </Grid> 
                    </Grid> }

                    {isSM && 
                    <Grid container component={'main'} sx = {{ p: '2rem .5rem', maxWidth: '575px', gap: '.75rem' }} >
                        <Grid item md={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} >
                            <Box onClick = {() => navigate('/recover-password') } sx = {{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                            <Typography variant = 'h7' color = 'cornflowerblue' sx = {{ textTransform: 'none' }} > Forgot password ? </Typography>  </Box> 
                        </Grid> 
                        <Grid item md={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}} >
                            <Box onClick = {() => navigate('/signup') } sx = {{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', }} >
                            <Typography variant = 'h7' color = 'cornflowerblue' sx = {{ textTransform: 'none' }}>Don't have an account? Sign Up </Typography>  </Box> 
                        </Grid> 
                    </Grid> }

                    <AlertMessage / >
            </Grid> 
                        
        </Grid>
    );
}



export default Login