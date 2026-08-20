import { ListMusic } from 'lucide-react'

import { usePlayerStore } from '../../store'
import { PlayerControls } from './player-controls'
import { PlayerIconButton } from './player-icon-button'
import { ProgressBar } from './progress-bar'
import { VolumeControl } from './volume-control'

export function PlayerBar() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const error = usePlayerStore((state) => state.error)

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-zinc-950/95 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6">
      {error && (
        <p className="absolute bottom-full left-1/2 w-fit max-w-[90vw] -translate-x-1/2 rounded-t-lg bg-red-500 px-4 py-2 text-xs font-medium text-white">
          {error}
        </p>
      )}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[minmax(180px,1fr)_minmax(360px,1.4fr)_minmax(180px,1fr)]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-12 shrink-0 overflow-hidden rounded-md bg-zinc-800">
            {currentTrack && <img className="size-full object-cover" src={currentTrack.coverUrl} alt="" />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentTrack?.title ?? 'Choose a song'}</p>
            <p className="truncate text-xs text-zinc-400">{currentTrack?.artist.name ?? 'Hertz'}</p>
          </div>
        </div>

        <div className="col-span-2 flex min-w-0 flex-col items-center gap-1 md:col-span-1">
          <PlayerControls />
          <ProgressBar />
        </div>

        <div className="hidden items-center justify-end gap-2 md:flex">
          <PlayerIconButton label="Queue">
            <ListMusic size={18} />
          </PlayerIconButton>
          <VolumeControl />
        </div>
      </div>
    </footer>
  )
}
