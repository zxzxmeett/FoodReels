import React, { useEffect, useState } from 'react'
import API from '../../utils/api'
//import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import SkeletonReel from '../../components/SkeletonReel';
import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingNext, setFetchingNext] = useState(false);

    
    const observer = useRef();

    const fetchVideos = useCallback(async (pageNum) => {
        try {
            const response = await API.get(`/api/food?page=${pageNum}&limit=5`, { withCredentials: true });
            const { foodItems, hasMore: moreAvailable } = response.data;

            if (foodItems) {
                //Append new videos to existing ones
                setVideos(prev => pageNum === 1 ? foodItems : [...prev, ...foodItems]);
                setHasMore(moreAvailable);
            }
            setLoading(false);
            setFetchingNext(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
            setFetchingNext(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos(1);
    }, [fetchVideos]);

    const lastVideoElementRef = useCallback(node => {
        if (loading || fetchingNext) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setFetchingNext(true);
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    fetchVideos(nextPage);
                    return nextPage;
                });
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, fetchingNext, hasMore, fetchVideos]);

    if (loading) {
        return (
            <div className="reels-container">
                {[...Array(3)].map((_, i) => <SkeletonReel key={i} />)}
            </div>
        );
    }


    async function likeVideo(item) {

        const response = await API.post("/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await API.post("/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            toast.success("Video saved successfully!");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            toast.error("Failed to save video.");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        <div className="home-wrapper">
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
            lastItemRef={lastVideoElementRef}
        />

        {fetchingNext && (
                <div className="mini-loader">
                    <SkeletonReel />
                </div>
            )}
        </div>
    )
}

export default Home