"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    getVideoById,
    getYoutubeThumbnail,
    ApiVideoItem,
} from "@/components/services/videoServices";
import { Loader2, ArrowLeft, Calendar, Tag } from "lucide-react";

const VideoDetailClient = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [video, setVideo] = useState<ApiVideoItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchVideo = async () => {
            try {
                const res = await getVideoById(id);
                if (res.success) setVideo(res.data);
            } catch (error) {
                console.warn("Video detail fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                <p className="text-gray-500 font-medium">व्हिडीओ लोड होत आहे...</p>
            </div>
        );
    }

    if (!video) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-bold text-xl">
                व्हिडीओ आढळला नाही.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
                <ArrowLeft size={16} />
                मागे जा
            </button>

            {/* YouTube embed */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Meta */}
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {video.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                        <Calendar size={12} />
                        {new Date(video.createdAt).toLocaleDateString("mr-IN")}
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                    {video.title}
                </h1>

                {video.description && (
                    <div
                        className="prose prose-sm max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: video.description }}
                    />
                )}
            </div>
        </div>
    );
};

export default VideoDetailClient;