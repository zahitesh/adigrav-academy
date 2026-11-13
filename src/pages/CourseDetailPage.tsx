import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Code2,
  FlaskConical,
  Layers,
  Sparkles,
} from 'lucide-react';
import { COURSES, CourseProgram } from '../data/courses';
import { WaitlistSection } from '../components/WaitlistSection';

interface CourseDetailPageProps {
  slug: CourseProgram['slug'];
}

export function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const course = COURSES[slug];
  const otherSlug: CourseProgram['slug'] =
    slug === '10x-ai-engineer' ? 'ai-engineering-bootcamp' : '10x-ai-engineer';
  const otherCourse = COURSES[otherSlug];

  const [labFilterOnly, setLabFilterOnly] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
  });

  const visibleModules = labFilterOnly
    ? course.modules.filter((m) => m.linkedLabs && m.linkedLabs.length > 0)
    : course.modules;

  const allExpanded = visibleModules.every((m) => expandedModules[m.number]);

  const toggleModule = (num: string) => {
    setExpandedModules((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleExpandAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    visibleModules.forEach((m) => {
      updated[m.number] = nextState;
    });
    setExpandedModules((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div>
      {/* Course Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-14 pb-20 px-5 sm:px-8">
        <div className="hero-radial-glow pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1160px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#a9b0c4] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all programs
            </Link>

            <Link
              to={`/${otherCourse.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#a9b0c4] hover:border-white/20 hover:text-white transition-all"
            >
              Compare: {otherCourse.shortTitle}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 max-w-[820px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-full border border-[#39d5ff]/30 bg-[#39d5ff]/10 px-3 py-1 text-xs font-semibold text-[#39d5ff]">
                {course.durationBadge}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#8b5cff]/35 bg-[#8b5cff]/15 px-3 py-1 text-xs font-semibold text-[#c4b5fd]">
                {course.metaBadge}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#a9b0c4]">
                {course.audienceBadge}
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#39d5ff]">
              {course.eyebrow}
            </p>

            <h1 className="mt-3 font-display text-4xl sm:text-[56px] font-bold leading-[1.06] tracking-[-0.03em] text-[#f8faff]">
              {course.heroTitle}
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.6] text-[#a9b0c4]">
              {course.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#course-waitlist"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#8b5cff] px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(139,92,255,0.4)] hover:bg-[#9b70ff] transition-all"
              >
                Join waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#12162a]/70 px-4 py-3 text-xs font-medium text-[#d4daf0]">
                <Sparkles className="h-3.5 w-3.5 text-[#39d5ff]" />
                {course.philosophyBadge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Modules */}
      <section className="py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#39d5ff]">
                Syllabus Architecture
              </p>
              <h2 className="mt-2.5 font-display text-3xl sm:text-[38px] font-bold tracking-[-0.02em] text-[#f8faff]">
                {course.modules.length} Core Modules
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#a9b0c4]">
                Structured progression from core foundations to autonomous multi-agent systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLabFilterOnly(false)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                  !labFilterOnly
                    ? 'border-[#8b5cff] bg-[#8b5cff]/20 text-white'
                    : 'border-white/10 bg-white/[0.03] text-[#a9b0c4] hover:text-white'
                }`}
              >
                All Modules ({course.modules.length})
              </button>
              <button
                type="button"
                onClick={() => setLabFilterOnly(true)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                  labFilterOnly
                    ? 'border-[#39d5ff] bg-[#39d5ff]/15 text-[#39d5ff]'
                    : 'border-white/10 bg-white/[0.03] text-[#a9b0c4] hover:text-white'
                }`}
              >
                Lab-Linked Modules
              </button>
              <button
                type="button"
                onClick={toggleExpandAll}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-[#a9b0c4] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          </div>

          <div className="mt-10 space-y-3.5">
            {visibleModules.map((mod) => {
              const isOpen = Boolean(expandedModules[mod.number]);
              return (
                <div
                  key={mod.number}
                  className="card-glass rounded-[16px] overflow-hidden transition-colors hover:border-white/15"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.number)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 text-left cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <span className="inline-flex h-8 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-display text-xs font-bold text-[#39d5ff]">
                        {mod.number}
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold text-[#f8faff]">
                        {mod.title}
                      </span>
                      {mod.linkedLabs?.map((labId) => (
                        <span
                          key={labId}
                          className="inline-flex items-center gap-1 rounded-full border border-[#8b5cff]/35 bg-[#8b5cff]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#c4b5fd]"
                        >
                          <FlaskConical className="h-3 w-3" />
                          {labId}
                        </span>
                      ))}
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#a9b0c4] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/[0.06] bg-[#0b0e1c]/60 px-5 py-5 sm:px-7">
                      <p className="text-sm text-[#d4daf0]">{mod.summary}</p>
                      <ul className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {mod.topics.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs leading-relaxed text-[#a9b0c4]"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hands-on Labs Section */}
      <section className="py-20 px-5 sm:px-8 border-t border-white/[0.06] bg-[#0b0e19]/60">
        <div className="mx-auto max-w-[1160px]">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#39d5ff]">
              Hands-On Engineering Builds
            </p>
            <h2 className="mt-2.5 font-display text-3xl sm:text-[38px] font-bold tracking-[-0.02em] text-[#f8faff]">
              {course.labs.length} Production-Grade Labs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a9b0c4]">
              Every major architecture concept culminates in a real, runnable engineering lab.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.labs.map((lab) => (
              <article
                key={lab.id}
                className="card-glass card-glass-hover flex flex-col justify-between rounded-[20px] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] text-[#39d5ff]">
                      <Code2 className="h-3.5 w-3.5" />
                      {lab.id} · {lab.tag}
                    </span>
                    <Layers className="h-4 w-4 text-white/25" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#f8faff]">
                    {lab.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#a9b0c4]">
                    {lab.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {lab.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#d4daf0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Course Waitlist */}
      <WaitlistSection
        id="course-waitlist"
        trackLabel={course.title}
        subtitle={course.waitlistNote}
        buttonText="Join waitlist"
      />
    </div>
  );
}
