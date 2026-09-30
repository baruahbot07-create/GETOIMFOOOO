import React, { useState } from 'react';

interface GetoAvatarProps {
  profileImage?: string | null;
  avatarText?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GetoAvatar: React.FC<GetoAvatarProps> = ({
  profileImage,
  avatarText = 'GETO',
  username = '@ll_DARK_GETO_ll',
  size = 'lg',
}) => {
  const [imgError, setImgError] = useState(false);

  const showImage = Boolean(profileImage && profileImage.trim() !== '' && !imgError);

  const dimensions =
    size === 'lg'
      ? 'w-28 h-28 sm:w-32 sm:h-32'
      : size === 'md'
        ? 'w-16 h-16'
        : 'w-10 h-10';

  const textSizes =
    size === 'lg'
      ? 'text-2xl sm:text-3xl tracking-[0.18em]'
      : size === 'md'
        ? 'text-base tracking-[0.15em]'
        : 'text-xs tracking-[0.12em]';

  return (
    <div
      className={`relative ${dimensions} shrink-0 select-none overflow-hidden rounded-xl bg-[#0D1117] border border-slate-800 flex flex-col items-center justify-center group`}
      aria-label={`${avatarText} (${username}) avatar`}
    >
      {/* Subtle architectural corner markers */}
      <span className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-emerald-500/50" />
      <span className="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-emerald-500/50" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-emerald-500/50" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-emerald-500/50" />

      {/* Subtle internal grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 bg-cyber-grid"
        aria-hidden="true"
      />

      {/* Radial dark emerald atmospheric glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      {showImage ? (
        <img
          src={profileImage!}
          alt={avatarText}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="relative z-10 w-full h-full object-cover"
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center">
          <span
            className={`font-bold text-slate-100 ${textSizes} pl-[0.18em] transition-transform duration-150 group-hover:scale-105`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {avatarText}
          </span>
          {size === 'lg' && (
            <span className="mt-1.5 font-mono text-[10px] text-emerald-400/90 tracking-widest uppercase">
              SYS.NODE
            </span>
          )}
        </div>
      )}
    </div>
  );
};
