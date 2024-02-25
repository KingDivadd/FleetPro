import React, {useState, useEffect} from 'react'
import { ChatState } from 'context/chatContext'
import { Box, Avatar, Typography,TextField, Button, Grid, Link, useTheme } from '@mui/material'
import {  LockOutlined } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const theme = useTheme();
    const {persistData, setPersistData, setUser} = ChatState()
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (!email || !password) {
            console.log('field cannot be empty')
        }
        console.log("email : ", email, "password: ", password)
        try {
            const auth = await axios.post("http://localhost:5500/api/auth/login", {email, password}, {
                headers: {
                    "Content-type": "Application/json"
                }
            })
            console.log(auth.data);
            localStorage.setItem('token', auth.data.token)
            setPersistData({...persistData, user: auth.data, isAuth: true}) 
            setUser(auth.data)
            sessionStorage.setItem("persistData", persistData)
            navigate('/home')
        } catch (err) {
            console.log("Incorrect credentials")
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
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%',  }} >
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: theme.typography.fontFamily, fontVariant: 'h4' }}
                >
                    <Typography variant='h4' fontWeight={'400'}>
                        Sign In
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
                    <Link href="/signup" variant="body2">
                        <Typography variant='h6'>
                            {"Don't have an account? Sign Up"}
                        </Typography>
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default LoginForm