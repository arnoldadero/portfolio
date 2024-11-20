import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <audio
        ref={audioRef}
        src="/audio/Omena - Music Video  Madaraka Vibes Album  Simon Javan Okelo.mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>
      <button
        onClick={toggleMute}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
