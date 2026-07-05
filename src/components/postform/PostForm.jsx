import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from "../../appwrite/config"
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PostForm({post}) {
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues:{
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",

    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  
  const submit = async (data)=>{
    if(post){
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]):null
      if(file){
        appwriteService.deleteFile(post.featureimage)
      }
       const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featureimage: file ? file.$id: undefined,
      })
      if(dbpost){
          navigate(`/post/${dbpost.$id}`)
      }
    }else{
      const file = await appwriteService.uploadFile(data.image[0])
 
      if(file){
        const fileId = file.$id 
        data.featureimage = fileId
        const dbpost = await appwriteService.createPost({
          ...data,
          userID: userData.$id
        })
        if(dbpost){
          navigate(`/post/${dbpost.$id}`)
        }
      }
    }

  }

  const slugTransform = useCallback((value)=>{
      if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    }
    return "";
  },[])

  React.useEffect(()=>{
      const subscription = watch((value, {name})=>{
        if(name === 'title'){
          setValue('slug', slugTransform(value.title), {shouldValidate:true})
        }
      })

      return ()=>{
        subscription.unsubscribe()
      }
  },[watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            <div className="lg:col-span-2 space-y-5">
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="lg:col-span-1 space-y-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 h-fit shadow-md">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer"
                    {...register("image", { required: !post })}
                />
                {post && post.featureimage && (
                    <div className="w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                        <img
                            src={appwriteService.getFilePreview(post.featureimage)}
                            alt={post.title}
                            className="w-full h-auto object-cover max-h-48"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-4 py-3">
                    {post ? "Update Post" : "Publish Post"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
