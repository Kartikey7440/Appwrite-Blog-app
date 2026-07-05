import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="w-full py-10">
        <Container>
            <div className="flex flex-col mb-8 text-left">
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-red-600 rounded-full shadow-[0_0_8px_#dc2626]"></span>
                    Create New Article
                </h1>
                <p className="text-sm text-zinc-400 mt-2 font-medium">Draft and publish a new post to the community.</p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost