import React from 'react';
import '../styles/skeleton.css';

const SkeletonReel = () => {
  return (
    <div className="skeleton-reel-wrapper">
      <div className="skeleton-video-background shimmer"></div>

      {/* Content Overlay */}
      <div className="skeleton-overlay">
        {/* Description Text */}
        <div className="skeleton-text-line desc-long shimmer"></div>
        <div className="skeleton-text-line desc-short shimmer"></div>
        
        {/* The "Visit Store" Button Shape */}
        <div className="skeleton-button shimmer"></div>
      </div>

      {/* Right Sidebar Icons */}
      <div className="skeleton-actions-sidebar">
        <div className="skeleton-action-item">
          <div className="skeleton-circle action shimmer"></div>
          <div className="skeleton-text-mini shimmer"></div> {/* Like count */}
        </div>
        <div className="skeleton-action-item">
          <div className="skeleton-circle action shimmer"></div>
          <div className="skeleton-text-mini shimmer"></div> {/* Save count */}
        </div>
        <div className="skeleton-action-item">
          <div className="skeleton-circle action shimmer"></div>
          <div className="skeleton-text-mini shimmer"></div> {/* Comment count */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonReel;