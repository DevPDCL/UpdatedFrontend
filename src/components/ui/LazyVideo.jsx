import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyVideo Component - Optimized video loading with intersection observer
 * Features:
 * - Lazy loading with Intersection Observer
 * - Auto-pause when out of viewport for performance
 * - Preload control and compression optimization
 * - Fallback poster image support
 */

const LazyVideo = ({
  src,
  poster,
  className = '',
  width,
  height,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  playsInline = true,
  priority = false,
  preload = 'none',
  onLoad = () => {},
  onError = () => {},
  fallbackContent = null,
  ...props
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading and auto-pause
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (autoPlay) setShouldPlay(true);
          } else {
            // Pause video when out of view for performance
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
            setShouldPlay(false);
          }
        });
      },
      {
        rootMargin: '100px 0px', // Load videos 100px before they enter viewport
        threshold: 0.25, // Video needs to be 25% visible
      }
    );

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [autoPlay]);

  // Handle video play/pause based on visibility and settings
  useEffect(() => {
    if (!videoRef.current || !isLoaded) return;

    if (shouldPlay && autoPlay) {
      videoRef.current.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    } else if (!shouldPlay && autoPlay) {
      videoRef.current.pause();
    }
  }, [shouldPlay, autoPlay, isLoaded]);

  const handleVideoLoad = (e) => {
    setIsLoaded(true);
    onLoad(e);
  };

  const handleVideoError = (e) => {
    console.error('Video failed to load:', src);
    setHasError(true);
    onError(e);
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  if (hasError && fallbackContent) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        {fallbackContent}
      </div>
    );
  }

  return (
    <div 
      ref={videoRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading placeholder */}
      {(!isLoaded || !isInView) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {poster ? (
            <img 
              src={poster}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
          
          {/* Loading indicator */}
          {isInView && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}

      {/* Video element */}
      {isInView && (
        <video
          src={src}
          poster={poster}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          width={width}
          height={height}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          onLoadedData={handleLoadedData}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && !fallbackContent && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Video unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
