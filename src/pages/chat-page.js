import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { IoMdMenu } from "react-icons/io";
import ChatBar from 'component/chat-bar';
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import david from '../asset/driver.png'
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { GoSearch } from "react-icons/go";
import { HiOutlineFilter } from "react-icons/hi";
import Msg from 'component/msg';
import MenuSideBar from 'component/side-bar';
import { ChatState } from 'context/chatContext';
import NewGroup from 'component/modal';

const ChatPage = ()=>{
    const [sameUser, setSameUser] = useState(true)
    const {openMenu, setOpenMenu, createGroup, setCreateGroup} = ChatState()
    
    const msg_data = [
        {content: 'Hello There first', id: '10'},{content: 'How far', id: '20'}, {content: 'Who dey school', id: '20'}, {content: 'I just dey enter school', id: '30'},{content: 'Hello There', id: '30'}, {content: 'Hello There', id: '40'}, {content: 'Hello There', id: '40'}, {content: 'Hello There', id: '40'},{content: 'Hello There last', id: '50'}, {content: 'Who dey school', id: '50'}, {content: 'Who dey school', id: '50'}, {content: 'Who dey school', id: '10'},{content: 'Who dey school', id: '10'}, {content: 'Who dey school', id: '20'}
    ]

    const handleOpenMenu = ()=>{
        if (openMenu){setOpenMenu(false)}
        if (!openMenu){ setOpenMenu(true)}
    }

    const handleChange = ()=>{

    }
    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
            <Grid container component={'main'} sx={{ height: '100vh', width: '100vw', background: 'whitesmoke', p: '1rem 0', pt: '.75rem', }}>

                <Grid item  sm={12} md={5} lg={4.5} xl={4} sx={{height: 'auto', minHeight: '100%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}} >
                    <Box sx={{height: '3rem',  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.75rem',background: 'green' }}>
                        <Box onClick={handleOpenMenu} sx={{height: '100%', display: 'flex', alignItems: 'center', width: 'fit-content', p: '0 .25rem'}}>
                            <IoMdMenu color='white' size={'2rem'} />
                        </Box>
                        <input className =  'input'  name = { "username" } value = { '' } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2rem', background: "white", color: 'black', border: '1px solid green', width: '100%' }}/> 
                        <HiOutlineFilter color={'white'} size={'1.75rem'} />

                    </Box>

                    <Box sx={{minHeight: 'calc(100-3rem)',height: 'calc(100vh - 1.5rem - 3rem)', overflowY: 'auto', width: '100%',}}>
                        {[1,2,3,4,5,6,7].map((data, ind)=>{

                            return(
                                <ChatBar key={ind} />
                            )
                        })}
                    </Box>
                </Grid>

                <Grid item  sm={12} md={7} lg={7.5} xl={8} sx={{height: 'auto', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'white' }} >

                    <Grid container sx={{height: '3.5rem',  height: '3rem', background: 'green'}}>
                        <Grid item sm={1} pl={'.5rem'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Box sx={{ backgroundImage: `url(${david})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '2.75rem', width: '2.75rem', borderRadius: '100%'}}></Box>
                        </Grid>
                        <Grid item sm={10}sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',}} >
                            <Typography variant='h5' fontWeight='500' color={'white'} >Playing group</Typography>
                            <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '.25rem'}}>
                                {['David', 'Ayeni Peter', 'John'].map((data, ind)=>{
                                    return (
                                        <Typography key={ind} variant='h6' fontWeight={'500'} color={'white'}  >{data} {[1,2,3].length - 1 != ind && ','}</Typography>
                                    )
                                })}
                            </Box>
                        </Grid>

                        <Grid item sm={1} pr={'.5rem'} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '.5rem', width: '100%', }}>
                                <GoSearch size={'1.75rem'}  color='white' />
                                <PiDotsThreeVerticalBold size={'2rem'} color='white' />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{width: '100%', height: 'calc(100vh - 1.5rem - 3rem - 3.4rem)', overflowY: 'auto', background: '#F6F9FE', p: '.5rem .5rem'}}>
                        {msg_data.map((data, ind)=>{
                            let value = false
                            let user2 = msg_data.indexOf(data)
                            if(user2 > 0 && msg_data[user2].id === msg_data[user2 - 1].id){
                                value = false
                            }else{
                                value = true
                            }
                            return (
                                <Box key={ind} sx={{ width: '100%', }} >
                                        <Msg ind={ind} data={data} data_box = {msg_data} show={value} />
                                </Box>
                            )
                        })}
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '3.5rem', background: 'green', p: '0 .5rem', gap: '.25rem'}}>
                        <IoMdAdd size={'2rem'} color={'white'} />

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.75rem', p: '0 .5rem'}}>
                            <input className =  'input'  name = { "username" } value = { '' } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2.35rem', background: "white", color: 'black', border: '1px solid green', width: '100%',  }}/> 
                        </Box>

                        <IoSend size={'1.75rem'} color='white' />

                    </Box>
                </Grid>

                {/* The side menu baar */}
                {openMenu && <MenuSideBar />}
                {createGroup && <NewGroup />  }
            </Grid>
    )
}
export default ChatPage