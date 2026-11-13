import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CallbackModal } from './components/CallbackModal';
import { HomePage } from './pages/HomePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/LoginPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="min-h-screen flex flex-col bg-[#090b14] text-[#f8faff]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/10x-ai-engineer"
                element={<CourseDetailPage slug="10x-ai-engineer" />}
              />
              <Route
                path="/ai-engineering-bootcamp"
                element={<CourseDetailPage slug="ai-engineering-bootcamp" />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <CallbackModal />
        </div>
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;
