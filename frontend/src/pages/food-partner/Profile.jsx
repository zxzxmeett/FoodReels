import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import API from '../../utils/api'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.get(`/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <main className="profile-page">
                <div className="profile-skeleton-banner" />
                <div className="profile-skeleton-card">
                    <div className="profile-skeleton-line" style={{ width: '55%' }} />
                    <div className="profile-skeleton-line" style={{ width: '35%', height: '11px' }} />
                </div>
            </main>
        )
    }

    return (
        <main className="profile-page">

            {/* Orange banner + floating avatar */}
            <div className="profile-banner">
                <div className="profile-avatar-wrap">
                    <img
                        className="profile-avatar"
                        src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=740"
                        alt={profile?.name ?? 'Profile'}
                    />
                </div>
            </div>

            {/* Header info */}
            <div className="profile-header">
                <div className="profile-info">
                    <h1 className="profile-business">{profile?.name ?? '—'}</h1>
                    {profile?.address && (
                        <p className="profile-address">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            {profile.address}
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-value">
                            {profile?.totalMeals ?? '—'}
                        </span>
                        <span className="profile-stat-label">Total Meals</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-value">
                            {profile?.customersServed ?? '—'}
                        </span>
                        <span className="profile-stat-label">Customers Served</span>
                    </div>
                </div>
            </div>

            {/* Videos grid */}
            <p className="profile-section-title">Food Videos</p>

            <section className="profile-grid" aria-label="Food videos">
                {videos.length === 0 ? (
                    <div className="profile-empty">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 10l4.553-2.369A1 1 0 0121 8.535v6.93a1 1 0 01-1.447.894L15 14"/>
                            <rect x="3" y="6" width="12" height="12" rx="2"/>
                        </svg>
                        <p>No food videos yet</p>
                    </div>
                ) : (
                    videos.map((v) => (
                        <div key={v._id ?? v.id} className="profile-grid-item">
                            <video
                                className="profile-grid-video"
                                src={v.video}
                                muted
                                playsInline
                                preload="metadata"
                            />
                        </div>
                    ))
                )}
            </section>

        </main>
    )
}

export default Profile