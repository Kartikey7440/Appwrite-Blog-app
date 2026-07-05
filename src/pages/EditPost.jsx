import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config"
import {useNavigate, useParams} from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])
  return post?(
    <div className="w-full py-10">
        <Container>
            <div className="flex flex-col mb-8 text-left">
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-red-600 rounded-full shadow-[0_0_8px_#dc2626]"></span>
                    Edit Article
                </h1>
                <p className="text-sm text-zinc-400 mt-2 font-medium">Update the content, feature image or status of your post.</p>
            </div>
            <PostForm post = {post}/>
        </Container>
    </div>
  ):null
}

export default EditPost
