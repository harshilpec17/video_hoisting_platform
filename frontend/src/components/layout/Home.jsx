import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const { videos = [], loading } = useSelector((s) => s.video || {});
  const topVideos = videos.slice(0, 8);
  const navigate = useNavigate();

  return (
    <div className="home-page font-sans text-neutral-100 min-h-screen bg-gradient-to-b from-[#0d0f17] via-[#111827] to-[#0b0d13]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="w-[1400px] h-[1400px] bg-emerald-600/10 blur-[160px] rounded-full absolute -top-1/3 -left-1/4" />
          <div className="w-[1000px] h-[1000px] bg-teal-600/10 blur-[140px] rounded-full absolute top-1/3 -right-1/4" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent">
              Host. Share. Engage.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-xl mx-auto lg:mx-0">
              A next‑gen video platform with channel management, real-time
              community posts (tweet style), engagement analytics, and a smooth
              creator workflow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/register")}
                className="group inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-90 shadow-lg shadow-emerald-800/30 transition"
              >
                Get Started
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-base font-semibold border border-neutral-600/70 hover:border-neutral-400 hover:bg-neutral-800/40 transition backdrop-blur"
              >
                Log In
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Fast Uploads
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                Community Threads
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                Channel Growth
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <div className="relative aspect-video rounded-2xl bg-neutral-900/60 border border-neutral-700/60 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.25),transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-600">
                  <div className="w-6 h-6 ml-1 bg-gradient-to-br from-emerald-400 to-teal-400 clip-path-triangle" />
                </div>
                <p className="text-neutral-300 text-sm max-w-xs text-center">
                  Upload videos, manage your channel, interact with viewers, and
                  build a community.
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-neutral-800/70 hover:bg-neutral-700/70 border border-neutral-600/60 transition"
                >
                  Create Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Powerful Creator Suite
          </h2>
          <p className="mt-2 text-neutral-400 max-w-2xl">
            Tools that help you launch, grow, and retain your audience.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Seamless Uploads",
                desc: "Fast video publishing with metadata & visibility controls.",
                icon: "📤",
              },
              {
                title: "Channel Hub",
                desc: "Curate videos, playlists, and personal branding.",
                icon: "📺",
              },
              {
                title: "Community Posts",
                desc: "Tweet-style micro posts for quick audience updates.",
                icon: "💬",
              },
              {
                title: "Engagement Insights",
                desc: "Track watch time, likes, and subscriber trends.",
                icon: "📊",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700/60 hover:border-emerald-500/60 hover:bg-neutral-900/80 transition shadow-lg shadow-black/30 flex flex-col"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-400 flex-1">{f.desc}</p>
                <div className="mt-4 text-xs text-emerald-300 opacity-0 group-hover:opacity-100 transition">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending placeholder */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Trending Now</h2>
            <button
              onClick={() => navigate("/videos")}
              className="text-sm text-teal-300 hover:text-teal-200"
            >
              View all →
            </button>
          </div>
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 h-52"
                >
                  <div className="h-32 bg-neutral-800" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-neutral-800 rounded w-3/4" />
                    <div className="h-3 bg-neutral-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && topVideos.length === 0 && (
            <div className="text-neutral-400 text-sm border border-neutral-700/60 rounded-xl p-8 bg-neutral-900/60">
              No videos yet. Be the first to upload.
            </div>
          )}
          {!loading && topVideos.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {topVideos.map((v) => (
                <Link
                  to={`/video/${v._id}`}
                  key={v._id}
                  className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-700/60 hover:border-teal-500/60 transition flex flex-col"
                >
                  <div className="relative aspect-video bg-neutral-800">
                    {v.thumbnail ? (
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                        No thumbnail
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/70 backdrop-blur">
                      {v.duration || "--:--"}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {v.title || "Untitled"}
                    </h4>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      {v.owner?.username || "Creator"}
                    </p>
                    <div className="mt-auto pt-3 text-[11px] text-neutral-500 flex justify-between">
                      <span>{v.views || 0} views</span>
                      <span>
                        {v.likes?.length
                          ? `${v.likes.length} likes`
                          : "No likes"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
