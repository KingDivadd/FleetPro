import React, {useState, useContext, useEffect, createContext} from "react";

const ChatContext = createContext()

export const ChatProvider = ({children})=>{
    const [mode, setMode] = useState("dark")
    const [isAuth, setIsAuth] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [userRole, setUserRole] = useState({boo: true, value: ""})
    const [persistData, setPersistData] = useState({mode: 'light', user: null, isAuth: false, chat: null,})
    const [menu, setMenu] = useState(false)
    const [alertMsg, setAlertMsg]= useState("Field cannot be empty")
    const [openAlert, setOpenAlert] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('warning')
    const [createGroup, setCreateGroup] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    return <ChatContext.Provider 
            value={{mode, setMode,userInfo, setUserInfo, isAuth, persistData, setPersistData, setIsAuth, openMenu, setOpenMenu, createGroup, setCreateGroup }}
            >
            {children}
        </ChatContext.Provider>
} 

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatProvider