import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import "../../styles/skeleton.css"
//import axios from 'axios'
import API from '../../utils/api'
import ReelFeed from '../../components/ReelFeed'
import SkeletonReel from '../../components/SkeletonReel'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.get("/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
                setLoading(false)
            }).catch(err => {
                console.error("Fetch error:", err)
                setLoading(false)
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            await API.post("/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }
    if (loading) {
        return (
            <div className="reels-container">
                {[...Array(3)].map((_, i) => (
                    <SkeletonReel key={i} />
                ))}
            </div>
        )
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved