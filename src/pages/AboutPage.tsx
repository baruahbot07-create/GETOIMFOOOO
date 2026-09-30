import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { CONFIG } from '../config.js';
import { GetoAvatar } from '../components/GetoAvatar';

export const AboutPage: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span>SYSTEM DOCUMENTATION</span>
          <span aria-hidden="true">/</span>
          <span>{CONFIG.profile.username}</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          About {CONFIG.profile.name}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Overview of the developer identity, Telegram bot architecture, and community network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio & Introduction */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-6 space-y-5">
            <div className="flex items-center gap-4">
              <GetoAvatar
                profileImage={CONFIG.profile.profileImage}
                avatarText={CONFIG.profile.avatarText}
                username={CONFIG.profile.username}
                size="md"
              />
              <div>
                <h2
                  className="text-xl font-bold text-slate-100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {CONFIG.profile.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs text-emerald-400">
                    {CONFIG.profile.username}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyText('about-user', CONFIG.profile.username)}
                    className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    title="Copy username"
                  >
                    {copiedKey === 'about-user' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
              {CONFIG.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <p className="font-mono text-xs text-slate-400 mb-2">SYSTEM BIO:</p>
              <div className="rounded-lg bg-[#090B10] border border-slate-800/80 p-3 space-y-1">
                {CONFIG.profile.bioLines.map((line, idx) => (
                  <p key={idx} className="font-mono text-xs text-slate-200">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Social Profiles Direct Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={CONFIG.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 p-4 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Telegram
                </span>
                <p className="font-mono text-xs font-semibold text-emerald-400">
                  {CONFIG.socials.telegram.username}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href={CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 p-4 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Instagram
                </span>
                <p className="font-mono text-xs font-semibold text-slate-200">
                  {CONFIG.socials.instagram.username}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right Column: System Specification */}
        <div className="lg:col-span-5 rounded-xl bg-[#0D1117] border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>SPECIFICATION</span>
            </div>
            <span className="text-emerald-400">{CONFIG.system.statusText}</span>
          </div>

          <dl className="divide-y divide-slate-800/80 text-xs">
            {CONFIG.about.focusAreas.map((item, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <dt className="font-mono text-slate-400">{item.label}</dt>
                <dd className="font-medium text-slate-200 sm:text-right">
                  {item.value}
                </dd>
              </div>
            ))}
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <dt className="font-mono text-slate-400">Terminal Shell</dt>
              <dd className="font-mono text-emerald-400 sm:text-right">
                {CONFIG.system.terminalIdentity}
              </dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <dt className="font-mono text-slate-400">Website Title</dt>
              <dd className="font-medium text-slate-200 sm:text-right">
                {CONFIG.system.websiteTitle}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
