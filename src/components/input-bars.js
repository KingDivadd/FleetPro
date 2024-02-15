import React, {useState, useEffect} from 'react'
import { useMediaQuery, useTheme, Box, TextField, FormControl} from '@mui/material';
import { ChatState } from 'context/chatContext';
import axios from 'axios';

const SmallInputBar = ({pH}) => {
    const theme = useTheme()
    const {persistData, chatMssg, setChatMssg, text, setText} = ChatState()

    const handleSubmit = async()=>{
        if(!text){
            console.log(text)
        }
    }
    return (
        <Box component={'form'} width={'100%'} display={'flex'} alignItems={'center'} p={'0'} m={'0'} onSubmit={handleSubmit} >
            <input className='input  search-input' value={text} onChange={(e)=> setText(e.target.value)}type="text" style={{width: '100%', backgroundColor: theme.palette.primary.dark, color: 'grey'}}/>        
        </Box>
    )
}

export const MidInputBar = ({pH, eText, setEText}) => {
    const theme = useTheme()
    const {persistData, chatMssg, setChatMssg, text, setText} = ChatState()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!eText){
            console.log(text)
        }
    }
    return (
        <Box component={'form'} width={'100%'} display={'flex'} alignItems={'center'} p={'0'} m={'0'} onSubmit={(e)=>handleSubmit(e)} >
            <input className='input  search-input' value={eText} onChange={(e)=> setEText(e.target.value)}type="text" style={{width: '100%', height:'2.5rem', backgroundColor: "00000", color: 'black'}}/>        
        </Box>
    )
}

export const SemiBigInputBar = ({pH, username, password, setUsername, setPassword}) => {
    const theme = useTheme()
    const {persistData, chatMssg, setChatMssg, sbtext, setSbText} = ChatState()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!eText){
            console.log(text)
        }
    }
    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name
        console.log(name, " : ",value)
    }
    return (
        <Box component={'form'} width={'100%'} display={'flex'} alignItems={'center'} p={'0'} m={'0'} onSubmit={(e)=>handleSubmit(e)} >
            <input className='input  search-input' name = {"username" || "password"} value={username || password} onChange={(e)=> handleChange }type="text" style={{width: '100%', height:'3rem', background: "white", color: 'black', border: '1px solid gray'}}/>        
        </Box>
    )
}

export const InputBar = ({pH, eText, setEText,text, setText, type}) => {
    const theme = useTheme()
    const {persistData, chatMssg, setChatMssg, } = ChatState()

    // const handleSubmit = async(e)=>{
    //     e.preventDefault()
    //     if(!text){
    //         console.log(text)
    //     }
    // }
    
    const handleChange = (e)=>{
        setText(e.target.value)
    }
    return (
        
            <input className='input' value={text} onChange={(e)=> handleChange(e)}type={type} style={{width: '100%', height:'2.5rem', backgroundColor: theme.palette.primary.dark, color: 'grey', fontSize: '1.2rem'}}/>        
    )
}
export const BigSmallInputBar = () => {
    const theme = useTheme()
    const {mssg, setMssg, chatMssg, setChatMssg, text, setText, persistData, chat} = ChatState()
    
    const handleSubmit = async(e)=>{

        e.preventDefault()
        if (text.trim() !== "") {
            try {
                let token = localStorage.getItem('token')
                if(token !== null){
                    let content = text
                    let chatId = chat._id

                    const message = await axios.post("http://localhost:5500/api/mssg/sendmessage",{content : text, chatId: chat._id}, {
                        headers: {
                            "Content-type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    setChatMssg([...chatMssg, message.data.message])
                }else{
                    console.log("no token provided...")
                }
            } catch (err) {
                console.log("something went wrong, try again with good internet")
            }
            setMssg({id: '20', component: text.trim()})
            setText("")

        }else{
            console.log('field cannot be empty')
        }
    }

    return (
        <Box component={'form'} width={'100%'} display={'flex'} alignItems={'center'} onSubmit={handleSubmit} p={'0'} m={'0'} >
            <input className='input big-search-input' type="text" value={text} onChange={(e)=> setText( e.target.value)} style={{width: '100%', backgroundColor: theme.palette.primary.dark, color: 'greyreac'}}/>                
        </Box>
    )
}

export default SmallInputBar