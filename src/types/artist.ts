/** An artist that owns or performs music in the catalogue. */
export interface Artist {
  id: string
  name: string
  imageUrl: string | null
  bio?: string
  genres: string[]
  followerCount?: number
}

/**
 * Lightweight artist data embedded in a song or album.
 * Keeping this separate prevents every track from carrying a large artist object.
 */
export type ArtistSummary = Pick<Artist, 'id' | 'name' | 'imageUrl'>
