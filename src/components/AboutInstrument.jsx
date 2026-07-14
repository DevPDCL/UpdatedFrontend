import "@fontsource/ubuntu";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useManagementTeam } from "../hooks/useManagementTeam";
import { getInitials } from "../utils/leadership";

const ECG_POINTS = "0,20 240,20 260,20 272,6 284,34 296,12 308,20 560,20 572,26 584,20 800,20";

const EcgDivider = () => (
  <svg viewBox="0 0 800 40" className="mt-9 block h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
    <polyline points={ECG_POINTS} fill="none" stroke="#00984a" strokeWidth="1.5" opacity="0.25" />
    <polyline points={ECG_POINTS} fill="none" stroke="#00984a" strokeWidth="1.5" className="dgx-ecg-path" />
  </svg>
);

const DgxPortrait = ({ image, name, designation, small = false }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="dgx-scan aspect-[4/5] w-full rounded-md">
      {imgError || !image ? (
        <div className="flex h-full w-full items-center justify-center">
          <span className={`dgx-mono font-semibold text-[#00795c] ${small ? "text-lg" : "text-2xl"}`}>
            {getInitials(name)}
          </span>
        </div>
      ) : (
        <img
          src={image}
          alt={`${name}, ${designation}`}
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

const InstrumentHero = ({ reduce }) => (
  <header
    className="px-4 sm:px-6 lg:px-8"
    style={{ paddingTop: "max(4.5rem, env(safe-area-inset-top))" }}
  >
    <div className="mx-auto max-w-5xl">
      <div className="dgx-mono flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[10px] tracking-[0.2em] text-[#006642] sm:text-[11px]">
        <span>PDCL // LEADERSHIP INDEX</span>
        <span>EST. 1983 · 24+ BRANCHES</span>
      </div>
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="mt-8 max-w-[18ch] font-ubuntu text-3xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl"
      >
        Precision has a{" "}
        <span className="bg-gradient-to-r from-[#00b365] to-[#006642] bg-clip-text text-transparent">
          chain of command.
        </span>
      </motion.h1>
      <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-gray-600 sm:text-[15px]">
        Every report we deliver is signed off by a structure built over four decades. This is that
        structure — mapped, connected, accountable.
      </p>
    </div>
    <EcgDivider />
  </header>
);

const AboutInstrument = () => {
  const { error } = useManagementTeam();
  const reduce = useReducedMotion();

  if (error) {
    return (
      <div className="dgx-page flex min-h-screen items-center justify-center px-4">
        <div className="dgx-card max-w-md p-8 text-center">
          <p className="dgx-mono text-[10px] tracking-[0.18em] text-[#006642]">SIGNAL LOST</p>
          <p className="mt-3 font-ubuntu text-base text-gray-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="dgx-mono mt-6 rounded-md border border-[#00984a]/50 px-5 py-2 text-[11px] tracking-[0.14em] text-[#006642] transition-colors hover:bg-[#00984a]/10"
          >
            RE-RUN QUERY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dgx-page relative min-h-screen overflow-x-hidden pb-12">
      <InstrumentHero reduce={reduce} />
      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

AboutInstrument.displayName = "AboutInstrument";

export default AboutInstrument;
