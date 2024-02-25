import React, {useState, useEffect} from 'react'
import { ChatState } from 'context/chatContext'
import { Box, Avatar, Typography,TextField, Button, Grid, Link, useTheme } from '@mui/material'
import {  LockOutlined } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const theme = useTheme();
    const {persistData, setPersistData} = ChatState()
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if ( !name || !email || !password || !confirmPassword) {
            console.log('field cannot be empty')
        }else{        
            if (password === confirmPassword) {
                try {
                    const auth = await axios.post("http://localhost:5500/api/auth/signup", {name,email,password}, {
                headers: {
                    "Content-type": "Application/json"
                }
                })
                console.log(auth.data);
                setPersistData({...persistData, user: auth.data, isAuth: true}) 
                sessionStorage.setItem("persistData", persistData)
                navigate('/home')
                } catch (err) {
                    console.log("Something went wrong !!!")
                }
            }else{
                console.log("Password not match");
            }
        }
    }

    const styles = {
        textField: {
            fontSize: 50,
        }
    }
    return (
        <Box
            sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h2">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%',  }} >
                <TextField margin="normal" required fullWidth id="name" label="Full Name" name="email" autoComplete="email" value={name} onChange={(e)=>setName(e.target.value)} autoFocus
                />
                <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus
                />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <TextField margin="normal" required fullWidth name="password" label="Confirm Password" type="password" id="confirmPassword" autoComplete="current-password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: theme.typography.fontFamily, fontVariant: 'h4' }}
                >
                    <Typography variant='h4' fontWeight={'400'}>
                        Sign Up
                    </Typography>
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        <Typography component="h5" variant='h6'>
                            Forgot password?
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/" variant="body2">
                        <Typography variant='h6'>
                            {"Already have an account? Sign In"}
                        </Typography>
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default SignUpForm