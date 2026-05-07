import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.', lastItemRef }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">

        {items.length === 0 && (
          <div className="empty-state">
            {/* Fork & plate icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
            </svg>
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item, index) => {
          const isLastItem = items.length === index + 1

          return (
            <section
              key={item._id}
              className="reel"
              role="listitem"
              ref={isLastItem ? lastItemRef : null}
            >
              {/* Video */}
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              {/* Overlay */}
              <div className="reel-overlay">
                <div className="reel-overlay-gradient" aria-hidden="true" />

                {/* Left: food info */}
                <div className="reel-content">

                  {/* Partner avatar + name
                  {item.foodPartner && (
                    <div className="reel-partner-name">
                      <div className="reel-partner-dot">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                      </div>
                      {item.partnerName ?? 'Food Partner'}
                    </div>
                  )} */}

                  {/* Food name */}
                  {item.name && (
                    <p style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                      margin: 0,
                      textShadow: '0 1px 3px rgba(0,0,0,.5)'
                    }}>
                      {item.name}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="reel-description" title={item.description}>
                      {item.description}
                    </p>
                  )}

                  {/* Visit store CTA */}
                  {item.foodPartner && (
                    <Link
                      className="reel-btn"
                      to={"/food-partner/" + item.foodPartner}
                      aria-label="Visit store"
                    >
                      Visit store →
                    </Link>
                  )}
                </div>

                {/* Right: action buttons */}
                <div className="reel-actions">
                  {/* Like */}
                  <div className="reel-action-group">
                    <button
                      onClick={onLike ? () => onLike(item) : undefined}
                      className="reel-action"
                      aria-label="Like"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                    </div>
                  </div>

                  {/* Save */}
                  <div className="reel-action-group">
                    <button
                      className="reel-action"
                      onClick={onSave ? () => onSave(item) : undefined}
                      aria-label="Bookmark"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="reel-action-group">
                    <button className="reel-action" aria-label="Comments">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}
                    </div>
                  </div>
                </div>

              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default ReelFeed