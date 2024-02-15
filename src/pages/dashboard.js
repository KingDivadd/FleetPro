import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Box} from '@mui/material'
import Dashboard from './assignee/dashboard'
import DriverDashboard from './driver/dashboard'
import MaintDashboard from './maint/dashboard'
import AdminDashboard from './admin/dashboard'
import { useNavigate } from 'react-router-dom'
import AlertMessage from 'components/snackbar'
import { ChatState } from 'context/chatContext'
import CircularAnimation from '../components/skeleton'

const Dash = ()=>{
    const navigate  = useNavigate()
    const {setOpenAlert, setAlertMsg, setAlertSeverity} = ChatState()
    const [loggedInUser, setLoggedInUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        if(userInfo !== null){
            setLoggedInUser(userInfo.loggedInUser)
            setLoading(false)
        }        
        else{
            fetchUserInfo()
        }
    }, [])

    const fetchUserInfo = async()=>{

    try {
        const token = sessionStorage.getItem('token')
        if (token=== null){
        navigate('/login')}
        const userInfo = await axios.post("https://futa-fleet-guard.onrender.com/api/user/find-user", {}, {
                    headers: {
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                setLoading(false)
                
                setLoggedInUser(userInfo.data.loggedInUser)
                clearInterval(fetchUserInfo)
        } catch (err) {
            console.log(err)
            if (!navigator.onLine) {
                setAlertMsg("No internet connection"); setAlertSeverity("warning"); setOpenAlert(true);
                // setInterval(fetchUserInfo, 3000)
            } else if (err.response) {
                // Handle server errors
                setAlertMsg(err.response.data.err || "An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
                navigate('/login')
            } else {
                // Handle network errors
                setAlertMsg("An error occurred"); setAlertSeverity("error"); setOpenAlert(true);
                navigate('/login')
            }
        }
    }


    return (
        <Box sx={{height: '100vh'}}>
            {/* will have add a skeleton loader here */}
            
            {loading ? <CircularAnimation />
            :
            <>
                {loggedInUser.role === "vehicle_assignee" && <Dashboard />}
                {loggedInUser.role === "driver" && <DriverDashboard />}
                {loggedInUser.role === "maintenance_personnel" && <MaintDashboard />}
                {loggedInUser.role === "vehicle_coordinator" && <AdminDashboard />}
            </>}

            <AlertMessage />
        </Box>

    )
}

export default Dash


