import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export function CallbackModal() {
  const {
    isCallbackModalOpen,
    closeCallbackModal,
    submitCallbackRequest,
  } = useAppState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isCallbackModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCallbackModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCallbackModalOpen, closeCallbackModal]);

  if (!isCallbackModalOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    submitCallbackRequest({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setError('');
    closeCallbackModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
      aria-labelledby="callback-modal-title"
    >
      <div
        className="animate-modal-in relative flex w-[90%] sm:w-[700px] max-w-[700px] h-auto sm:h-[440px] overflow-hidden rounded-[12px] bg-white text-[#12162a] shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top-left / top-right dismiss button for accessibility */}
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close callback dialog"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/65 transition-colors cursor-pointer sm:bg-black/50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Column: Copy & Form */}
        <div className="flex flex-1 flex-col justify-center p-[25px] sm:pr-[30px]">
          <div className="max-w-[325px]">
            <h3
              id="callback-modal-title"
              className="font-display text-[28px] sm:text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-[#8b5cff]"
            >
              Build the AI career that survives the hype.
            </h3>
            <p className="mt-[26px] text-[16px] font-medium leading-none text-[#12162a]">
              Request a callback!
            </p>
          </div>

          {submitted ? (
            <div className="mt-6 max-w-[325px] rounded-[12px] border border-[#8b5cff]/35 bg-[#8b5cff]/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#8b5cff] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#12162a]">
                    Callback request received!
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4b5563]">
                    We’ll reach out to <span className="font-semibold text-[#12162a]">{name}</span>{' '}
                    at <span className="font-semibold text-[#12162a]">{phone}</span> shortly.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-4 h-10 w-full rounded-[10px] bg-black text-xs font-semibold text-white hover:bg-[#8b5cff] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-[18px] max-w-[325px] space-y-[10px]" noValidate>
              <input
                type="text"
                name="Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="John Doe"
                aria-label="Name"
                className="h-[48px] w-full rounded-[12px] border border-[#8b5cff] bg-white px-4 text-[14px] text-[#12162a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30"
              />

              <input
                type="email"
                name="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="john@email.com"
                aria-label="Email"
                className="h-[48px] w-full rounded-[12px] border border-[#8b5cff] bg-white px-4 text-[14px] text-[#12162a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30"
              />

              <input
                type="tel"
                name="Phone"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError('');
                }}
                placeholder="9999999999"
                aria-label="Phone"
                className="h-[48px] w-full rounded-[12px] border border-[#8b5cff] bg-white px-4 text-[14px] text-[#12162a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30"
              />

              <div className="pt-0.5 flex items-center gap-3 min-h-[54px]">
                <button
                  type="submit"
                  aria-label="Submit your details"
                  className="inline-flex h-[54px] w-[56px] shrink-0 items-center justify-center rounded-[50px] bg-black text-white hover:bg-[#8b5cff] hover:shadow-[0_6px_20px_rgba(139,92,255,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <ArrowRight className="h-5 w-5 stroke-[2.2]" />
                </button>
                <div className="flex-1 pr-1 min-h-[16px]">
                  {error && (
                    <p className="text-xs font-semibold text-rose-600 leading-tight">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: 3D Network Artwork */}
        <div className="hidden sm:block w-[280px] shrink-0 bg-[#12162a]">
          <img
            src="/popup-art.jpg"
            alt="3D interconnected AI network"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
