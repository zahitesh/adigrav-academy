import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Cpu, Layers, PhoneCall, Terminal } from 'lucide-react';
import { COURSES, FOUNDERS } from '../data/courses';
import { WaitlistSection } from '../components/WaitlistSection';
import { useAppState } from '../context/AppStateContext';

export function HomePage() {
  const { hasSeenAutoModal, markAutoModalSeen, openCallbackModal } = useAppState();

  useEffect(() => {
    if (hasSeenAutoModal) return;

    const triggerModal = () => {
      markAutoModalSeen();
      openCallbackModal();
    };

    const handleScroll = () => {
      if (window.scrollY >= 240) {
        triggerModal();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    if (window.scrollY >= 240) {
      triggerModal();
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      triggerModal();
    }, 6000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(fallbackTimer);
    };
  }, [hasSeenAutoModal, markAutoModalSeen, openCallbackModal]);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const courseList = [COURSES['10x-ai-engineer'], COURSES['ai-engineering-bootcamp']];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-20 pb-24 sm:pt-24 sm:pb-28 px-5 sm:px-8">
        <div className="hero-radial-glow pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto max-w-[920px] text-center">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#39d5ff]">
            Practical AI education — built by practicing leaders
          </p>

          <h1 className="mx-auto mt-5 max-w-[780px] font-display text-[42px] sm:text-[60px] md:text-[66px] font-bold leading-[1.05] tracking-[-0.03em] text-[#f8faff]">
            Build the AI career that survives the hype.
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] sm:text-[18px] leading-[1.6] text-[#a9b0c4]">
            Cohort-based programs for engineers and future engineers who want to design, ship, and
            lead with AI — taught from inside Google and Microsoft.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[#8b5cff] px-7 text-[15px] font-semibold text-white shadow-[0_0_32px_rgba(139,92,255,0.45)] hover:bg-[#9b70ff] hover:shadow-[0_0_40px_rgba(139,92,255,0.6)] transition-all cursor-pointer"
            >
              Join the waitlist
            </button>
          </div>

          {/* Dual Value Proposition Card */}
          <div className="mx-auto mt-14 max-w-[820px] rounded-[16px] border border-white/[0.08] bg-[#12162a]/55 backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
              <div className="px-6 py-6 sm:px-8 sm:py-7 text-center">
                <h2 className="font-display text-lg sm:text-[21px] font-bold text-[#f8faff]">
                  Learn by building
                </h2>
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#a9b0c4]">
                  Live systems, practical workflows, real projects
                </p>
              </div>
              <div className="px-6 py-6 sm:px-8 sm:py-7 text-center">
                <h2 className="font-display text-lg sm:text-[21px] font-bold text-[#f8faff]">
                  Built for impact
                </h2>
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#a9b0c4]">
                  Fundamentals for freshers · leverage for professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#39d5ff]">
              The programs
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-[44px] font-bold leading-[1.1] tracking-[-0.025em] text-[#f8faff]">
              Choose your next build.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#a9b0c4]">
              Each path is grounded in the work that happens after the prototype: engineering
              judgement, architecture, reliability, and execution.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-7">
            {courseList.map((course, idx) => {
              const isSenior = course.slug === '10x-ai-engineer';
              return (
                <article
                  key={course.slug}
                  className="card-glass card-glass-hover flex flex-col justify-between rounded-[22px] p-7 sm:p-9"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1 text-xs font-semibold text-[#f8faff]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSenior ? 'bg-[#8b5cff]' : 'bg-[#39d5ff]'
                          }`}
                        />
                        {course.audienceBadge} · {course.statusBadge}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#a9b0c4]">
                        {idx === 0 ? (
                          <Cpu className="h-3.5 w-3.5 text-[#8b5cff]" />
                        ) : (
                          <Terminal className="h-3.5 w-3.5 text-[#39d5ff]" />
                        )}
                        {course.durationBadge} · {course.metaBadge}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl sm:text-[30px] font-bold tracking-[-0.02em] text-[#f8faff]">
                      {course.title}
                    </h3>

                    <p className="mt-3.5 text-[15px] sm:text-base leading-[1.65] text-[#a9b0c4]">
                      {course.cardDescription}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6">
                      {course.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#d4daf0]">
                          <Check className="h-4 w-4 text-[#39d5ff] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/[0.07] flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#a9b0c4]">
                      <Layers className="h-3.5 w-3.5 text-[#8b5cff]" />
                      {course.modules.length} modules · {course.labs.length} labs
                    </span>

                    <Link
                      to={`/${course.slug}`}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-[#f8faff] hover:text-[#39d5ff] transition-colors"
                    >
                      View the 12-week course details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section
        id="founders"
        className="py-24 px-5 sm:px-8 border-t border-white/[0.06] bg-[#0b0e19]/60"
      >
        <div className="mx-auto max-w-[1160px]">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#39d5ff]">
              The difference is in the room
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-[44px] font-bold leading-[1.1] tracking-[-0.025em] text-[#f8faff]">
              Learn from engineers who still ship.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#a9b0c4]">
              This isn’t content about engineering. It’s the thinking, trade-offs, and pattern
              recognition built from years of building at scale.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
            {FOUNDERS.map((founder) => (
              <article
                key={founder.id}
                className="card-glass card-glass-hover rounded-[22px] p-7 sm:p-9"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full bg-gradient-to-br ${founder.accentGradient} p-[2px] shadow-lg`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#111528] overflow-hidden">
                      {founder.image ? (
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f8faff]">
                          {founder.initials}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f8faff]">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#39d5ff]">
                      {founder.role} · {founder.company}
                    </p>
                    <p className="mt-0.5 text-xs text-[#a9b0c4]">
                      {founder.experience} industry experience
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-[15px] sm:text-base leading-[1.65] text-[#a9b0c4]">
                  {founder.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {founder.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#d4daf0]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <WaitlistSection allowTrackPicker />

      {/* Subtle Floating Callback Trigger */}
      <button
        type="button"
        onClick={openCallbackModal}
        aria-label="Request a callback"
        title="Request a callback"
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#141930]/90 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-[#f8faff] shadow-xl hover:border-[#8b5cff]/60 hover:bg-[#1a2040] transition-all cursor-pointer"
      >
        <PhoneCall className="h-3.5 w-3.5 text-[#39d5ff]" />
        <span className="hidden sm:inline">Request callback</span>
      </button>
    </div>
  );
}
