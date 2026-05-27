import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const YOUTUBE_ID = "kUcMCFTkXx4";
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;
const THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

const PromoCard = ({ compact = false, onDismiss }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const dragX = useMotionValue(0);
  const cardRef = useRef(null);

  // Fetch the actual YouTube title via the public oEmbed endpoint (CORS-allowed)
  useEffect(() => {
    let cancelled = false;
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      YOUTUBE_URL
    )}&format=json`;
    fetch(oembed)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.title) setVideoTitle(data.title);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDismiss = (velocity = -600) => {
    const direction = velocity > 0 ? 1 : -1;
    const distance = Math.min(Math.abs(velocity) * 0.6, 480);
    animate(
      cardRef.current,
      {
        x: direction * distance,
        opacity: 0,
        scale: 0.9,
        rotateZ: direction * 4,
      },
      { duration: 0.38, ease: [0.16, 1, 0.3, 1] }
    ).then(() => {
      onDismiss && onDismiss();
    });
  };

  const dragProgress = Math.min(Math.abs(dragValue) / 110, 1);

  return (
    <motion.div
      ref={cardRef}
      role="region"
      aria-label="Featured campaign promotion. Swipe left to dismiss."
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      drag="x"
      dragConstraints={{ left: -220, right: 20 }}
      dragElastic={{ left: 0.3, right: 0.8 }}
      onDragStart={() => setIsDragging(true)}
      onDrag={(_e, info) => {
        let v = info.offset.x;
        if (v < -110) {
          const overshoot = Math.abs(v + 110);
          v = -110 - overshoot * 0.3;
        }
        dragX.set(v);
        setDragValue(v);
      }}
      onDragEnd={(_e, info) => {
        setIsDragging(false);
        const distance = Math.abs(info.offset.x);
        const velocity = Math.abs(info.velocity.x);
        if (distance > 110 || velocity > 500) {
          handleDismiss(info.velocity.x);
        } else {
          animate(dragX, 0, {
            type: "spring",
            stiffness: 350,
            damping: 28,
          });
          setDragValue(0);
        }
      }}
      whileTap={{ cursor: "grabbing" }}
      className={clsx(
        "relative isolate overflow-hidden rounded-2xl font-ubuntu select-none cursor-grab active:cursor-grabbing",
        compact ? "w-[260px]" : "w-[280px]"
      )}
      style={{
        x: dragX,
        background:
          "linear-gradient(155deg, #06140f 0%, #0c2a1f 55%, #07382a 100%)",
        boxShadow:
          "0 18px 40px -12px rgba(0,40,28,0.55), 0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        willChange: isDragging ? "transform" : "auto",
      }}>
      {/* Rotating conic halo — subtle ambient motion */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,152,74,0.35), rgba(0,102,66,0) 30%, rgba(220,38,38,0.18) 55%, rgba(0,152,74,0) 80%, rgba(0,152,74,0.35) 100%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal grain overlay for editorial texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 6px)",
        }}
      />

      {/* Swipe-to-dismiss progress overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: dragProgress * 0.85,
          background: `linear-gradient(135deg, rgba(249,115,22,${
            0.18 + dragProgress * 0.18
          }) 0%, rgba(220,38,38,${0.18 + dragProgress * 0.22}) 100%)`,
        }}
      />
      <AnimatePresence>
        {Math.abs(dragValue) > 40 && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm">
              <motion.span
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}>
                👈
              </motion.span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white drop-shadow">
                {dragProgress >= 1 ? "Release to dismiss" : "Keep swiping…"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header strip */}
      <div className="relative flex items-center justify-between px-3 pt-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-red-500"
            style={{ boxShadow: "0 0 8px rgba(239,68,68,0.7)" }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            Now Featuring
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <AnimatePresence>
            {isOpen && (
              <motion.button
                key="close-player"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/90 backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Close video preview">
                <XMarkIcon className="h-3 w-3" />
              </motion.button>
            )}
          </AnimatePresence>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss(-600);
            }}
            className="grid h-6 w-6 place-items-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss campaign promotion">
            <XMarkIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Video / Thumbnail area */}
      <div className="relative mx-3 mt-2.5 overflow-hidden rounded-xl">
        <div
          className="relative w-full bg-black/60"
          style={{ aspectRatio: "16 / 9" }}>
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0">
                <iframe
                  src={EMBED_URL}
                  title="PDCL campaign video"
                  className="h-full w-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <motion.button
                key="thumb"
                type="button"
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                whileHover="hover"
                whileTap={{ scale: 0.985 }}
                className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                aria-label="Play campaign video">
                {/* Thumbnail image */}
                <motion.img
                  src={THUMBNAIL}
                  alt="PDCL campaign preview"
                  loading="lazy"
                  onLoad={() => setThumbLoaded(true)}
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={clsx(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                    thumbLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
                {/* Vignette + diagonal shimmer */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,20,12,0.65) 100%), radial-gradient(circle at 30% 30%, rgba(0,152,74,0.25), transparent 60%)",
                  }}
                />
                <motion.div
                  aria-hidden
                  variants={{
                    hover: { x: "120%", opacity: 0.6 },
                  }}
                  initial={{ x: "-120%", opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                {/* Play button */}
                <motion.div
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="relative grid h-12 w-12 place-items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e8fff3 100%)",
                    boxShadow:
                      "0 10px 28px rgba(0,0,0,0.45), 0 0 0 6px rgba(255,255,255,0.08)",
                  }}>
                  <PlayIcon className="ml-0.5 h-5 w-5 text-[#006642]" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-white/70"
                    animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>

                {/* Duration / Watch chip */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90">
                    Watch
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Caption / footer */}
      <div className="relative px-3 pb-3 pt-2.5">
        <h3 className="text-[13px] font-semibold leading-snug text-white">
          A message from{" "}
          <span className="text-emerald-300">Popular Diagnostic</span>
        </h3>
        <p
          className="mt-1 text-[11px] font-medium leading-snug text-white/75 line-clamp-2"
          title={videoTitle || undefined}>
          {videoTitle || " "}
        </p>

        <div className="mt-2.5 flex items-center justify-between">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/80 hover:text-emerald-200">
            <span>Open on YouTube</span>
            <svg
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
          <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <path d="M15 6 9 12l6 6" />
            </svg>
            <span>Swipe to dismiss</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PromoCard;
