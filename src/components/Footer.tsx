import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAppState } from '../context/AppStateContext';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openCallbackModal } = useAppState();

  const goToSection = (hash: string) => {
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${hash}`);
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#070911]">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <p className="text-sm text-[#a9b0c4]">
              No spam. Just serious learning for serious builders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[#a9b0c4]">
            <Link to="/10x-ai-engineer" className="hover:text-[#f8faff] transition-colors">
              10x AI Engineer
            </Link>
            <Link to="/ai-engineering-bootcamp" className="hover:text-[#f8faff] transition-colors">
              AI Engineering Bootcamp
            </Link>
            <button
              type="button"
              onClick={() => goToSection('founders')}
              className="hover:text-[#f8faff] transition-colors cursor-pointer"
            >
              Founders
            </button>
            <button
              type="button"
              onClick={() => goToSection('waitlist')}
              className="hover:text-[#f8faff] transition-colors cursor-pointer"
            >
              Early access
            </button>
            <button
              type="button"
              onClick={openCallbackModal}
              className="hover:text-[#39d5ff] transition-colors cursor-pointer"
            >
              Request callback
            </button>
            <Link to="/login" className="hover:text-[#f8faff] transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#a9b0c4]/70">
          <span>© {new Date().getFullYear()} AdiGrav. Practical AI Learning.</span>
          <span>Taught from inside Google and Microsoft.</span>
        </div>
      </div>
    </footer>
  );
}
