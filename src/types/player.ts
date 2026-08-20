import type { Song } from './song'

export type RepeatMode = 'off' | 'one' | 'all'

/** Values owned by the global player store. */
export interface PlayerState {
  currentTrack: Song | null
  isPlaying: boolean
  /** Normalized volume from 0 (silent) to 1 (maximum). */
  volume: number
  isMuted: boolean
  /** Current playback position in seconds. */
  currentTime: number
  /** Current track duration in seconds. */
  duration: number
  queue: Song[]
  /** -1 means that no item in the queue is currently selected. */
  queueIndex: number
  isShuffle: boolean
  repeatMode: RepeatMode
  error: string | null
}

/** Commands exposed by the player store to UI components and the audio engine. */
export interface PlayerActions {
  playTrack: (song: Song) => void
  togglePlay: () => void
  nextTrack: () => void
  previousTrack: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  setQueue: (queue: Song[], startIndex?: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setError: (error: string | null) => void
}

export type PlayerStore = PlayerState & PlayerActions
