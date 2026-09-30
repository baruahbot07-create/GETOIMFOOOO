import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio } from 'lucide-react';

interface MusicConfig {
  title: string;
  artist: string;
  audioUrl?: string;
  autoPlay?: boolean;
}

interface MusicPlayerProps {
  enabled: boolean;
  musicConfig: MusicConfig;
}

/**
 * MusicPlayer Component
 * Kept in the project so it can be enabled anytime via `musicEnabled: true` in `src/config.js`.
 * By default (`musicEnabled: false`), this component renders nothing.
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({ enabled, musicConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Do not display the music player when musicEnabled is false
  if (!enabled) {
    return null;
  }

  const toggleSynth = () => {
    if (musicConfig.audioUrl && musicConfig.audioUrl.trim() !== '') {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    // Fallback Web Audio API dark cyber ambient synth pad when no external MP3 is set
    if (isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const masterGain = ctx.createGain();
        masterGain.gain.value = isMuted ? 0 : 0.08;
        masterGain.connect(ctx.destination);

        // Dual detuned dark bass drone oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.value = 55; // A1
        osc2.frequency.value = 110.4; // Detuned A2

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 240;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();

        audioCtxRef.current = ctx;
        gainNodeRef.current = masterGain;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0 : 0.08,
        audioCtxRef.current.currentTime
      );
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-xl bg-[#0D1117]/95 border border-slate-800 px-4 py-2.5 backdrop-blur-md">
      {musicConfig.audioUrl ? (
        <audio
          ref={audioRef}
          src={musicConfig.audioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      ) : null}

      <button
        type="button"
        onClick={toggleSynth}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="min-w-0 pr-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200 truncate">
          <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{musicConfig.title}</span>
        </div>
        <p className="font-mono text-[11px] text-slate-400 truncate">
          {musicConfig.artist} · {isPlaying ? 'PLAYING' : 'STANDBY'}
        </p>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};
