import type { AlbumSummary } from './album'
import type { ArtistSummary } from './artist'

export interface Song {
  id: string
  title: string
  artist: ArtistSummary
  /** A song can be released without belonging to an album. */
  album: AlbumSummary | null
  /** Streamable audio URL, either local mock data or a remote API URL. */
  audioUrl: string
  coverUrl: string
  /** Track length in seconds. */
  duration: number
  trackNumber?: number
  genres: string[]
  releaseDate?: string
  isExplicit: boolean
}
