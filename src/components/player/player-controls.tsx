import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react'

import { usePlayerStore } from '../../store'
import { PlayerIconButton } from './player-icon-button'

export function PlayerControls() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const isShuffle = usePlayerStore((state) => state.isShuffle)
  const repeatMode = usePlayerStore((state) => state.repeatMode)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const nextTrack = usePlayerStore((state) => state.nextTrack)
  const previousTrack = usePlayerStore((state) => state.previousTrack)
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle)
  const toggleRepeat = usePlayerStore((state) => state.toggleRepeat)
  const disabled = currentTrack === null
  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat

  return (
    <div className="flex items-center justify-center gap-2">
      <PlayerIconButton label="Shuffle" active={isShuffle} onClick={toggleShuffle} disabled={disabled}>
        <Shuffle size={17} />
      </PlayerIconButton>
      <PlayerIconButton label="Previous track" onClick={previousTrack} disabled={disabled}>
        <SkipBack size={20} fill="currentColor" />
      </PlayerIconButton>
      <PlayerIconButton
        label={isPlaying ? 'Pause' : 'Play'}
        className="size-10 bg-white text-zinc-950 hover:scale-105 hover:bg-white hover:text-zinc-950"
        onClick={togglePlay}
        disabled={disabled}
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play className="ml-0.5" size={20} fill="currentColor" />}
      </PlayerIconButton>
      <PlayerIconButton label="Next track" onClick={nextTrack} disabled={disabled}>
        <SkipForward size={20} fill="currentColor" />
      </PlayerIconButton>
      <PlayerIconButton
        label={`Repeat: ${repeatMode}`}
        active={repeatMode !== 'off'}
        onClick={toggleRepeat}
        disabled={disabled}
      >
        <RepeatIcon size={17} />
      </PlayerIconButton>
    </div>
  )
}
