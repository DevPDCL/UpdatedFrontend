import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * LazyImage Component - Optimized image loading with intersection observer
 * Features:
 * - Lazy loading with Intersection Observer
 * - Progressive loading with blur-up effect
 * - WebP fallback support
 * - Error handling with fallback images
 * - Responsive image support
 */

const LazyImage = ({
  src,
  alt,
  className = '',
  webpSrc = null,
  fallbackSrc = '/assets/placeholder.webp',
  placeholder = null,
  width,
  height,
  sizes,
  loading = 'lazy',
  priority = false,
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Determine the best image source (WebP first, then fallback)
  const getOptimalSrc = () => {
    // Check WebP support
    const supportsWebP = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('webp') !== -1;
    })();

    if (supportsWebP && webpSrc) return webpSrc;
    return src;
  };

  // Intersection Observer setup
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px', // Load images 50px before they enter viewport
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !imageSrc && !hasError) {
      const optimalSrc = getOptimalSrc();
      setImageSrc(optimalSrc);
    }
  }, [isInView, imageSrc, hasError, webpSrc, src]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    onLoad(e);
  };

  const handleImageError = (e) => {
    console.warn(`Failed to load image: ${imageSrc}`);
    setHasError(true);
    
    // Try fallback if we haven't already
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      onError(e);
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!sizes || hasError) return undefined;
    
    const baseName = imageSrc?.replace(/\.[^/.]+$/, '');
    const extension = imageSrc?.split('.').pop();
    
    // Generate different sizes (you can customize these breakpoints)
    const breakpoints = [480, 768, 1024, 1200, 1920];
    return breakpoints
      .map(width => `${baseName}-${width}w.${extension} ${width}w`)
      .join(', ');
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder or blur effect */}
      {(!isLoaded || !isInView) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {placeholder || (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && imageSrc && (
        <motion.img
          src={imageSrc}
          srcSet={generateSrcSet()}
          sizes={sizes}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      )}

      {/* Error State */}
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
