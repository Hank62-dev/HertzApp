import type { CSSProperties, ChangeEvent } from 'react'

import { usePlayerStore } from '../../store'
import { formatTime } from '../../utils'

type ProgressStyle = CSSProperties & { '--range-progress': string }

export function ProgressBar() {
  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const seek = usePlayerStore((state) => state.seek)
  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0
  const style: ProgressStyle = { '--range-progress': `${percentage}%` }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number(event.target.value))
  }

  return (
    <div className="flex w-full items-center gap-3 text-[11px] text-zinc-400">
      <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
      <input
        aria-label="Song progress"
        className="player-range"
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        style={style}
        onChange={handleChange}
        disabled={duration <= 0}
      />
      <span className="w-9 tabular-nums">{formatTime(duration)}</span>
    </div>
  )
}
