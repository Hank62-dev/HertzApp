import type { ArtistSummary } from './artist'

export type AlbumType = 'album' | 'single' | 'ep' | 'compilation'

export interface Album {
  id: string
  title: string
  artist: ArtistSummary
  coverUrl: string
  releaseDate: string
  type: AlbumType
  genres: string[]
  trackCount: number
  /** Total duration in seconds. */
  duration: number
}

/** Minimum album information needed by track cards and the player bar. */
export type AlbumSummary = Pick<Album, 'id' | 'title' | 'coverUrl'>
