import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, ExternalLink, Bot, Users, Info, Settings, ShieldCheck } from 'lucide-react';
import { CONFIG } from '../config.js';
import { GetoAvatar } from '../components/GetoAvatar';
import { calculateBotCounters, NormalizedBot } from '../utils/botHelpers';

export type PageId = 'home' | 'bots' | 'communities' | 'about' | 'config';

interface HomePageProps {
  bots: NormalizedBot[];
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ bots, onNavigate }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const counters = calculateBotCounters(bots);

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <div className="space-y-10">
      {/* Terminal Identity & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 text-xs font-mono">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-emerald-400 font-medium">
            {CONFIG.system.terminalIdentity}
          </span>
          <span aria-hidden="true">·</span>
          <span>{CONFIG.system.websiteTitle}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-medium">
            {CONFIG.system.statusText}
          </span>
          <span aria-hidden="true" className="text-slate-600">
            /
          </span>
          <span className="text-slate-400">{CONFIG.profile.username}</span>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <GetoAvatar
              profileImage={CONFIG.profile.profileImage}
              avatarText={CONFIG.profile.avatarText}
              username={CONFIG.profile.username}
              size="lg"
            />

            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {CONFIG.profile.name}
                </h1>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText('profile-handle', CONFIG.profile.username)
                  }
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  title="Copy Telegram username"
                >
                  <span>{CONFIG.profile.username}</span>
                  {copiedKey === 'profile-handle' ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-75" />
                  )}
                </button>
              </div>

              {/* Bio Lines */}
              <div className="space-y-1.5 pt-1">
                {CONFIG.profile.bioLines.map((line, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-slate-200 tracking-wide break-all sm:break-normal font-medium"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                <span>TELEGRAM ECOSYSTEM</span>
                <span aria-hidden="true">·</span>
                <span>SUDO BOT FLEET</span>
                <span aria-hidden="true">·</span>
                <span>COMMUNITY NETWORK</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={CONFIG.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg bg-emerald-500 px-5 py-3 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors whitespace-nowrap"
            >
              <div className="flex flex-col text-left">
                <span className="uppercase tracking-wider text-[10px] opacity-80">
                  Telegram Profile
                </span>
                <span className="font-mono text-sm font-semibold">
                  {CONFIG.socials.telegram.username}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg bg-[#090B10] border border-slate-800 px-5 py-3 text-xs font-medium text-slate-200 hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap"
            >
              <div className="flex flex-col text-left">
                <span className="uppercase tracking-wider text-[10px] text-slate-400">
                  Instagram
                </span>
                <span className="font-mono text-sm text-slate-100">
                  {CONFIG.socials.instagram.username}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Counters Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('bots')}
          className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 w-full">
            <span>TOTAL BOTS</span>
            <span className="group-hover:text-emerald-400 transition-colors">VIEW ALL →</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between w-full">
            <span className="font-mono text-3xl sm:text-4xl font-semibold text-slate-100 tabular-nums">
              {counters.totalBots}
            </span>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              {counters.detailedCount} Detailed · {counters.databaseCount} SUDO
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('bots')}
          className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 w-full">
            <span>ACTIVE BOTS</span>
            <span className="text-emerald-400">● ACTIVE</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between w-full">
            <span className="font-mono text-3xl sm:text-4xl font-semibold text-emerald-400 tabular-nums">
              {counters.activeBots}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Configured Status: ACTIVE
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('bots')}
          className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 w-full">
            <span>DEACTIVATED BOTS</span>
            <span className="text-slate-500">○ OFFLINE</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between w-full">
            <span className="font-mono text-3xl sm:text-4xl font-semibold text-slate-300 tabular-nums">
              {counters.deactivatedBots}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Configured Status: DEACTIVATED
            </span>
          </div>
        </button>
      </div>

      {/* Quick Navigation Cards to Separate Pages */}
      <div className="space-y-4">
        <h2
          className="text-xl font-bold text-slate-100 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          System Navigation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('bots')}
            className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-emerald-500/50 p-5 text-left transition-all group cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <Bot className="w-5 h-5 text-emerald-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Bot Directory
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore all {counters.totalBots} bots across AI assistants, group moderation, font styling, and the SUDO fleet.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('communities')}
            className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-emerald-500/50 p-5 text-left transition-all group cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-emerald-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Communities
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access to official hubs including SUDO USE, DO NOT ENTRY, and DEFAULTER.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-emerald-500/50 p-5 text-left transition-all group cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <Info className="w-5 h-5 text-emerald-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              About GETO
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Architecture specs, identity parameters, and Telegram network documentation.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('config')}
            className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-emerald-500/50 p-5 text-left transition-all group cursor-pointer space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <Settings className="w-5 h-5 text-emerald-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Config Guide
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step instructions for editing <code className="font-mono text-emerald-400">src/config.js</code> to add bots or change statuses.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
