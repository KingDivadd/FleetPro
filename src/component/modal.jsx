import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Modal from '@mui/material/Modal';
import david from '../asset/driver.png'
import { PiCaretUpBold } from "react-icons/pi";
import { PiCaretDownBold } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { HiMegaphone } from "react-icons/hi2";
import { IoIosCheckboxOutline, IoIosSquareOutline, IoMdPerson } from "react-icons/io";
import { IoMdBookmark } from "react-icons/io";
import { RiSettings2Fill } from "react-icons/ri";
import { ChatState } from 'context/chatContext';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '.3rem'
};

export default function NewGroup() {
    const [open, setOpen] = React.useState(false);
    const [drop, setDrop] = useState(false)
    const [next, setNext] = useState(false)
    const {createGroup, setCreateGroup} = ChatState()
    const [selectedUser, setSelectedUser] = useState([])
    const handleOpen = ()=> {setOpen(true)}
    const handleClose = ()=> {setOpen(false); setCreateGroup(false)}
    const [showDrop, setShowDrop] = useState(false)

    useEffect(()=>{
        if (createGroup){
            handleOpen()
        }if (!createGroup){
            handleClose()
            setCreateGroup(false)
        }
    },[createGroup])
        
        const handleChange = (e)=>{
            const name = e.target.name
            const value = e.target.value
        }
    
    
    const handleDropdown = ()=>{

    }
    const handleDroplist = (data)=>{
        const users = selectedUser
        if(users.includes(data)){
            const newUsers = users.filter((res)=> res !== data)
            setSelectedUser(newUsers)
        }else{
            users.push(data)
            setSelectedUser(users)
        }
    }

    const handleCreate = ()=>{
        console.log('creatin...')
        handleClose(); setCreateGroup(false);
    }

    const isLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const isMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const isSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isXS = useMediaQuery(theme => theme.breakpoints.down('xs'));
    return (
        <div style={{borderColor: '#FFFFF'}}>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style} >
                    {/* The first part */}
                    {!next ? <Box sx={{width: '100%', mb: '-.75rem'}}>
                        <Grid container component='main'>
                            <Grid item sm={2.5} sx={{display: 'flex', alignItems: 'center'}}>
                                {/* input image file here */}
                                <Box sx={{ backgroundImage: `url(${david})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',  height: '4rem', width: '4rem', borderRadius: '100%'}}></Box>
                            </Grid>
                            <Grid item sm={9.5}>
                                <Box width={'100%'}>
                                    <Typography variant='h5' mb={'.5rem'} fontWeight='500'>Group Name</Typography>
                                    <input className =  'half-input'  name = { "username" } value = { '' } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2rem', background: "white", color: 'black', width: '100%', }}/> 
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{width: '100%', mt: '2rem', mb: '2rem',}}>
                            <input className = 'half-input'  name = { "username" } value = { '' } placeholder='Description (Optional)' onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2rem', background: "white", color: 'black', width: '100%',  }}/> 
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '1.5rem'}}>
                            <Button variant='text' onClick={()=>{handleClose()}} size='medium' sx={{textTransform: 'none'}} > <Typography variant='h5' color={'black'} fontWeight={'500'}>Cancel</Typography> </Button>
                            <Button variant='text' onClick={()=>{setNext(true)}} size='medium' sx={{textTransform: 'none'}} > <Typography variant='h5' color='black' fontWeight={'500'}>next</Typography> </Button>
                        </Box>
                    </Box>
                        :
                    <Box sx={{width: '100%', mb: '-.75rem'}}>
                        <Typography variant='h4' fontWeight={'500'} mb={'1.5rem'} textAlign={'center'} >Select Group Participants</Typography>
                        <Box width={'100%'}>
                            <input className =  'input'  name = { "username" } placeholder='Search for user' value = { '' } onChange = {(e) => handleChange(e) } type = "text" style = {{ width: '100%', height: '2.25rem', background: "white", color: 'black', width: '100%', }}/> 
                        </Box>

                        <Box sx={{height: '55vh', width: '100%', overflowY: 'auto', m: '1rem 0'}}>
                            {[1,2,3,4,5,6,7,8,9,0,11,12,13].map((data, ind)=>{
                                return(
                                <Box  key={ind} onClick={()=> handleDroplist(data, ind)} className={'drop-list'} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',height: '2.25rem',}}>
                                    <Typography variant={'h5'} fontWeight={'500'}>Oladimeji Temitope</Typography>
                                    {selectedUser.includes(data) && <FaCheck color='green' size={'1.25rem'} />}
                                </Box>
                                )
                            })}
                        </Box>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <Button className='back-btn' onClick={()=> setNext(false)} size='small' variant='outlined' sx={{textTransform: 'none', borderColor: 'gray'}} >
                                <Typography variant='h5' fontWeight='400'  color='black' >Back</Typography>
                            </Button>
                            <Button onClick={handleCreate} className='primary-btn' size='small' variant='outlined' sx={{background: 'white' ,textTransform: 'none', borderColor: 'gray'}} >
                                <Typography variant='h5' fontWeight='400' color='black' >Create</Typography>
                            </Button>
                        </Box>
                    </Box>}
                    
                    {/* The second part part */}
                </Box>
            </Modal>
            {/* <AlertMessage /> */}
        </div>
    );
}