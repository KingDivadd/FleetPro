import { useMediaQuery, useTheme, Box, Grid } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatState } from 'context/chatContext';
import ChatListArea from 'components/chatListArea';
import ChatMssgArea from 'components/chatMssgArea';
import Backdrop from '@mui/material/Backdrop';
import AddGroup from 'components/addGroup';
import CreateChat from 'components/createChat';
import AddAcct from 'components/addAcct';
import Settings from 'components/settings';

const HomePage = () => {
    const {mode, setMode, backdrop, setBackdrop} = ChatState()
    const [width, setWidth] = useState(window.innerWidth)
    const theme = useTheme();

    const resize = ()=>{
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', resize)
        return()=>{
            window.removeEventListener('resize', resize)
        }
    }, [width])
    const isNonMobileScreens = useMediaQuery("(min-width: 925px)");
    const MobileScreens = useMediaQuery("(min-width: 780px)");

    return (
        <Box position={'relative'}>
            
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                // p="1rem 6%"
                textAlign="center" height={'2rem'}>
            </Box>
            {backdrop.before && <Box className="backdrop" height={'calc(100vh - 2.1rem)'} >
                <Box className='backdrop-content' >
                    {backdrop.newGrp && <AddGroup />}
                    {backdrop.createChat && <CreateChat />}
                    {backdrop.addAcct && <AddAcct /> }
                    {backdrop.settings && <Settings />}
                </Box>
            </Box>}
            <Box
                // width={isNonMobileScreens ? "45%" : "93%"}
                width={'100%'}
                m="auto"
                mt={'.1rem'}
                borderRadius=".3rem"
                backgroundColor={theme.palette.background.alt}
            >{width > 950 ? <>
                {isNonMobileScreens ? <Grid container spacing={1} height={'calc(100vh - 2.1rem)'}>
                    <Grid item xs={4} height={'100%'} p={0}
                    backgroundColor={'steelblue'}><ChatListArea /></Grid>
                    <Grid item xs={8} height={'100%'}
                    backgroundColor={'steelblue'}><ChatMssgArea /></Grid>
                </Grid> :
                <Grid container spacing={1} height={'calc(100vh - 2.1rem)'}>
                    <Grid item xs={5} height={'100%'}
                    backgroundColor={theme.palette.neutral.medium}><ChatListArea /></Grid>
                    <Grid item xs={7} height={'100%'}
                    backgroundColor={theme.palette.primary.light}><ChatMssgArea /></Grid>
                </Grid>
                }</>
                :
                <>
                {MobileScreens ? <Grid container spacing={1} height={'calc(100vh - 2.1rem)'}>
                    <Grid item xs={6} height={'100%'}
                    backgroundColor={theme.palette.neutral.medium}><ChatListArea /></Grid>
                    <Grid item xs={6} height={'100%'}
                    backgroundColor={theme.palette.primary.light}><ChatMssgArea /></Grid>
                </Grid> : <Box  height={'calc(100vh - 2.1rem)'} >
                    <ChatListArea />
                </Box> }</>}
            </Box>
        </Box>
    );
}


export default HomePage