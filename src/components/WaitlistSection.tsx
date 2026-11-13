import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

interface WaitlistSectionProps {
  id?: string;
  trackLabel?: string;
  subtitle?: string;
  buttonText?: string;
  allowTrackPicker?: boolean;
}

const TRACK_OPTIONS = [
  '10x AI Engineer Course',
  'AI Engineering Bootcamp',
  'Both Programs',
];

export function WaitlistSection({
  id = 'waitlist',
  trackLabel,
  subtitle = 'Join the early-access list for launch dates, curriculum previews, and founding-member pricing.',
  buttonText = 'Get early access',
  allowTrackPicker = false,
}: WaitlistSectionProps) {
  const { addWaitlistEntry, waitlistEntries } = useAppState();
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(trackLabel ?? TRACK_OPTIONS[0]);
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid work or personal email address.');
      return;
    }
    setError('');
    const targetTrack = trackLabel ?? selectedTrack;
    addWaitlistEntry(email, targetTrack);
    setSubmittedEmail(email.trim());
    setEmail('');
  };

  return (
    <section id={id} className="relative py-24 px-5 sm:px-8 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[780px]">
        <div className="card-glass relative overflow-hidden rounded-[24px] p-7 sm:p-12 text-center">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[420px] rounded-full bg-[#8b5cff]/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#39d5ff]/25 bg-[#39d5ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#39d5ff]">
              <Sparkles className="h-3 w-3" />
              Founding Cohort Access
            </span>

            <h2 className="mt-5 font-display text-3xl sm:text-[40px] font-bold tracking-[-0.02em] text-[#f8faff]">
              Get the first seat at the table.
            </h2>
            <p className="mx-auto mt-3.5 max-w-[540px] text-[15px] sm:text-[17px] leading-relaxed text-[#a9b0c4]">
              {subtitle}
            </p>

            {allowTrackPicker && !submittedEmail && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {TRACK_OPTIONS.map((track) => {
                  const active = selectedTrack === track;
                  return (
                    <button
                      key={track}
                      type="button"
                      onClick={() => setSelectedTrack(track)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                        active
                          ? 'border-[#8b5cff] bg-[#8b5cff]/20 text-[#f8faff]'
                          : 'border-white/10 bg-white/[0.03] text-[#a9b0c4] hover:text-white hover:border-white/20'
                      }`}
                    >
                      {track}
                    </button>
                  );
                })}
              </div>
            )}

            {submittedEmail ? (
              <div className="mt-8 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-5 text-left sm:flex sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#f8faff]">
                      You’re on the early-access list!
                    </p>
                    <p className="mt-0.5 text-xs text-[#a9b0c4]">
                      Reserved for <span className="text-[#f8faff] font-medium">{submittedEmail}</span>{' '}
                      ({trackLabel ?? selectedTrack}).
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedEmail(null)}
                  className="mt-3 sm:mt-0 text-xs font-semibold text-[#39d5ff] hover:underline cursor-pointer shrink-0"
                >
                  Add another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-[500px]" noValidate>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="you@company.com"
                    aria-label="Email address for early access"
                    className="h-12 flex-1 rounded-[10px] border border-white/12 bg-white/[0.05] px-4 text-sm text-[#f8faff] placeholder:text-[#a9b0c4]/70 focus:border-[#8b5cff] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#8b5cff] px-6 text-sm font-semibold text-white shadow-[0_0_28px_rgba(139,92,255,0.4)] hover:bg-[#9b70ff] transition-all cursor-pointer shrink-0"
                  >
                    {buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {error && <p className="mt-2.5 text-left text-xs text-rose-400">{error}</p>}
              </form>
            )}

            <p className="mt-5 text-xs text-[#a9b0c4]/80">
              No spam. Just serious learning for serious builders.
              {waitlistEntries.length > 0 && (
                <span className="ml-2 text-[#39d5ff]">
                  · {waitlistEntries.length} seat{waitlistEntries.length === 1 ? '' : 's'} saved in this browser
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
