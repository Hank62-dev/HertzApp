import { Pause, Play } from 'lucide-react'

import type { Song } from '../../../types'

interface SongCardProps {
  song: Song
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
}

export function SongCard({ song, isActive, isPlaying, onPlay }: SongCardProps) {
  return (
    <article className="group min-w-0 rounded-xl bg-white/[0.045] p-3 transition hover:-translate-y-1 hover:bg-white/[0.09]">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800 shadow-xl">
        <img
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          src={song.coverUrl}
          alt={`Cover of ${song.title}`}
          loading="lazy"
        />
        <button
          type="button"
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${song.title}`}
          onClick={onPlay}
          className={`absolute bottom-3 right-3 grid size-12 place-items-center rounded-full bg-emerald-400 text-zinc-950 shadow-xl transition hover:scale-105 ${
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
          }`}
        >
          {isPlaying ? <Pause size={21} fill="currentColor" /> : <Play className="ml-0.5" size={21} fill="currentColor" />}
        </button>
      </div>
      <h3 className={`mt-3 truncate text-sm font-semibold ${isActive ? 'text-emerald-400' : 'text-white'}`}>
        {song.title}
      </h3>
      <p className="mt-1 truncate text-xs text-zinc-400">{song.artist.name}</p>
    </article>
  )
}
