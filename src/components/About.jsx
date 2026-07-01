import "@fontsource/ubuntu";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { legacyApi } from "../services/api/legacyApi";

/* The three executives (Chair → Managing Director → Deputy MD) are a genuine
   chain of command, so they get their own "Chain of Stewardship" cascade above.
   Everyone below is grouped by their ACTUAL designation — not by the backend's
   row layout — so each band's title is truthful (an Advisor is not a General
   Manager) and the bands stack in real rank order. */
const BANDS = [
  { key: "advisory", label: "Advisory" },
  { key: "gm", label: "General Management" },
  { key: "heads", label: "Departmental Heads" },
  { key: "managers", label: "Management" },
];

// Sort a person into a band from their designation. Deputy General Managers each
// head a department, so they sit with the other departmental heads (e.g. Head of
// ICT); each card still shows the person's own exact title.
const bandOf = (designation = "") => {
  if (/advis/i.test(designation)) return "advisory";
  if (/general\s+manager/i.test(designation) && !/deputy/i.test(designation)) return "gm";
  if (/deputy\s+general\s+manager/i.test(designation) || /\bhead\b/i.test(designation)) return "heads";
  return "managers";
};

// One card width used everywhere on the page, so every portrait is the same size.
const CARD_W = "w-[158px] xs:w-[178px] sm:w-[224px]";

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

const LeaderCard = ({ image, name, designation }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="lg-card flex h-full flex-col rounded-[1.6rem] p-3">
      <div className="lg-plate relative overflow-hidden rounded-[1.2rem]">
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

      <div className="relative z-10 flex flex-1 flex-col px-1 pb-1 pt-3 text-center">
        <h3 className="font-ubuntu text-sm font-semibold leading-snug text-gray-900 sm:text-[15px]">{name}</h3>
        <p className="mt-1 text-[11px] leading-snug text-gray-500">{designation}</p>
      </div>

      <span className="lg-underline" aria-hidden="true" />
    </article>
  );
};

const SkeletonCard = () => (
  <div className="lg-card flex h-full flex-col rounded-[1.6rem] p-3">
    <div className="lg-skeleton aspect-[4/5] w-full rounded-[1.2rem]" />
    <div className="flex flex-1 flex-col items-center gap-2 px-1 pt-3">
      <div className="lg-skeleton h-4 w-3/4 rounded-full" />
      <div className="lg-skeleton h-3 w-1/2 rounded-full" />
    </div>
  </div>
);

const Tier = ({ label, members = [], fill = 3, loading, reduce }) => {
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

  if (!loading && members.length === 0) return null;
  const count = loading ? fill : members.length;
  const cards = loading ? Array.from({ length: fill }) : members;

  return (
    <section className="relative px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex items-center gap-4 sm:mb-9">
          {loading ? (
            <span className="lg-skeleton h-3 w-40 rounded-full" />
          ) : (
            <h2 className="whitespace-nowrap font-ubuntu text-xs font-medium uppercase tracking-[0.25em] text-[#006642] sm:text-sm">
              {label}
            </h2>
          )}
          <span className="h-px flex-1 bg-gradient-to-r from-[#00984a]/45 via-[#00984a]/15 to-transparent" />
          <span className="text-xs tabular-nums text-[#00984a]/55 sm:text-sm">
            {loading ? "" : String(count).padStart(2, "0")}
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="flex flex-wrap justify-center gap-5 sm:gap-6"
        >
          {cards.map((m, i) => (
            <motion.div key={m?._id || i} variants={item} className={`${CARD_W} shrink-0`}>
              {loading ? <SkeletonCard /> : <LeaderCard {...m} />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── Executive Leadership: title ribbons ────────────────────────────────
   Each executive sits on a portrait card with a formal title ribbon streaming
   out from behind it — spanning the width and fading away, bearing the role
   and name. The cards alternate sides (left → right → left) so the column
   zig-zags for balance. Same-size cards throughout, so rank reads from title
   and position. ("right" = card on the left, ribbon flowing right.) */
const EXEC_SIDES = ["right", "left", "right"]; // ribbon direction per rank

// The executive card holds only the portrait — the name and role live on the
// ribbon beside it.
const ExecCard = ({ image, name, designation, apex }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative z-10 shrink-0 ${CARD_W}`}>
      <span className={`lg-exec-halo ${apex ? "lg-exec-halo--apex" : ""}`} aria-hidden="true" />
      <article className={`lg-card lg-exec-card ${apex ? "lg-exec-card--apex" : ""} w-full rounded-[1.6rem] p-3`}>
        <div className="lg-plate relative overflow-hidden rounded-[1.2rem]">
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
      </article>
    </div>
  );
};

// role + name, carried on either ribbon shape
const RibbonLabel = ({ member }) => (
  <span className="lg-ribbon-label">
    <span className="lg-ribbon-role">{member?.designation}</span>
    <span className="lg-ribbon-name">{member?.name}</span>
  </span>
);

const ExecSkeleton = () => (
  <div className={`relative z-10 shrink-0 ${CARD_W}`}>
    <article className="lg-card lg-exec-card flex w-full flex-col rounded-[1.6rem] p-3">
      <div className="lg-skeleton aspect-[4/5] w-full rounded-[1.2rem]" />
      <div className="flex flex-col items-center pt-3">
        <div className="lg-skeleton h-4 w-2/3 rounded-full" />
      </div>
    </article>
  </div>
);

// one executive: portrait card + a title ribbon streaming out behind it. On a
// wide screen the ribbon runs off the card's side; on a phone (no room beside
// the card) it drops to a banner beneath the card.
const ExecRow = ({ member, side, apex, loading, item }) => {
  const right = side === "right";
  return (
    <motion.div variants={item} className="relative mx-auto flex w-full max-w-5xl flex-col items-center sm:block">
      {!loading && (
        <div className={`lg-ribbon ${right ? "lg-ribbon--right" : "lg-ribbon--left"}`} aria-hidden="true">
          <RibbonLabel member={member} />
        </div>
      )}
      <div className={`relative z-10 flex w-full justify-center ${right ? "sm:justify-start" : "sm:justify-end"}`}>
        {loading ? <ExecSkeleton /> : <ExecCard {...member} apex={apex} />}
      </div>
      {!loading && (
        <div className="lg-ribbon-strip mt-3" aria-hidden="true">
          <RibbonLabel member={member} />
        </div>
      )}
    </motion.div>
  );
};

const ExecutiveHierarchy = ({ members, loading, reduce }) => {
  const list = loading ? [0, 1, 2] : members;
  if (!loading && (!members || members.length === 0)) return null;

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } } };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
      };

  return (
    <section id="executive-leadership" className="relative overflow-hidden px-4 pb-8 pt-4 sm:px-6 sm:pb-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-ubuntu text-xs font-semibold uppercase tracking-[0.28em] text-[#006642] sm:text-sm">
          Executive Leadership
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto mt-8 flex max-w-5xl flex-col gap-8 sm:mt-12 sm:gap-3"
      >
        {list.map((m, i) => (
          <ExecRow
            key={loading ? i : m?._id || i}
            member={m}
            side={EXEC_SIDES[i] || "right"}
            apex={i === 0}
            loading={loading}
            item={item}
          />
        ))}
      </motion.div>
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

const LOADING_BANDS = [{ fill: 3 }, { fill: 3 }, { fill: 5 }];

const About = () => {
  const [data, setData] = useState({ exec: [], rest: [] });
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
          exec: rows["Row - 1"]?.slice(0, 3) || [],
          // Everyone below the executives, pooled so we can regroup by title.
          rest: [
            ...(rows["Row - 2"] || []),
            ...(rows["Row - 3"] || []),
            ...(rows["Row - 4"] || []),
          ],
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

  // Regroup the non-executives into truthfully-titled bands, in rank order.
  const bands = BANDS.map((b) => ({
    ...b,
    members: data.rest.filter((m) => bandOf(m.designation) === b.key),
  })).filter((b) => b.members.length > 0);

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

      <ExecutiveHierarchy members={data.exec} loading={loading} reduce={reduce} />

      {loading
        ? LOADING_BANDS.map((b, i) => <Tier key={i} fill={b.fill} loading reduce={reduce} />)
        : bands.map((b) => <Tier key={b.key} label={b.label} members={b.members} reduce={reduce} />)}

      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

About.displayName = "About";

export default About;
