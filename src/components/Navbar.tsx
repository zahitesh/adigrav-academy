import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut, Menu, PhoneCall, X } from 'lucide-react';
import { Logo } from './Logo';
import { useAppState } from '../context/AppStateContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCallbackModal, user, signOut } = useAppState();

  const handleSectionLink = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(`/#${hash}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#090b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cff] rounded-lg"
        >
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          <button
            type="button"
            onClick={() => handleSectionLink('courses')}
            className="text-sm font-medium text-[#a9b0c4] hover:text-[#f8faff] transition-colors cursor-pointer"
          >
            Courses
          </button>
          <button
            type="button"
            onClick={() => handleSectionLink('founders')}
            className="text-sm font-medium text-[#a9b0c4] hover:text-[#f8faff] transition-colors cursor-pointer"
          >
            Founders
          </button>
          <button
            type="button"
            onClick={() => handleSectionLink('waitlist')}
            className="text-sm font-medium text-[#a9b0c4] hover:text-[#f8faff] transition-colors cursor-pointer"
          >
            Early access
          </button>

          <button
            type="button"
            onClick={openCallbackModal}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#39d5ff]/90 hover:text-[#39d5ff] transition-colors cursor-pointer"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            Callback
          </button>

          {user ? (
            <div className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#12162a] pl-3 pr-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-[#f8faff] max-w-[140px] truncate">
                {user.name}
              </span>
              <button
                type="button"
                onClick={signOut}
                title="Sign out"
                className="rounded-md p-1 text-[#a9b0c4] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-[#f8faff] hover:bg-white/[0.11] hover:border-white/20 transition-all"
            >
              Get started
              <ChevronRight className="h-4 w-4 text-[#a9b0c4]" />
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-2 text-[#f8faff] hover:bg-white/[0.08]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0b0e19] px-5 py-5 space-y-3">
          <button
            type="button"
            onClick={() => handleSectionLink('courses')}
            className="block w-full text-left py-2 text-sm font-medium text-[#a9b0c4] hover:text-white"
          >
            Courses
          </button>
          <button
            type="button"
            onClick={() => handleSectionLink('founders')}
            className="block w-full text-left py-2 text-sm font-medium text-[#a9b0c4] hover:text-white"
          >
            Founders
          </button>
          <button
            type="button"
            onClick={() => handleSectionLink('waitlist')}
            className="block w-full text-left py-2 text-sm font-medium text-[#a9b0c4] hover:text-white"
          >
            Early access
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openCallbackModal();
            }}
            className="flex w-full items-center gap-2 py-2 text-sm font-medium text-[#39d5ff]"
          >
            <PhoneCall className="h-4 w-4" />
            Request a callback
          </button>
          <div className="pt-2 border-t border-white/[0.06]">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#f8faff]">Signed in as {user.email}</span>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-400"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-white/12 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-[#f8faff]"
              >
                Get started
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
