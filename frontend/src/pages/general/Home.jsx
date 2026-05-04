import React, { useEffect, useState } from 'react'
import API from '../../utils/api'
//import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import SkeletonReel from '../../components/SkeletonReel';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        API.get("/api/food", { withCredentials: true })
            .then(response => {
                const fetchedItems = response.data.foodItems;
                if(fetchedItems){
                    setVideos(fetchedItems);
                }
                setLoading(false);
                console.log(response.data);

                //setVideos(response.data.foodItems)
            })
            .catch(err => {
                    console.error("Fetch error:", err);
                    setLoading(false); 
            });
    }, []);

    if (loading) {
        return (
            <div className="reels-container">
                <SkeletonReel />
                <SkeletonReel />
                <SkeletonReel />
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
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home