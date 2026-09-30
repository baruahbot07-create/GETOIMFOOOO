import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Bot,
  Users,
  Info,
  Settings,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { CONFIG } from './config.js';
import { getNormalizedBots, NormalizedCommunity } from './utils/botHelpers';
import { HomePage } from './pages/HomePage';
import { BotsPage } from './pages/BotsPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { AboutPage } from './pages/AboutPage';
import { ConfigPage } from './pages/ConfigPage';
import { MusicPlayer } from './components/MusicPlayer';

export type PageId = 'home' | 'bots' | 'communities' | 'about' | 'config';

const NAV_ITEMS: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Overview', icon: Home },
  { id: 'bots', label: 'Bot Directory', icon: Bot },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'about', label: 'About', icon: Info },
  { id: 'config', label: 'Config Guide', icon: Settings },
];

export function App() {
  const allBots = useMemo(() => getNormalizedBots(CONFIG), []);

  const communities: NormalizedCommunity[] = useMemo(() => {
    return (CONFIG.communities || []).map((c, idx) => ({
      id: c.id || `comm-${idx}`,
      name: c.name,
      type: c.type,
      telegramUrl: c.telegramUrl,
      description: c.description,
      status: String(c.status || 'active').toLowerCase() === 'active' ? 'active' : 'deactivated',
      memberCount: (c as { memberCount?: string | number }).memberCount,
    }));
  }, []);

  // Hash-based Page Router
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (hash === 'bots') return 'bots';
    if (hash === 'communities') return 'communities';
    if (hash === 'about') return 'about';
    if (hash === 'config' || hash === 'config-reference') return 'config';
    return 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    window.location.hash = page === 'home' ? '' : `/${page}`;
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090B10] text-[#E2E8F0] flex flex-col bg-cyber-grid selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800/90 bg-[#090B10]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between gap-4">
          {/* Brand Wordmark (Navigates to Home) */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="text-lg font-bold tracking-wider text-slate-100 hover:text-emerald-400 transition-colors whitespace-nowrap cursor-pointer text-left"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {CONFIG.system.systemLabel}
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-2 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => {
              const isSelected = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-slate-800 text-emerald-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={CONFIG.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors whitespace-nowrap"
            >
              <span>{CONFIG.profile.username}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#0D1117] border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0D1117] px-6 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isSelected = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors text-left ${
                    isSelected
                      ? 'bg-slate-800 text-emerald-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800">
              <a
                href={CONFIG.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs"
              >
                <span>Telegram: {CONFIG.profile.username}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 py-8 sm:py-12">
        {activePage === 'home' && (
          <HomePage bots={allBots} onNavigate={navigateTo} />
        )}
        {activePage === 'bots' && <BotsPage bots={allBots} />}
        {activePage === 'communities' && (
          <CommunitiesPage communities={communities} />
        )}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'config' && <ConfigPage />}
      </main>

      {/* Mobile Bottom Navigation Bar for Instant Page Switching */}
      <div className="md:hidden sticky bottom-0 z-30 border-t border-slate-800 bg-[#090B10]/95 backdrop-blur-md px-2 py-2 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isSelected = activePage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] transition-colors ${
                isSelected
                  ? 'text-emerald-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090B10] py-8 px-6">
        <div className="mx-auto max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-300">{CONFIG.system.websiteTitle}</span>
            <span aria-hidden="true">·</span>
            <span>{CONFIG.profile.username}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigateTo('config')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Config Map
            </button>
            <a
              href={CONFIG.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Telegram
            </a>
            <a
              href={CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Music Player Component */}
      <MusicPlayer enabled={CONFIG.musicEnabled} musicConfig={CONFIG.music} />
    </div>
  );
}

export default App;
