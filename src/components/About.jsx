import "@fontsource/ubuntu";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { legacyApi } from "../services/api/legacyApi";

/* The leadership team is an org hierarchy, not a flat gallery. Each tier is a
   labelled band whose cards step down in scale, so rank reads at a glance. */
const TIERS = [
  { key: "row1", label: "Executive Leadership", max: "max-w-[1000px]", cols: "grid-cols-1 sm:grid-cols-3", size: "xl", fill: 3 },
  { key: "row2", label: "General Management", max: "max-w-[880px]", cols: "grid-cols-1 sm:grid-cols-3", size: "lg", fill: 3 },
  { key: "row3", label: "Deputy General Management", max: "max-w-[780px]", cols: "grid-cols-1 sm:grid-cols-3", size: "md", fill: 3 },
  { key: "row4", label: "Department Heads", max: "max-w-[1120px]", cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5", size: "sm", fill: 5 },
];

const SIZE = {
  xl: { name: "text-lg sm:text-xl", role: "text-xs sm:text-sm", pad: "p-3.5", plate: "rounded-[1.4rem]", foot: "pt-4 pb-3" },
  lg: { name: "text-base sm:text-lg", role: "text-xs", pad: "p-3", plate: "rounded-[1.25rem]", foot: "pt-3.5 pb-3" },
  md: { name: "text-sm sm:text-base", role: "text-[11px] sm:text-xs", pad: "p-3", plate: "rounded-[1.1rem]", foot: "pt-3 pb-2.5" },
  sm: { name: "text-sm", role: "text-[11px]", pad: "p-2.5", plate: "rounded-[1rem]", foot: "pt-3 pb-2.5" },
};

// Initials for the graceful fallback when a portrait fails to load.
const getInitials = (name = "") =>
  name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .filter((w) => !/^(dr\.?|mr\.?|mrs\.?|ms\.?|md\.?|late)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const LeaderCard = ({ image, name, designation, size }) => {
  const s = SIZE[size];
  const [imgError, setImgError] = useState(false);

  return (
    <article className={`lg-card flex h-full flex-col rounded-[1.75rem] ${s.pad}`}>
      <div className={`lg-plate relative overflow-hidden ${s.plate}`}>
        <div className="aspect-[4/5] w-full">
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#e7f7ee] to-[#cfead9]">
              <span className="font-ubuntu text-3xl font-semibold tracking-wide text-[#00795c]">
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
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>
        <span className="lg-plate-scrim" aria-hidden="true" />
      </div>

      <div className={`relative z-10 flex flex-1 flex-col px-1 text-center ${s.foot}`}>
        <h3 className={`font-ubuntu font-semibold leading-snug text-gray-900 ${s.name}`}>{name}</h3>
        <p className={`mt-1 leading-snug text-gray-500 ${s.role}`}>{designation}</p>
      </div>

      <span className="lg-underline" aria-hidden="true" />
    </article>
  );
};

const SkeletonCard = ({ size }) => {
  const s = SIZE[size];
  return (
    <div className={`lg-card flex h-full flex-col rounded-[1.75rem] ${s.pad}`}>
      <div className={`lg-skeleton ${s.plate} aspect-[4/5] w-full`} />
      <div className={`flex flex-1 flex-col items-center gap-2 px-1 ${s.foot}`}>
        <div className="lg-skeleton h-4 w-3/4 rounded-full" />
        <div className="lg-skeleton h-3 w-1/2 rounded-full" />
      </div>
    </div>
  );
};

const Tier = ({ tier, members, loading, reduce }) => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
      };

  const cards = loading ? Array.from({ length: tier.fill }) : members;
  if (!loading && members.length === 0) return null;

  return (
    <section className="relative px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
      <div className={`mx-auto ${tier.max}`}>
        <div className="mb-7 flex items-center gap-4 sm:mb-9">
          <h2 className="whitespace-nowrap font-ubuntu text-xs font-medium uppercase tracking-[0.25em] text-[#006642] sm:text-sm">
            {tier.label}
          </h2>
          <span className="h-px flex-1 bg-gradient-to-r from-[#00984a]/45 via-[#00984a]/15 to-transparent" />
          <span className="text-xs tabular-nums text-[#00984a]/55 sm:text-sm">
            {loading ? "" : String(members.length).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className={`grid gap-5 sm:gap-6 ${tier.cols} justify-items-center`}
        >
          {cards.map((m, i) => (
            <motion.div key={m?._id || i} variants={item} className="h-full w-full max-w-[340px]">
              {loading ? <SkeletonCard size={tier.size} /> : <LeaderCard {...m} size={tier.size} />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Atmosphere = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <span
      className="lg-orb"
      style={{ width: 420, height: 420, top: -110, left: -90, background: "radial-gradient(circle, #86efac, transparent 70%)" }}
    />
    <span
      className="lg-orb"
      style={{ width: 320, height: 320, top: "34%", right: -80, background: "radial-gradient(circle, #6ee7b7, transparent 70%)", animationDelay: "5s" }}
    />
    <span
      className="lg-orb"
      style={{ width: 480, height: 480, bottom: -170, left: "24%", background: "radial-gradient(circle, #a7f3d0, transparent 70%)", animationDelay: "9s" }}
    />
  </div>
);

const About = () => {
  const [data, setData] = useState({ row1: [], row2: [], row3: [], row4: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await legacyApi.get("/api/management-team");
        const rows = response.data?.data ?? {};
        if (!active) return;
        setData({
          row1: rows["Row - 1"]?.slice(0, 3) || [],
          row2: rows["Row - 2"]?.slice(0, 3) || [],
          row3: rows["Row - 3"]?.slice(0, 3) || [],
          row4: rows["Row - 4"]?.slice(0, 5) || [],
        });
      } catch {
        if (active) setError("We couldn't load the leadership team right now. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <div className="lg-page relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-white px-4">
        <Atmosphere />
        <div className="lg-rail max-w-md rounded-3xl p-8 text-center">
          <p className="font-ubuntu text-lg font-medium text-gray-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-gradient-to-r from-[#00984a] to-[#00b358] px-6 py-2.5 font-medium text-white transition-all duration-300 hover:brightness-110"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg-page relative min-h-screen overflow-x-hidden bg-gradient-to-b from-green-50 to-white pb-10">
      <Atmosphere />

      {/* Hero — institutional thesis, then the people */}
      <section
        className="relative px-4 pb-8 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pt-24"
        style={{ paddingTop: "max(4.5rem, env(safe-area-inset-top))" }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto max-w-4xl"
        >
          <p className="mb-5 font-ubuntu text-[10px] font-medium uppercase tracking-[0.32em] text-[#00984a] sm:mb-6 sm:text-xs">
            Popular Diagnostic Centre · Since 1983
          </p>
          <h1 className="font-ubuntu text-3xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Leadership built on
            <br />
            <span className="bg-gradient-to-r from-[#00b365] via-[#00984a] to-[#006642] bg-clip-text text-transparent">
              four decades of trust
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-gray-600 sm:mt-6 sm:text-lg">
            From a single centre in Dhaka to a nationwide diagnostic network, these are the people guiding Popular
            Diagnostic Centre&apos;s commitment to accurate, accessible healthcare.
          </p>
        </motion.div>
      </section>

      {TIERS.map((tier) => (
        <Tier key={tier.key} tier={tier} members={data[tier.key]} loading={loading} reduce={reduce} />
      ))}

      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

About.displayName = "About";

export default About;
