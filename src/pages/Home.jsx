import React , {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  
    if(posts.length === 0){
         return (
            <div className="w-full py-16 sm:py-24 text-center relative overflow-hidden">
                <Container>
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-900/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-red-500 tracking-tight mb-6">
                            Publish your passions, your way.
                        </h1>
                        <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                            Welcome to <span className="text-red-500 font-semibold">Appwrite Blog app</span>. A modern publishing space designed for developers, creators, and technologists. Log in to read, write, and manage your articles.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                            <Link to="/login" className="px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-600/20 active:scale-95 transition-all duration-200 w-full sm:w-auto text-center cursor-pointer">
                                Login to read posts
                            </Link>
                            <Link to="/signup" className="px-8 py-3.5 rounded-xl font-bold bg-zinc-900 border border-zinc-800 hover:border-red-600/40 text-zinc-300 hover:text-white transition-all duration-200 w-full sm:w-auto text-center cursor-pointer">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className="w-full py-10">
            <Container>
                <div className="flex flex-col mb-8 text-left">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <span className="w-1.5 h-7 bg-red-600 rounded-full shadow-[0_0_8px_#dc2626]"></span>
                        Latest Articles
                    </h1>
                    <p className="text-sm text-zinc-400 mt-2">Explore the newest content published by our creators.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post)=>(
                        <div key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
