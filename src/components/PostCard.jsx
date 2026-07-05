import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'


function PostCard({$id, title, featureimage}) {

  return (
    <Link to={`/post/${$id}`} className="block h-full">
        <div className="w-full bg-zinc-900/35 border border-zinc-900 hover:border-red-900/30 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01] flex flex-col h-full hover:shadow-[0_8px_25px_-5px_rgba(220,38,38,0.1)] group">
            <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-950 mb-4 border border-zinc-800/40 relative">
                {featureimage ? (
                    <img 
                      src={appwriteService.getFilePreview(featureimage)} 
                      alt={title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 text-sm">
                      No Image
                    </div>
                )}
            </div>
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-red-500 transition-colors duration-200 line-clamp-2 mt-auto text-left">
              {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
