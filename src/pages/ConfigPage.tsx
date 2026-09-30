import React, { useState } from 'react';
import { Copy, Check, FileCode, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CONFIG } from '../config.js';

const CONFIG_SECTIONS = [
  {
    id: 'status',
    title: '1. Change Bot Status',
    path: 'src/config.js → CONFIG.detailedBots & CONFIG.botDatabase',
    description:
      'Locate any bot entry in `detailedBots` or `botDatabase` and change `status: "active"` to `status: "deactivated"`. Counters update dynamically.',
    code: `// Inside src/config.js -> CONFIG.botDatabase (or CONFIG.detailedBots)
{
  id: "sudo-bot-1",
  name: "SUDO BOT 1",
  telegramUrl: "https://t.me/ll_SUPRRME_XD_1_ll_BOT",
  status: "deactivated", // <-- Change between "active" and "deactivated"
},`,
  },
  {
    id: 'new-bot',
    title: '2. Add New Bots',
    path: 'src/config.js → CONFIG.detailedBots or CONFIG.botDatabase',
    description:
      'Add a new object with `name`, `telegramUrl`, and optional `username` or `description`. Duplicates are automatically prevented.',
    code: `// Add detailed bot in CONFIG.detailedBots:
{
  id: "detailed-new-bot",
  name: "New Utility Bot",
  username: "@YourNewBot",
  telegramUrl: "https://t.me/YourNewBot",
  category: "UTILITY BOT",
  status: "active",
  description: "Short description of what this bot does.",
},

// Or add fleet bot in CONFIG.botDatabase:
{
  id: "sudo-bot-11",
  name: "SUDO BOT 11",
  telegramUrl: "https://t.me/ll_SUPRRME_XD_11_ll_BOT",
  status: "active",
},`,
  },
  {
    id: 'communities',
    title: '3. Add or Edit Communities',
    path: 'src/config.js → CONFIG.communities',
    description:
      'Add or modify group spaces in `CONFIG.communities`. If `memberCount` is omitted, the UI safely hides the field.',
    code: `// Inside src/config.js -> CONFIG.communities
{
  id: "comm-new-group",
  name: "NEW COMMUNITY",
  type: "COMMUNITY GROUP",
  telegramUrl: "https://t.me/YourCommunityLink",
  description: "Official community space description.",
  status: "active",
  // memberCount: "1,200", // Optional: automatically hidden if omitted
},`,
  },
  {
    id: 'socials',
    title: '4. Update Social Links',
    path: 'src/config.js → CONFIG.socials',
    description:
      'Update handles or URLs for Telegram and Instagram. All buttons across the site read directly from here.',
    code: `// Inside src/config.js -> CONFIG.socials
socials: {
  telegram: {
    label: "Telegram",
    username: "@ll_DARK_GETO_ll",
    url: "https://t.me/ll_DARK_GETO_ll",
  },
  instagram: {
    label: "Instagram",
    username: "@miyamura_kun07",
    url: "https://www.instagram.com/miyamura_kun07?stkn=azUxZWR1bHlqd3J5",
  },
},`,
  },
  {
    id: 'music',
    title: '5. Enable Music Player',
    path: 'src/config.js → CONFIG.musicEnabled',
    description:
      'The MusicPlayer component is fully built and ready. Change `musicEnabled: false` to `musicEnabled: true` in `src/config.js` to show the player.',
    code: `// Inside src/config.js
musicEnabled: true, // <-- Change false to true
music: {
  title: "GETO // DARK SYNTH PROTOCOL",
  artist: "@ll_DARK_GETO_ll",
  audioUrl: "", // Optional MP3 stream (uses built-in Web Audio synth if empty)
  autoPlay: false,
},`,
  },
];

export const ConfigPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <FileCode className="w-4 h-4" />
          <span>DEVELOPER MAINTENANCE</span>
          <span aria-hidden="true">/</span>
          <span>src/config.js</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Configuration Guide
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          The entire website is dynamically driven by <code className="font-mono text-emerald-400">src/config.js</code>. You can copy the code templates below whenever you want to add bots, change statuses, or add communities.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        {CONFIG_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="rounded-xl bg-[#0D1117] border border-slate-800 p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                {section.title}
              </h2>
              <span className="font-mono text-xs text-emerald-400">
                {section.path}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {section.description}
            </p>

            <div className="relative">
              <pre className="overflow-x-auto rounded-lg bg-[#090B10] border border-slate-800/90 p-4 font-mono text-xs text-slate-200 leading-relaxed">
                <code>{section.code}</code>
              </pre>
              <button
                type="button"
                onClick={() => handleCopy(section.id, section.code)}
                className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copiedId === section.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
