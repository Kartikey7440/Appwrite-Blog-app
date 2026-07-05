import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout}from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
        className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white border border-zinc-800 hover:border-red-600/50 rounded-lg transition-all duration-200 hover:bg-red-950/20 active:scale-95 cursor-pointer"
        onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
