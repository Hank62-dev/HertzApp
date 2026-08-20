import type { CSSProperties, ChangeEvent } from 'react'
import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { usePlayerStore } from '../../store'
import { PlayerIconButton } from './player-icon-button'

type ProgressStyle = CSSProperties & { '--range-progress': string }

export function VolumeControl() {
  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const setVolume = usePlayerStore((state) => state.setVolume)
  const toggleMute = usePlayerStore((state) => state.toggleMute)
  const audibleVolume = isMuted ? 0 : volume
  const style: ProgressStyle = { '--range-progress': `${audibleVolume * 100}%` }
  const VolumeIcon = audibleVolume === 0 ? VolumeX : audibleVolume < 0.5 ? Volume1 : Volume2

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value))
  }

  return (
    <div className="flex items-center gap-1">
      <PlayerIconButton label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
        <VolumeIcon size={18} />
      </PlayerIconButton>
      <input
        aria-label="Volume"
        className="player-range volume-range"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        style={style}
        onChange={handleChange}
      />
    </div>
  )
}
