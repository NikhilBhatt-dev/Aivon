import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData } from "../assets/assets";
import { dummyChats } from '../assets/assets'; // Adjust path as needed

import toast from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedchat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem("token")||null)
    const [loadingUser, setLoadingUser] = useState(true)
    
    const fetchUser = async () => {
        try {
          const {data} =   await axios.get('/api/user/data', {headers: {Authorization:token}})
          if(data.success){
            setUser(data.user)
          }else{
            toast.error(data.message)


          }
            
        } catch (error) {
            console.log(error)
            
        }
       
    }

    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(dummyChats);
    }, []);


    //select the first chat
    const FetchUserChats = async () => {
         setChats(dummyChats); //  filter user-specific chats
        setSelectedchat(dummyChats[0]);
        
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        if (user) {
            FetchUserChats()
        }
        else {
            setChats([])
            setChats([null])
        }
    }, [user])

    useEffect(() => {
        fetchUser()

    }, [])

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedchat, theme ,setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)





