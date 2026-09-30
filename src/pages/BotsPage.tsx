import React, { useState, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  Copy,
  Check,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { NormalizedBot, calculateBotCounters } from '../utils/botHelpers';

interface BotsPageProps {
  bots: NormalizedBot[];
}

export const BotsPage: React.FC<BotsPageProps> = ({ bots }) => {
  const counters = calculateBotCounters(bots);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<'all' | 'detailed' | 'database'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredBots = useMemo(() => {
    return bots.filter((bot) => {
      if (groupFilter !== 'all' && bot.recordType !== groupFilter) {
        return false;
      }
      if (statusFilter !== 'all' && bot.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = bot.name.toLowerCase().includes(q);
        const matchUser = bot.username.toLowerCase().includes(q);
        const matchCategory = bot.category.toLowerCase().includes(q);
        const matchDesc = bot.description.toLowerCase().includes(q);
        return matchName || matchUser || matchCategory || matchDesc;
      }
      return true;
    });
  }, [bots, groupFilter, statusFilter, searchQuery]);

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>DATABASE REGISTRY</span>
            <span aria-hidden="true">/</span>
            <span>{counters.totalBots} CONFIGURED NODES</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Telegram Bot Directory
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            All configured bot instances in the GETO ecosystem, including the 4 detailed specialized bots (Aiko, Group Bot, Font Bot, SUDO) and the 10 SUDO database bots.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0D1117] border border-slate-800 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'grid'
                ? 'bg-slate-800 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'table'
                ? 'bg-slate-800 text-slate-100'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-5 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">TOTAL BOTS</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-semibold text-slate-100 tabular-nums">
              {counters.totalBots}
            </span>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              {counters.detailedCount} Detailed · {counters.databaseCount} SUDO
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-5 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">ACTIVE BOTS</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-semibold text-emerald-400 tabular-nums">
              {counters.activeBots}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Configured Status: ACTIVE
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-5 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">DEACTIVATED BOTS</span>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-semibold text-slate-300 tabular-nums">
              {counters.deactivatedBots}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Configured Status: DEACTIVATED
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-xl bg-[#0D1117] border border-slate-800 p-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by bot name, @handle, or category..."
            className="w-full rounded-lg bg-[#090B10] border border-slate-800 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Record Type */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#090B10] border border-slate-800">
            <button
              type="button"
              onClick={() => setGroupFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                groupFilter === 'all'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({counters.totalBots})
            </button>
            <button
              type="button"
              onClick={() => setGroupFilter('detailed')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                groupFilter === 'detailed'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Detailed ({counters.detailedCount})
            </button>
            <button
              type="button"
              onClick={() => setGroupFilter('database')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                groupFilter === 'database'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SUDO ({counters.databaseCount})
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#090B10] border border-slate-800">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Status
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                statusFilter === 'active'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active ({counters.activeBots})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('deactivated')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                statusFilter === 'deactivated'
                  ? 'bg-slate-800 text-slate-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Deactivated ({counters.deactivatedBots})
            </button>
          </div>
        </div>
      </div>

      {/* Bot List Output */}
      {filteredBots.length === 0 ? (
        <div className="rounded-xl bg-[#0D1117] border border-slate-800 p-12 text-center space-y-3">
          <p className="text-sm font-medium text-slate-200">
            No bot entries matched your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setGroupFilter('all');
              setStatusFilter('all');
            }}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBots.map((bot) => {
            const isActive = bot.status === 'active';
            return (
              <article
                key={bot.id}
                className="rounded-xl bg-[#0D1117] border border-slate-800 hover:border-slate-700 transition-colors p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-400 truncate">
                      {bot.category}
                    </span>
                    <span
                      className={
                        isActive
                          ? 'text-emerald-400 font-medium shrink-0'
                          : 'text-slate-500 font-medium shrink-0'
                      }
                    >
                      {isActive ? '● ACTIVE' : '○ DEACTIVATED'}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold text-slate-100 tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {bot.name}
                    </h3>
                    {bot.username && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400 truncate">
                          {bot.username}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(`bot-user-${bot.id}`, bot.username)
                          }
                          className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                          title={`Copy ${bot.username}`}
                        >
                          {copiedKey === `bot-user-${bot.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {bot.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-slate-500 truncate">
                    {bot.recordType === 'detailed'
                      ? 'DETAILED RECORD'
                      : 'SUDO DATABASE'}
                  </span>

                  <a
                    href={bot.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 hover:bg-emerald-500 hover:text-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open in Telegram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl bg-[#0D1117] border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                  <th className="py-3.5 px-4">Bot Name</th>
                  <th className="py-3.5 px-4">Username</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Configured Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {filteredBots.map((bot) => {
                  const isActive = bot.status === 'active';
                  return (
                    <tr
                      key={bot.id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-100 whitespace-nowrap">
                        {bot.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300 whitespace-nowrap">
                        {bot.username}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                        {bot.category}
                      </td>
                      <td className="py-3 px-4 font-mono whitespace-nowrap">
                        <span
                          className={
                            isActive ? 'text-emerald-400' : 'text-slate-500'
                          }
                        >
                          {isActive ? 'ACTIVE' : 'DEACTIVATED'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <a
                          href={bot.telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <span>Launch</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
