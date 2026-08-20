import type { Song } from './song'

export type PlaylistVisibility = 'public' | 'private' | 'unlisted'

export interface PlaylistOwner {
  id: string
  displayName: string
  avatarUrl: string | null
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string | null
  owner: PlaylistOwner
  tracks: Song[]
  visibility: PlaylistVisibility
  createdAt: string
  updatedAt: string
}
