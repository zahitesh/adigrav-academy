import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export function LoginPage() {
  const { signIn, user, signOut } = useAppState();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.trim().length >= 4;
  const canContinue = isEmailValid && isPasswordValid;

  const handleEmailLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    const displayName = email.trim().split('@')[0];
    signIn({ email: email.trim(), name: displayName, provider: 'email' });
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    signIn({
      email: provider === 'google' ? 'builder@gmail.com' : 'builder@github.com',
      name: provider === 'google' ? 'Google Builder' : 'GitHub Builder',
      provider,
    });
  };

  return (
    <section className="relative flex min-h-[calc(100vh-180px)] items-center justify-center px-5 py-16">
      <div className="hero-radial-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative w-full max-w-[440px]">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#a9b0c4] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to AdiGrav
        </Link>

        <div className="card-glass rounded-[24px] p-7 sm:p-9">
          {user ? (
            <div className="text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="mt-5 font-display text-2xl font-bold text-[#f8faff]">
                Welcome back, {user.name}!
              </h1>
              <p className="mt-2 text-sm text-[#a9b0c4]">
                Signed in via <span className="capitalize text-white">{user.provider}</span> ({user.email}).
              </p>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/10x-ai-engineer')}
                  className="h-11 w-full rounded-[10px] bg-[#8b5cff] text-sm font-semibold text-white hover:bg-[#9b70ff] transition-colors cursor-pointer"
                >
                  Explore 10x AI Engineer Course
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/ai-engineering-bootcamp')}
                  className="h-11 w-full rounded-[10px] border border-white/12 bg-white/[0.05] text-sm font-semibold text-[#f8faff] hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  Explore AI Engineering Bootcamp
                </button>
                <button
                  type="button"
                  onClick={signOut}
                  className="pt-2 text-xs font-medium text-[#a9b0c4] hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.02em] text-[#f8faff]">
                Welcome! Lets Get Started!
              </h1>
              <p className="mt-1.5 text-sm text-[#a9b0c4]">
                Log in to continue your learning journey.
              </p>

              <form onSubmit={handleEmailLogin} className="mt-7 space-y-4" noValidate>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#a9b0c4]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.05] px-4 text-sm text-[#f8faff] placeholder:text-[#a9b0c4]/60 focus:border-[#8b5cff] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#a9b0c4]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.05] pl-4 pr-11 text-sm text-[#f8faff] placeholder:text-[#a9b0c4]/60 focus:border-[#8b5cff] focus:outline-none focus:ring-2 focus:ring-[#8b5cff]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#a9b0c4] hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canContinue}
                  className={`mt-2 h-12 w-full rounded-[10px] text-sm font-semibold transition-all ${
                    canContinue
                      ? 'bg-[#f8faff] text-[#090b14] hover:bg-white cursor-pointer shadow-lg'
                      : 'bg-white/[0.08] text-[#a9b0c4]/60 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[11px] uppercase tracking-wider text-[#a9b0c4]/70">or</span>
                <span className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/12 bg-white/[0.03] text-sm font-medium text-[#f8faff] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.8 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('github')}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/12 bg-white/[0.03] text-sm font-medium text-[#f8faff] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  Sign in with GitHub
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
