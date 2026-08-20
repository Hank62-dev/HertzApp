import { usePlayerStore } from '../../../store'
import type { Song } from '../../../types'
import { SongCard } from './song-card'

interface SongGridProps {
  songs: Song[]
}

export function SongGrid({ songs }: SongGridProps) {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setQueue = usePlayerStore((state) => state.setQueue)
  const playTrack = usePlayerStore((state) => state.playTrack)
  const togglePlay = usePlayerStore((state) => state.togglePlay)

  const handlePlay = (song: Song, index: number) => {
    if (currentTrack?.id === song.id) {
      togglePlay()
      return
    }

    setQueue(songs, index)
    playTrack(song)
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          isActive={currentTrack?.id === song.id}
          isPlaying={currentTrack?.id === song.id && isPlaying}
          onPlay={() => handlePlay(song, index)}
        />
      ))}
    </div>
  )
}
