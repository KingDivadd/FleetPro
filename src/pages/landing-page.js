import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { LandingPageCard } from 'components/role-card';
import five from '../asset/five.png'
import eight from '../asset/eight.png'
import { FaFacebookF } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";


const LandingPage = ()=>{
    const [page, setPage] = useState("")
    const navigate = useNavigate()
    const [menuIcon, setMenuIcon] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => { 
        const getPage = localStorage.getItem("page")
        setPage(getPage)
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

        const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
        const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
        const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
        const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <Grid container sx={{background: '#FAFAFA', height: 'auto', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>

            {!isSM && <>{!isMD && <Box sx={{height: '3rem', width: '100%',background: 'white',borderBottom: '1px solid grey', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,p: '0 5rem'}}> 
            
                <Box ><Typography variant={'h4'} fontWeight={'600'}>FleetPro</Typography> </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: '.75rem',}}>
                    <Box className="primary-btn hollow-btn" onClick={()=> navigate('/login')} sx={{width: '7rem',height: '2.5rem', border: '1px solid #1B61E4'}}>
                        <Typography variant={'h5'} >Login</Typography>
                    </Box>
                    <Box className="primary-btn register" onClick={()=> navigate('/signup')} sx={{height: '2.5rem', width: '7rem'}} >
                        <Typography variant={'h5'}>Register</Typography>
                    </Box>
                </Box>
                </Box>}
                {isMD && <Box sx={{height: '3rem', width: '100%',borderBottom: '1px solid grey', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,p: '0 2.5rem'}}> 
                
                    <Box ><Typography variant={'h4'} fontWeight={'600'}>FleetPro</Typography> </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: '.75rem',}}>
                        <Box className="primary-btn hollow-btn" onClick={()=> navigate('/login')} sx={{width: '7rem',height: '2.5rem', border: '1px solid #1B61E4'}}>
                            <Typography variant={'h5'} >Login</Typography>
                        </Box>
                        <Box className="primary-btn register" onClick={()=> navigate('/signup')} sx={{height: '2.5rem', width: '7rem'}} >
                            <Typography variant={'h5'}>Register</Typography>
                        </Box>
                    </Box>
                </Box>}</> }
            

            {isSM && 
            <Box sx={{height: '2.5rem', width: '100%',borderBottom: '1px solid grey', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,p: '0 .75rem'}}> 
            
                <Box ><Typography variant={'h4'} fontWeight={'600'}>FleetPro</Typography> </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: '.75rem',}}>
                    <Box className="primary-btn hollow-btn" onClick={()=> navigate('/login')} sx={{width: '5rem',height: '2.25rem', border: '1px solid #1B61E4'}}>
                        <Typography variant={'h6'} >Login</Typography>
                    </Box>
                    <Box className="primary-btn register" onClick={()=> navigate('/signup')} sx={{height: '2.25rem', width: '5rem'}} >
                        <Typography variant={'h6'}>Register</Typography>
                    </Box>
                </Box>
            </Box>}



            <Box sx={{minHeight: '90vh',height: 'auto', hackground: 'cyan',}}>
                {/* the first part */}
                <Grid container component={'main'}  sx={{height: '100%', overflowY: 'hidden'}}  >
                    {!isSM && <>{!isMD && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', pl: '5rem', height: '80vh'}} >
                        <Box sx={{width: '100%', }}>
                            <Typography variant='h1' fontWeight={'700'} lineHeight={'3.5rem'}>Efficient Vehicle Management Made Easy</Typography>
                            <Typography variant='h4' fontWeight={'500'} mt={'1.75rem'} lineHeight={'2rem'}>From preventive maintenance scheduling to repair tracking, this system is designed to simplified and allow you experience seamless management and enhanced productivity. </Typography>
                            <Box className="mid-btn  primary-btn" onClick={()=> navigate('/signup')} sx={{height: '2.75rem', width: '10rem', mt: '2.25rem' }}>
                                <Typography variant={'h5'} fontWeight={'500'}>Create Account</Typography>
                            </Box>
                        </Box>
                        </Grid>}

                        {isMD && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', p: '2.5rem',pt: '0', height: '60vh'}} >
                            <Box sx={{width: '100%', }}>
                                <Typography variant='h1' fontWeight={'700'} lineHeight={'3.5rem'}>Efficient Vehicle Management Made Easy</Typography>
                                <Typography variant='h4' fontWeight={'500'} mt={'1.75rem'} lineHeight={'2rem'}>From preventive maintenance scheduling to repair tracking, this system is designed to simplified and allow you experience seamless management and enhanced productivity. </Typography>
                                <Box className="mid-btn  primary-btn" onClick={()=> navigate('/signup')} sx={{height: '2.75rem', width: '10rem', mt: '2.25rem' }}>
                                    <Typography variant={'h5'} fontWeight={'500'}>Create Account</Typography>
                                </Box>
                            </Box>
                        </Grid>}</> }

                    {isSM && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', p: '.75rem', height: '65vh'}} >
                        <Box sx={{width: '100%', }}>
                            <Typography variant='h2' fontWeight={'600'} lineHeight={'3.5rem'}>Efficient Vehicle Management Made Easy</Typography>
                            <Typography variant='h5' fontWeight={'500'} mt={'1.75rem'}  lineHeight={'2rem'}>From preventive maintenance scheduling to repair tracking, this system is designed to simplified and allow you experience seamless management and enhanced productivity. </Typography>
                            <Box className="mid-btn  primary-btn" onClick={()=> navigate('/signup')} sx={{height: '2.25rem', width: '10rem', mt: '2.25rem' }}>
                                <Typography variant={'h6'} fontWeight={'500'}>Create Account</Typography>
                            </Box>
                        </Box>
                    </Grid>}

                    {/* The right side */}

                    {!isSM && <>{!isMD && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderRadius: '.3rem',p: '3rem 0', pr: '5rem',  }} >
                            {/* in the future wer are to add slider here */}
                            <Box sx={{width: '100%',height: '80vh',
                            backgroundImage: `url(${five})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '.3rem',
                            maxWidth: '40rem',
                            }}></Box>
                        </Grid>}

                    {isMD && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '.3rem',p: '2.5rem', pt: '0' }} >
                        {/* in the future wer are to add slider here */}
                        <Box sx={{width: '100%',height: '80vh', 
                            backgroundImage: `url(${five})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '.3rem',

                        }}></Box>
                    </Grid>}</> }

                    {isSM && <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '.3rem',p: '.75rem'  }} >
                        {/* in the future wer are to add slider here */}
                        <Box sx={{width: '100%',height: '70vh',
                            backgroundImage: `url(${five})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '.3rem',
                        }}></Box>
                    </Grid>}

                </Grid>
            </Box>
            
            {/* page 2 */}
            <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '5rem 0', background: '#E8F0FC'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',  width: '100%', gap: '1rem',}} >
                    
                        {!isSM && <>{!isMD && <Box sx={{width: '90%',mb: '1rem'}}>
                            <Typography variant='h1' textAlign={'center'} fontWeight={'600'}>Discover How our Vehicle Maintenance Web App Simplifies Your Life </Typography>
                        </Box>}

                        {isMD && <Box sx={{width: '85%',mb: '1rem'}}>
                            <Typography variant='h1' textAlign={'center'} fontWeight={'600'}>Discover How our Vehicle Maintenance Web App Simplifies Your Life </Typography>
                        </Box>}</> }
                    

                    {isSM && <Box sx={{width: '90%',mb: '.75rem'}}>
                        <Typography variant='h2' textAlign={'center'} fontWeight={'600'}>Discover How our Vehicle Maintenance Web App Simplifies Your Life </Typography>
                    </Box>}


                    {!isSM && <>{!isMD && <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))', justifyContent: 'space-between', gap: '1rem', m: '0 5rem'}}>
                            <LandingPageCard title={'Hassle-Free Maintenance Scheduling'}  note={'Our user-friendly interface allows you to easily schedule vehicle maintenance, track service history, and receive reminders for upcoming maintenance tasks. Say goodbye to missed appointments and unexpected breakdowns. '} />
                            <LandingPageCard title={'Cost and Time Savings'}  note={`Our advanced analytics and proactive maintenance approach help optimize your fleet's performance, ultimately saving you both time and money. Minimize downtime, reduce unexpected repairs, and maximize the lifespan of your vehicles.`} />
                            <LandingPageCard title={'Simplified Inventory Management '}  note={'With our inventory management feature, you can efficiently track and manage spare parts and supplies. Avoid unnecessary purchases, keep inventory levels optimized, and ensure you always have the right parts on-hand when needed. '} />
                            <LandingPageCard title={'Enhanced Safety and Compliance'}  note={'Stay on top of safety regulations and ensure your vehicles are in compliance with our built-in safety checks and maintenance logs. Maintain a safe working environment for your drivers and ensure your fleet meets all industry standards.'} />
                        </Box>}

                    {isMD && <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))', justifyContent: 'space-between', gap: '1rem', m: '0 2.5rem'}}>
                        <LandingPageCard title={'Hassle-Free Maintenance Scheduling'}  note={'Our user-friendly interface allows you to easily schedule vehicle maintenance, track service history, and receive reminders for upcoming maintenance tasks. Say goodbye to missed appointments and unexpected breakdowns. '} />
                        <LandingPageCard title={'Cost and Time Savings'}  note={`Our advanced analytics and proactive maintenance approach help optimize your fleet's performance, ultimately saving you both time and money. Minimize downtime, reduce unexpected repairs, and maximize the lifespan of your vehicles.`} />
                        <LandingPageCard title={'Simplified Inventory Management '}  note={'With our inventory management feature, you can efficiently track and manage spare parts and supplies. Avoid unnecessary purchases, keep inventory levels optimized, and ensure you always have the right parts on-hand when needed. '} />
                        <LandingPageCard title={'Enhanced Safety and Compliance'}  note={'Stay on top of safety regulations and ensure your vehicles are in compliance with our built-in safety checks and maintenance logs. Maintain a safe working environment for your drivers and ensure your fleet meets all industry standards.'} />
                    </Box>} </> }

                    {isSM && <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', justifyContent: 'space-between', gap: '1rem', m: '0 .75rem' }}>
                        <LandingPageCard title={'Hassle-Free Maintenance Scheduling'}  note={'Our user-friendly interface allows you to easily schedule vehicle maintenance, track service history, and receive reminders for upcoming maintenance tasks. Say goodbye to missed appointments and unexpected breakdowns. '} />
                        <LandingPageCard title={'Cost and Time Savings'}  note={`Our advanced analytics and proactive maintenance approach help optimize your fleet's performance, ultimately saving you both time and money. Minimize downtime, reduce unexpected repairs, and maximize the lifespan of your vehicles.`} />
                        <LandingPageCard title={'Simplified Inventory Management '}  note={'With our inventory management feature, you can efficiently track and manage spare parts and supplies. Avoid unnecessary purchases, keep inventory levels optimized, and ensure you always have the right parts on-hand when needed. '} />
                        <LandingPageCard title={'Enhanced Safety and Compliance'}  note={'Stay on top of safety regulations and ensure your vehicles are in compliance with our built-in safety checks and maintenance logs. Maintain a safe working environment for your drivers and ensure your fleet meets all industry standards.'} />
                    </Box>}

                    {!isSM && <>{!isMD && <Box sx={{width: '100%', p: '0 12rem'}}>
                        <Box sx={{width: '100%' }}>
                            <LandingPageCard title={'Comprehensive Reporting and Analysis '}  note={`Gain valuable insights into your fleet's maintenance activities with our robust reporting tools. Monitor key performance indicators, identify trends, and make data-driven decisions to improve the overall efficiency of your fleet. `}/>
                        </Box>
                    </Box>}

                        {isMD && <Box sx={{width: '100%', p: '0 2.5rem'}}>
                            <Box sx={{width: '100%' }}>
                                <LandingPageCard title={'Comprehensive Reporting and Analysis '}  note={`Gain valuable insights into your fleet's maintenance activities with our robust reporting tools. Monitor key performance indicators, identify trends, and make data-driven decisions to improve the overall efficiency of your fleet. `}/>
                            </Box>
                        </Box>}</>}

                    {isSM && <Box sx={{width: '100%', p: '0 .75rem'}}>
                        <Box sx={{width: '100%' }}>
                            <LandingPageCard title={'Comprehensive Reporting and Analysis '}  note={`Gain valuable insights into your fleet's maintenance activities with our robust reporting tools. Monitor key performance indicators, identify trends, and make data-driven decisions to improve the overall efficiency of your fleet. `}/>
                        </Box>
                    </Box>}


                </Box> 
            </Box>

            {/* page 3 */}
            <Box sx={{width: '100%', display: 'flex',flexDirection: 'column', alignItems: 'center', gap: '3rem', background: 'whitesmoke', p: '5rem 0'}}>
                {!isSM && <Box >
                    <Typography variant='h1' textAlign={'center'} mb={'.75rem'} fontWeight={'600'} >Get Access To Diverse Services</Typography>
                    <Typography variant='h4' textAlign={'center'} fontWeight={'500'} >We show you loads of service options you get to when you use this application</Typography>
                </Box>}
                {isSM && <Box >
                    <Typography variant='h2' textAlign={'center'} mb={'.75rem'} fontWeight={'600'} >Get Access To Diverse Services</Typography>
                    <Typography variant='h5' textAlign={'center'} fontWeight={'500'} >We show you loads of service options you get to when you use this application</Typography>
                </Box>}
                {!isSM && <> {!isMD && <Box sx={{mt: '2rem',
                    height: '60vh', width: '100%' , transform: 'scale(0.9, 1)',
                    backgroundImage: `url(${eight})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '.3rem',
                }}></Box>}

                {isMD && <Box sx={{mt: '2rem',
                    height: '60vh', width: '100%' , transform: 'scale(0.65, 0.7)',
                    backgroundImage: `url(${eight})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '.3rem',
                }}></Box> }
                </>}
                {isSM && <Box sx={{mt: '2rem',
                    height: '60vh', width: '100%' , 
                    backgroundImage: `url(${eight})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '.3rem',
                }}></Box>}
            </Box>

            {/* footer */}
            {!isSM && <Box sx={{background: '#1B61E4',width: '100%', padding: '3rem 5rem',display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'center', gap: '1rem' }}>
                <Grid  container component={'main'}  >
                    {!isSM && <>{!isMD && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h4' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h5' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}

                    {isMD && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h4' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h5' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}</> }

                    {isSM && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h5' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h6' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}

                    {!isSM && <>{!isMD && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', }}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '13rem', height: '2.5rem',}} >
                            <Typography variant='h5' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                        </Grid>}

                        {isMD && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1.2rem'}}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '100%', height: '2.25rem',}} >
                            <Typography variant='h5' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                    </Grid>}</> }

                    {isSM && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '.75rem'}}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '100%', height: '2.25rem',}} >
                            <Typography variant='h6' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                    </Grid>}

                </Grid>

                

                <Grid container component={'main'} width={'100%'}  sx={{background: 'white',borderRadius: '.3rem', height:'auto', p: '1rem .75rem'}}>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', jusitifyContent: 'center', width: '100%'}}>
                        <Box sx={{display: 'flex',flexDirection: 'row', alignItems: 'center',justifyContent: 'center', gap: '.75rem', width: '100%'}}>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem', display: 'flex', alignItems:'center' }}><FaFacebookF color='white' size={'1.3rem'} /> </Box>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem', display: 'flex', alignItems:'center' }}><FaInstagram color='white' size={'1.3rem'} /> </Box>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem' ,display: 'flex', alignItems:'center' }}><FaLinkedinIn color='white' size={'1.3rem'} /> </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1.5rem', mb: '1.5rem', width: '100%'}}>
                        <Typography variant='h4' fontWeight={'500'} lineHeight={'2.25rem'} textAlign={'center'} > © 2024 Rayna. All rights reserved.</Typography>
                    </Grid>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',width: '100%'}}>
                        <Typography variant='h3' fontWeight={'600'} color={'#1B61E4'} > FleetPro</Typography>

                    </Grid>
                </Grid>

            </Box>}

            {isSM && <Box sx={{background: '#1B61E4',width: '100%', padding: '3rem 1rem',display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'center', gap: '1rem' }}>
                <Grid  container component={'main'}  >
                    {!isSM && <>{!isMD && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h4' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h5' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}

                    {isMD && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h4' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h5' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}</> }

                    {isSM && <Grid item xs={12} md={6} lg={6} mb={'1rem'}>
                        <Typography variant='h5' mb={'.75rem'} fontWeight={'600'} color={'white'}>Take your designs to new dimensions</Typography>
                        <Typography variant='h6' lineHeight={'1.75rem'} fontWeight={'500'} color={'white'}>Let us unleash our creativity and expertise to create designs that deliver extraordinary results. </Typography>
                    </Grid>}

                    {!isSM && <>{!isMD && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', }}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '13rem', height: '2.5rem',}} >
                            <Typography variant='h5' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                        </Grid>}

                        {isMD && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1.2rem'}}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '100%', height: '2.25rem',}} >
                            <Typography variant='h5' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                    </Grid>}</> }

                    {isSM && <Grid item xs={12} md={6} lg={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '.75rem'}}>
                        <Box className="mid-btn primary-btn send-msg" sx={{width: '100%', height: '2.25rem',}} >
                            <Typography variant='h6' fontWeight={'500'} >Send us a message</Typography>
                        </Box>
                    </Grid>}

                </Grid>

                

                <Grid container component={'main'} width={'100%'}  sx={{background: 'white',borderRadius: '.3rem', height:'auto', p: '1rem .75rem'}}>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', jusitifyContent: 'center', width: '100%'}}>
                        <Box sx={{display: 'flex',flexDirection: 'row', alignItems: 'center',justifyContent: 'center', gap: '.75rem', width: '100%'}}>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem', display: 'flex', alignItems:'center' }}><FaFacebookF color='white' size={'1.3rem'} /> </Box>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem', display: 'flex', alignItems:'center' }}><FaInstagram color='white' size={'1.3rem'} /> </Box>
                            <Box sx={{background: '#1B61E4', borderRadius: '100%', height: 'auto', width: 'auto',p: '.5rem' ,display: 'flex', alignItems:'center' }}><FaLinkedinIn color='white' size={'1.3rem'} /> </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1.5rem', mb: '1.5rem', width: '100%'}}>
                        <Typography variant='h4' fontWeight={'500'} lineHeight={'2.25rem'} textAlign={'center'} > © 2024 Rayna. All rights reserved.</Typography>
                    </Grid>
                    <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',width: '100%'}}>
                        <Typography variant='h3' fontWeight={'600'} color={'#1B61E4'} > FleetPro</Typography>

                    </Grid>
                </Grid>

            </Box>}

        </Grid>
    )
}

export default LandingPage