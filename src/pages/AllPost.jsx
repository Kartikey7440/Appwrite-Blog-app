import React , {useState, useEffect} from 'react'
import {Container, PostCard} from '../components'
import appwriteService from "../appwrite/config"

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

  return (
    <div className="w-full py-10">
        <Container>
            <div className="flex flex-col mb-8 text-left">
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-red-600 rounded-full shadow-[0_0_8px_#dc2626]"></span>
                    All Articles
                </h1>
                <p className="text-sm text-zinc-400 mt-2 font-medium">Browse and read posts created by our developers.</p>
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

export default AllPost
