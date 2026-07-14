import "@fontsource/ubuntu";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useManagementTeam } from "../hooks/useManagementTeam";
import { bandOf, getInitials } from "../utils/leadership";

const TILE_GRADIENTS = [
  "from-[#0e5c43] to-[#1d8a63]",
  "from-[#14606e] to-[#2a8d8f]",
  "from-[#3c6b3f] to-[#6d9b58]",
  "from-[#205e52] to-[#3f8f74]",
  "from-[#145747] to-[#35836a]",
  "from-[#2c6660] to-[#4f948b]",
];

// Number words for the lede (14 → "Fourteen"); digits past twenty.
const allWord = (n) => {
  const words = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"];
  return words[n] || String(n);
};

const Tile = ({ member, index, big = false, onOpen, reduce }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.button
      layout={!reduce}
      layoutId={reduce ? undefined : `tile-${member._id || member.name}`}
      type="button"
      onClick={onOpen ? (e) => onOpen(member, e.currentTarget) : undefined}
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={`relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-br p-2.5 text-left ${
        TILE_GRADIENTS[index % TILE_GRADIENTS.length]
      } ${big ? "col-span-2 row-span-2" : ""} ${
        onOpen ? "cursor-pointer" : "cursor-default"
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00984a] focus-visible:ring-offset-2`}
      aria-label={`${member.name}, ${member.designation}`}
      tabIndex={onOpen ? 0 : -1}
    >
      {!imgError && member.image ? (
        <img
          src={member.image}
          alt=""
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <span
          className={`absolute inset-0 flex items-center justify-center font-ubuntu font-extrabold text-white/85 ${
            big ? "text-3xl" : "text-xl"
          }`}
        >
          {getInitials(member.name)}
        </span>
      )}
      {big && (
        <>
          <span
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
            aria-hidden="true"
          />
          <b className="relative font-ubuntu text-xs font-bold leading-snug text-white sm:text-[13px]">
            {member.name} · {member.designation}
          </b>
        </>
      )}
    </motion.button>
  );
};

const GalleryHero = ({ members, loading, reduce }) => (
  <header
    className="px-4 sm:px-6 lg:px-8"
    style={{ paddingTop: "max(4.5rem, env(safe-area-inset-top))" }}
  >
    <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="font-ubuntu text-[11px] font-bold uppercase tracking-[0.2em] text-[#00984a] sm:text-xs">
          About us · Since 1983
        </p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-3 font-ubuntu text-4xl font-extrabold leading-[1.05] tracking-tight text-[#22292a] sm:text-6xl"
        >
          The people of{" "}
          <span className="bg-gradient-to-r from-[#00b365] to-[#006642] bg-clip-text text-transparent">
            Popular.
          </span>
        </motion.h1>
        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-[#5f6a66]">
          {loading ? "Our" : `${allWord(members.length)}`} leaders, one promise: accurate, accessible
          diagnostics for every patient who walks through our doors — at every one of our centres.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {["Since 1983", "24+ branches", "Nationwide network"].map((s) => (
            <span
              key={s}
              className="rounded-full border border-[#dbe5dd] bg-[#f3f7f3] px-4 py-1.5 font-ubuntu text-xs font-semibold text-[#17313f]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2.5 [grid-auto-rows:64px] sm:[grid-auto-rows:74px]">
        {(loading ? [] : members.slice(0, 9)).map((m, i) => (
          <Tile key={m._id || i} member={m} index={i} big={i === 0} reduce={reduce} />
        ))}
        {loading &&
          Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`gal-skeleton rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            />
          ))}
      </div>
    </div>
  </header>
);

const AboutGallery = () => {
  const { data, loading, error } = useManagementTeam();
  const reduce = useReducedMotion();

  const allMembers = [
    ...data.exec.map((m) => ({ ...m, band: "executive" })),
    ...data.rest.map((m) => ({ ...m, band: bandOf(m.designation) })),
  ];

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdfdfb] px-4">
        <div className="max-w-md rounded-3xl border border-[#dbe5dd] bg-[#f6faf7] p-8 text-center shadow-lg">
          <p className="font-ubuntu text-lg font-medium text-gray-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-[#006642] px-6 py-2.5 font-ubuntu font-medium text-white transition-all hover:brightness-110"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fdfdfb] pb-12">
      <GalleryHero members={allMembers} loading={loading} reduce={reduce} />
      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

AboutGallery.displayName = "AboutGallery";

export default AboutGallery;
