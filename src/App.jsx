import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Footer, Header} from './components'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-black text-zinc-100 relative overflow-hidden">
      {/* Radial glow background at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="w-full block z-10">
        <Header/>
        <main className="py-6 min-h-[calc(100vh-280px)]">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
