import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import {Styled} from '@mui/material/styles'
import { ChatState } from 'context/chatContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { BiMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import david from '../asset/david.jpg'
import { PiCaretUp } from "react-icons/pi";
import { PiCaretDown} from "react-icons/pi";
import { IoFolderOpenOutline } from "react-icons/io5";
import ChatBar from './chat-bar';



const MsgGrid = ()=>{

    return (
        <Grid component={'main'} container direction={'column'} sx={{width: '100%', height: '100%', borderRight: '1px solid #F6F5FF'}}>
            <Grid item sm={1} sx={{width: '100%', heigth: '100%', display: 'flex', alignItems: 'center', p: '0 1.5rem'}} >
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '2.5rem'}}>
                    <Typography variant='h4' fontWeight={'500'}>Messages</Typography>
                    <BiMessageSquareEdit size={'1.5rem'} color={'#644DFF'} />
                </Box>
            </Grid>
            <Grid item sm={1} sx={{width: '100%', heigth: '100%',display: 'flex', alignItems: 'flex-start', p: '0 1.5rem'}} >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', background: 'whitesmoke', gap: '.5rem', borderRadius: '.3rem'}}>
                    <input className='input' placeholder='Search...' type="text" style={{backgroundColor: 'whitesmoke',outline: 'none', border: 'none', height:'2.25rem', width: '100%'}} />
                    <Box sx={{width: '1.75rem',  display: 'flex', alignItems: 'center', pr: '.5rem'}}><CiSearch size={'1.4rem'} /> </Box>
                </Box>
            </Grid>
            <Grid item sm={10} sx={{width: '100%', heigth: '100%', overflowY: 'auto'}}>
                <Box sx={{width: '100%', p: '0 1.5rem'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width:'100%', mb: '1rem'}}>
                        <Typography variant= 'h5' fontWeight={'500'}>Online now</Typography>
                        <Typography variant='h5' fontWeight={'500'} color='#644DFF'>All</Typography>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex',gap: '.75rem', justifyContent: 'flex-start', overflow: 'auto', }}>
                        {[1,2,3,8,9,].map((data, ind)=>{

                            return (
                                    <Box key={ind} sx={{ backgroundImage: `url(${david})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '3rem', width: '3rem',backgroundColor: 'red', borderRadius: '100%', position: 'relative'}}>
                                        <Box sx={{height: '.7rem', width: '.7rem', borderRadius: '50%', background: 'white', position: 'absolute',bottom: '.35rem', right: '-0rem', p: '.05', display: 'grid', placeItems: 'center'}}>
                                            <Box sx={{height: '.5rem', width: '.55rem', borderRadius: '50%', background: 'green', }}></Box>
                                        </Box>
                                    </Box>
                                
                            )
                        })}
                    </Box>
                </Box>
                <Box sx={{width: '100%', borderTop: '1px solid whitesmoke', mt: '1.5rem', }}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '.75rem', p: '0 1.5rem', height: '2.25rem', cursor: 'pointer', mt: '1rem'}}>
                        <IoFolderOpenOutline size={'1.4rem'} fontWeight={'400'} /> 
                        <Typography variant='h5' fontWeight='400'>WORK PROJECT 3 </Typography>
                        <PiCaretUp size={'1.4rem'} fontWeight={'400'} />
                    </Box>
                    <Box sx={{mt: '1rem', maxHeight: '16.5rem', overflowY: 'auto'}}>
                        {[1,2,3,4,5].map((data, ind)=>{

                            return (
                                <ChatBar key={ind} data={data}/>
                            )
                        })}
                    </Box>
                </Box>
                <Box sx={{width: '100%', borderTop: '1px solid whitesmoke', mt: '1.5rem', }}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '.75rem', p: '0 1.5rem', height: '2.25rem', cursor: 'pointer', mt: '1rem'}}>
                        <IoFolderOpenOutline size={'1.4rem'} fontWeight={'400'} /> 
                        <Typography variant='h5' fontWeight='400'>WORK PROJECT 4 </Typography>
                        <PiCaretUp size={'1.4rem'} fontWeight={'400'} />
                    </Box>
                    <Box sx={{mt: '1rem', maxHeight: '16.5rem', overflowY: 'auto'}}>
                        {[1,2,3,4,5].map((data, ind)=>{

                            return (
                                <ChatBar key={ind} data={data}/>
                            )
                        })}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MsgGrid