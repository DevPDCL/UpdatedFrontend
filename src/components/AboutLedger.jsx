import "@fontsource/ubuntu";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useManagementTeam } from "../hooks/useManagementTeam";
import { getInitials } from "../utils/leadership";

const ROMANS = ["I.", "II.", "III."];

const Rule = ({ double = false, reduce }) => (
  <motion.div
    initial={reduce ? false : { scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
    style={{ transformOrigin: "left" }}
    className={double ? "border-t-[3px] border-double border-[#17251e]" : "h-px bg-[#c2d1c5]"}
  />
);

const LedgerPortrait = ({ image, name, designation, textClass = "text-3xl" }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="ldg-duo aspect-[4/5] w-full rounded-sm">
      {imgError || !image ? (
        <div className="flex h-full w-full items-center justify-center">
          <span className={`ldg-serif ${textClass} tracking-wide text-[#e9f2ec]`}>{getInitials(name)}</span>
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

const LEDGER_FACTS = (total, loading) => [
  ["1983", "Established"],
  ["24+", "Branches"],
  [loading ? "—" : String(total).padStart(2, "0"), "Leaders listed"],
  ["4", "Decades of service"],
];

const Masthead = ({ total, loading, reduce }) => (
  <header
    className="relative px-4 sm:px-6 lg:px-8"
    style={{ paddingTop: "max(4.5rem, env(safe-area-inset-top))" }}
  >
    <div className="mx-auto max-w-4xl">
      <Rule double reduce={reduce} />
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-ubuntu text-[10px] uppercase tracking-[0.22em] text-[#006642] sm:text-[11px]">
        <span>Popular Diagnostic Centre Ltd.</span>
        <span>Register of Leadership · Est. 1983</span>
      </div>
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="ldg-serif mt-10 max-w-[15ch] text-4xl font-medium leading-[1.05] text-[#17251e] sm:text-6xl"
      >
        Forty years, <em className="italic text-[#006642]">kept in trust.</em>
      </motion.h1>
      <p className="ldg-dropcap mt-7 max-w-[58ch] text-[15px] leading-[1.75] text-[#3c4a42] sm:text-base">
        Since a single centre opened its doors in Dhanmondi in 1983, Popular Diagnostic Centre has
        grown into a nationwide diagnostic network. This register records the people entrusted with
        that responsibility.
      </p>
      <div className="mt-9 grid grid-cols-2 border-y border-[#c2d1c5] sm:grid-cols-4">
        {LEDGER_FACTS(total, loading).map(([value, label], i) => (
          <div
            key={label}
            className={
              "border-[#c2d1c5] px-4 py-3.5 sm:px-5" +
              (i % 2 === 0 ? " border-r" : "") +
              (i < 3 ? " sm:border-r" : "")
            }
          >
            <b className="ldg-serif block text-xl font-medium text-[#17251e] sm:text-2xl">{value}</b>
            <span className="font-ubuntu text-[9px] uppercase tracking-[0.18em] text-[#78877d] sm:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </header>
);

const AboutLedger = () => {
  const { data, loading, error } = useManagementTeam();
  const reduce = useReducedMotion();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f8f5] px-4">
        <div className="max-w-md border-y-[3px] border-double border-[#17251e] py-10 text-center">
          <p className="ldg-serif text-lg text-[#17251e]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="ldg-serif mt-6 border-b border-[#006642] pb-0.5 text-base italic text-[#006642] transition-opacity hover:opacity-70"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f5f8f5] pb-12">
      <Masthead total={data.exec.length + data.rest.length} loading={loading} reduce={reduce} />
      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

AboutLedger.displayName = "AboutLedger";

export default AboutLedger;
