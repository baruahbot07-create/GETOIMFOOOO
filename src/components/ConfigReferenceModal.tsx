import React, { useState } from 'react';
import { X, Check, Copy, FileCode } from 'lucide-react';

interface ConfigReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUIDE_SECTIONS = [
  {
    id: 'bot-status',
    title: '1. Change Bot Status (Active / Deactivated)',
    location: 'src/config.js → CONFIG.detailedBots & CONFIG.botDatabase',
    explanation:
      'Locate any bot entry in `detailedBots` or `botDatabase` and change its `status` field between `"active"` and `"deactivated"`. The TOTAL, ACTIVE, and DEACTIVATED dashboard counters recalculate automatically.',
    snippet: `// Inside src/config.js -> CONFIG.botDatabase (or CONFIG.detailedBots)
{
  id: "sudo-bot-1",
  name: "SUDO BOT 1",
  telegramUrl: "https://t.me/ll_SUPRRME_XD_1_ll_BOT",
  status: "deactivated", // <-- Change between "active" and "deactivated"
},`,
  },
  {
    id: 'add-bots',
    title: '2. Add New Bots',
    location: 'src/config.js → CONFIG.detailedBots or CONFIG.botDatabase',
    explanation:
      'Add a new object to `CONFIG.detailedBots` (for bots with a custom description and category) or `CONFIG.botDatabase` (for SUDO/fleet records). Duplicate Telegram URLs or usernames are automatically filtered out.',
    snippet: `// Add a detailed bot in CONFIG.detailedBots:
{
  id: "detailed-new-bot",
  name: "New Utility Bot",
  username: "@YourNewBot",
  telegramUrl: "https://t.me/YourNewBot",
  category: "UTILITY BOT",
  status: "active",
  description: "Short description of what this bot does.",
},

// Or add a fleet record in CONFIG.botDatabase:
{
  id: "sudo-bot-11",
  name: "SUDO BOT 11",
  telegramUrl: "https://t.me/ll_SUPRRME_XD_11_ll_BOT",
  status: "active",
},`,
  },
  {
    id: 'add-communities',
    title: '3. Add or Edit Communities',
    location: 'src/config.js → CONFIG.communities',
    explanation:
      'Append a new community object to `CONFIG.communities`. If `memberCount` is omitted, the UI hides the member count field rather than inventing numbers.',
    snippet: `// Inside src/config.js -> CONFIG.communities
{
  id: "comm-new-group",
  name: "NEW COMMUNITY",
  type: "COMMUNITY GROUP",
  telegramUrl: "https://t.me/YourCommunityLink",
  description: "Official community space description.",
  status: "active",
  // memberCount: "1,200", // Optional: hidden automatically when omitted
},`,
  },
  {
    id: 'social-links',
    title: '4. Change Social Links (Telegram & Instagram)',
    location: 'src/config.js → CONFIG.socials',
    explanation:
      'Update `url` or `username` under `CONFIG.socials.telegram` or `CONFIG.socials.instagram`. All external social buttons read directly from these fields and open in a new tab.',
    snippet: `// Inside src/config.js -> CONFIG.socials
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
    id: 'enable-music',
    title: '5. Enable the Music Player Later',
    location: 'src/config.js → CONFIG.musicEnabled & CONFIG.music',
    explanation:
      'The MusicPlayer component is built and wired into the app, hidden by default (`musicEnabled: false`). Change `musicEnabled` to `true` to display the player in the bottom-right corner.',
    snippet: `// Inside src/config.js
musicEnabled: true, // <-- Change from false to true
music: {
  title: "GETO // DARK SYNTH PROTOCOL",
  artist: "@ll_DARK_GETO_ll",
  audioUrl: "", // Optional MP3 URL (uses built-in Web Audio synth if empty)
  autoPlay: false,
},`,
  },
];

export const ConfigReferenceModal: React.FC<ConfigReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-guide-title"
    >
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-xl bg-[#0D1117] border border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-emerald-400" />
            <h2
              id="config-guide-title"
              className="text-base font-semibold text-slate-100"
            >
              Configuration Reference — <code className="font-mono text-emerald-400">src/config.js</code>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close configuration guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed">
            All profile details, 14 bot entries (4 detailed bots + 10 SUDO bot nodes), 3 communities, and social URLs are pre-loaded in{' '}
            <code className="font-mono text-xs text-emerald-300">src/config.js</code>. Below is the exact reference for making future updates.
          </p>

          {GUIDE_SECTIONS.map((item) => (
            <div
              key={item.id}
              className="rounded-lg bg-[#090B10] border border-slate-800/90 p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {item.title}
                </h3>
                <span className="font-mono text-xs text-emerald-400">
                  {item.location}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.explanation}
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-[#0D1117] border border-slate-800/80 p-3.5 font-mono text-xs text-slate-200 leading-relaxed">
                  <code>{item.snippet}</code>
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.snippet)}
                  className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-slate-800/90 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-[#090B10]">
          <span className="font-mono text-xs text-slate-400">
            GETO@TELEGRAM:~$ cat src/config.js
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
