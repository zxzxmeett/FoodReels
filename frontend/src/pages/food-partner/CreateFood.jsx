import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!videoFile) { setVideoURL(''); return; }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [videoFile]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) { setVideoFile(null); setFileError(''); return; }
        if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => e.preventDefault();

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('mama', videoFile);
        const response = await API.post('/api/food', formData, { withCredentials: true });
        console.log(response.data);
        toast.success('Food item created successfully!');
        navigate('/home');
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

    const progress = useMemo(() => {
        const hasName = name.trim().length > 0;
        const hasVideo = videoFile !== null;
        if (hasName && hasVideo) return 100;
        if (hasName || hasVideo) return 50;
        return 0;
    }, [name, videoFile]);

    return (
        <div className="cf-root">
            {/* Sticky top bar */}
            <div className="cf-topbar">
                <button
                    type="button"
                    className="cf-back-btn"
                    onClick={() => navigate('/home')}
                    aria-label="Go back"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div className="cf-topbar-text">
                    <span className="cf-topbar-title">Add Food</span>
                    <span className="cf-topbar-sub">Share a food video with the community</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="cf-progress-track">
                <div className="cf-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="cf-page">
                <form className="cf-form" onSubmit={onSubmit}>

                    {/* Name */}
                    <div className="cf-card">
                        <div className="cf-section">
                            <label className="cf-label" htmlFor="foodName">Food name</label>
                            <input
                                id="foodName"
                                type="text"
                                className="cf-input"
                                placeholder="e.g. Spicy Paneer Wrap"
                                value={name}
                                maxLength={60}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="cf-char-count">{name.length}/60</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="cf-card">
                        <div className="cf-section">
                            <label className="cf-label" htmlFor="foodDesc">
                                Description
                                <span className="cf-optional">optional</span>
                            </label>
                            <textarea
                                id="foodDesc"
                                className="cf-textarea"
                                rows={4}
                                placeholder="Ingredients, taste, spice level…"
                                value={description}
                                maxLength={300}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="cf-char-count">{description.length}/300</div>
                        </div>
                    </div>

                    {/* Video upload */}
                    <div className="cf-card">
                        <div className="cf-section">
                            <label className="cf-label">Food video</label>

                            <input
                                id="foodVideo"
                                ref={fileInputRef}
                                className="cf-file-hidden"
                                type="file"
                                accept="video/*"
                                onChange={onFileChange}
                            />

                            {!videoFile && (
                                <div
                                    className="cf-dropzone"
                                    role="button"
                                    tabIndex={0}
                                    onClick={openFileDialog}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    aria-label="Upload food video"
                                >
                                    <div className="cf-dropzone-icon">
                                        {/* Video camera icon */}
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 10l4.553-2.369A1 1 0 0121 8.535v6.93a1 1 0 01-1.447.894L15 14" />
                                            <rect x="3" y="6" width="12" height="12" rx="2" />
                                        </svg>
                                    </div>
                                    <div className="cf-dropzone-main">
                                        <strong>Tap to upload</strong> a video
                                    </div>
                                    <div className="cf-dropzone-hint">MP4, WebM, MOV · up to ~100MB</div>
                                </div>
                            )}

                            {fileError && (
                                <p className="cf-error" role="alert">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {fileError}
                                </p>
                            )}

                            {videoFile && (
                                <div className="cf-file-chip" aria-live="polite">
                                    <div className="cf-chip-top">
                                        <div className="cf-chip-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 10l4.553-2.369A1 1 0 0121 8.535v6.93a1 1 0 01-1.447.894L15 14" />
                                                <rect x="3" y="6" width="12" height="12" rx="2" />
                                            </svg>
                                        </div>
                                        <div className="cf-chip-meta">
                                            <span className="cf-chip-name">{videoFile.name}</span>
                                            <span className="cf-chip-size">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                                        </div>
                                    </div>
                                    <div className="cf-chip-actions">
                                        <button type="button" className="cf-chip-btn change" onClick={openFileDialog}>
                                            Change video
                                        </button>
                                        <button type="button" className="cf-chip-btn remove" onClick={() => { setVideoFile(null); setFileError(''); }}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}

                            {videoURL && (
                                <div className="cf-video-wrap">
                                    <video
                                        className="cf-video-el"
                                        src={videoURL}
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </form>
            </div>

            {/* Fixed bottom submit bar */}
            <div className="cf-bottom-bar">
                <div className="cf-step-dots">
                    <div className={`cf-dot ${name.trim() ? 'active' : ''}`} />
                    <div className={`cf-dot ${videoFile ? 'active' : ''}`} />
                    <div className={`cf-dot ${name.trim() && videoFile ? 'active' : ''}`} />
                </div>
                <button
                    className="cf-submit-btn"
                    type="submit"
                    disabled={isDisabled}
                    onClick={onSubmit}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Save Food
                </button>
            </div>
        </div>
    );
};

export default CreateFood;