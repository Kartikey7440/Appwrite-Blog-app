import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featureimage);
                navigate("/");
            }
        });
    };

    const imageId = post?.featureimage;

    return post ? (
        <div className="py-10 text-left max-w-4xl mx-auto">
            <Container>
                {/* Featured Image Container */}
                <div className="w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 relative mb-8 shadow-2xl aspect-[16/10] sm:aspect-[21/9]">
                    {imageId && (
                        <img
                            src={appwriteService.getFilePreview(imageId)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 bg-black/60 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-zinc-800/80 flex gap-1.5 sm:gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article Header */}
                <div className="w-full mb-6 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-red-950/40 text-red-500 border border-red-900/30 rounded-full">
                            Article
                        </span>
                        <span className="text-xs text-zinc-500">Published in Appwrite Blog app</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        {post.title}
                    </h1>
                </div>

                {/* Article Body Content */}
                <div className="browser-css text-zinc-300 leading-relaxed text-base space-y-4">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}