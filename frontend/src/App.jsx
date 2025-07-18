import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'

import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useState } from 'react';


import {Toaster} from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'
import { useChatStore } from './store/useChatStore'


const App = () => {
  const {authUser,checkAuth,isCheckingAuth, }=useAuthStore()
  const {theme}=useThemeStore();

  const { selectedUser } = useChatStore();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowNavbar = !(
    location.pathname === "/" && selectedUser && isMobile
  );

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

   

  if(isCheckingAuth && !authUser) 
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
  )
  return (
    <div data-theme={theme}>
    {shouldShowNavbar && <Navbar />}
       <Routes>
        <Route path='/' element={authUser? <HomePage showPaddingTop={shouldShowNavbar}/> : <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser? <ProfilePage/> : <Navigate to="/login"/>}/>
       </Routes>

       <Toaster/>
    </div>
  )
}

export default App
