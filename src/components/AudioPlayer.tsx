import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioPlayerProps {
  className?: string;
}

interface HTMLAudioElementWithPlaying extends HTMLAudioElement {
  playing?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElementWithPlaying | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const attemptRef = useRef<number>(0);

  const startVolumeFade = () => {
    if (audioRef.current) {
      // Start at volume 0.1 (10%)
      audioRef.current.volume = 0.1;
      let currentVolume = 0.1;

      // Clear any existing interval
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }

      // Gradually increase volume every 2 seconds
      volumeIntervalRef.current = setInterval(() => {
        if (audioRef.current && currentVolume < 0.3) { // Max volume 0.3 (30%)
          currentVolume = Math.min(0.3, currentVolume + 0.01);
          audioRef.current.volume = currentVolume;
        } else if (volumeIntervalRef.current) {
          clearInterval(volumeIntervalRef.current);
        }
      }, 2000);
    }
  };

  const attemptAutoplay = async () => {
    if (audioRef.current && attemptRef.current < 3) {
      try {
        // Set initial volume to 0 to prevent initial loud playback
        audioRef.current.volume = 0;
        audioRef.current.muted = false;
        
        // Try to play
        await audioRef.current.play();
        audioRef.current.playing = true;
        
        // If successful, start volume fade
        startVolumeFade();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay attempt failed:', error);
        attemptRef.current += 1;
        // Try again after a short delay
        setTimeout(attemptAutoplay, 100);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.playing = false;
      } else {
        audioRef.current.play().catch(console.error);
        audioRef.current.playing = true;
        if (audioRef.current.volume === 0) {
          startVolumeFade();
        }
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
    let isComponentMounted = true;

    // Start playing when component mounts
    if (isComponentMounted) {
      attemptAutoplay();
    }

    // Add event listeners for better autoplay handling
    const handleVisibilityChange = () => {
      if (!document.hidden && audioRef.current && !audioRef.current.playing) {
        attemptAutoplay();
      }
    };

    const handleUserInteraction = () => {
      if (audioRef.current && !audioRef.current.playing) {
        attemptAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    // Cleanup function
    return () => {
      isComponentMounted = false;
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.playing = false;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <audio
        ref={audioRef}
        src="/audio/Omena - Music Video  Madaraka Vibes Album  Simon Javan Okelo.mp3"
        loop
        autoPlay
        playsInline
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
