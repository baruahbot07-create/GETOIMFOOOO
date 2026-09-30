import React from 'react';
import { ArrowUpRight, Users, MessageSquare, Swords } from 'lucide-react';
import { NormalizedCommunity } from '../utils/botHelpers';
import { CONFIG } from '../config.js';

interface CommunitiesPageProps {
  communities: NormalizedCommunity[];
}

export const CommunitiesPage: React.FC<CommunitiesPageProps> = ({ communities }) => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span>TELEGRAM SPACES</span>
          <span aria-hidden="true">/</span>
          <span>{communities.length} ACTIVE COMMUNITIES</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Telegram Communities
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Official community channels and group networks connected to {CONFIG.profile.name} ({CONFIG.profile.username}) and the SUDO ecosystem.
        </p>
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communities.map((community, idx) => {
          const isActive = community.status === 'active';
          const hasMemberCount =
            community.memberCount !== undefined &&
            community.memberCount !== null &&
            String(community.memberCount).trim() !== '';

          // Thematic icon based on community type
          const Icon =
            idx === 0
              ? Users
              : idx === 1
                ? MessageSquare
                : Swords;

          return (
            <article
              key={community.id}
              className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 transition-colors p-6 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 truncate">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{community.type}</span>
                  </div>
                  <span
                    className={
                      isActive
                        ? 'text-xs font-mono text-emerald-400 font-medium shrink-0'
                        : 'text-xs font-mono text-slate-500 font-medium shrink-0'
                    }
                  >
                    {isActive ? '● ACTIVE' : '○ DEACTIVATED'}
                  </span>
                </div>

                {/* Community Name */}
                <h2
                  className="text-2xl font-bold text-slate-100 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {community.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {community.description}
                </p>

                {/* Member Count is ONLY rendered if explicitly present */}
                {hasMemberCount && (
                  <p className="font-mono text-xs text-slate-400 tabular-nums">
                    Members: {community.memberCount}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-slate-500">
                  OFFICIAL SPACE
                </span>
                <a
                  href={community.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>Join Community</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
