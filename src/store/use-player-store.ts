import { create } from 'zustand'

import type { PlayerState, PlayerStore, RepeatMode, Song } from '../types'

const REPEAT_MODE_ORDER: RepeatMode[] = ['off', 'all', 'one']

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  queueIndex: -1,
  isShuffle: false,
  repeatMode: 'off',
  error: null,
}

function clamp(value: number, minimum: number, maximum: number): number {
  if (!Number.isFinite(value)) return minimum
  return Math.min(Math.max(value, minimum), maximum)
}

function getRandomQueueIndex(queueLength: number, currentIndex: number): number {
  if (queueLength <= 1) return 0

  // Pick from queueLength - 1 choices, then skip the current index.
  // This guarantees that shuffle never immediately repeats the same track.
  const candidate = Math.floor(Math.random() * (queueLength - 1))
  return candidate >= currentIndex ? candidate + 1 : candidate
}

function getTrackState(queue: Song[], queueIndex: number) {
  const currentTrack = queue[queueIndex]

  if (!currentTrack) {
    throw new RangeError(`Queue index ${queueIndex} is out of bounds`)
  }

  return {
    currentTrack,
    queueIndex,
    currentTime: 0,
    duration: currentTrack.duration,
    isPlaying: true,
    error: null,
  }
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  ...initialState,

  playTrack: (song) => {
    const state = get()
    const existingIndex = state.queue.findIndex((track) => track.id === song.id)
    const isCurrentTrack = state.currentTrack?.id === song.id

    if (isCurrentTrack) {
      set({ isPlaying: true, error: null })
      return
    }

    // A directly selected song is appended when it is not already in the queue.
    const queue = existingIndex >= 0 ? state.queue : [...state.queue, song]
    const queueIndex = existingIndex >= 0 ? existingIndex : queue.length - 1

    set({ queue, ...getTrackState(queue, queueIndex) })
  },

  togglePlay: () => {
    const { currentTrack, isPlaying } = get()
    if (!currentTrack) return

    set({ isPlaying: !isPlaying, error: null })
  },

  nextTrack: () => {
    const { queue, queueIndex, isShuffle, repeatMode } = get()
    if (queue.length === 0) return

    if (isShuffle) {
      set(getTrackState(queue, getRandomQueueIndex(queue.length, queueIndex)))
      return
    }

    const nextIndex = queueIndex + 1
    if (nextIndex < queue.length) {
      set(getTrackState(queue, nextIndex))
      return
    }

    if (repeatMode === 'all') {
      set(getTrackState(queue, 0))
      return
    }

    // Keep the final track selected so the user can replay or seek it.
    set({ isPlaying: false, currentTime: get().duration })
  },

  previousTrack: () => {
    const { queue, queueIndex, isShuffle, repeatMode } = get()
    if (queue.length === 0) return

    if (isShuffle) {
      set(getTrackState(queue, getRandomQueueIndex(queue.length, queueIndex)))
      return
    }

    const previousIndex = queueIndex - 1
    if (previousIndex >= 0) {
      set(getTrackState(queue, previousIndex))
      return
    }

    if (repeatMode === 'all') {
      set(getTrackState(queue, queue.length - 1))
      return
    }

    set({ currentTime: 0 })
  },

  seek: (time) => {
    const { duration } = get()
    set({ currentTime: clamp(time, 0, duration) })
  },

  setVolume: (volume) => {
    set({ volume: clamp(volume, 0, 1), isMuted: false })
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  toggleRepeat: () => {
    const currentModeIndex = REPEAT_MODE_ORDER.indexOf(get().repeatMode)
    const nextModeIndex = (currentModeIndex + 1) % REPEAT_MODE_ORDER.length
    const repeatMode = REPEAT_MODE_ORDER[nextModeIndex]

    if (repeatMode) set({ repeatMode })
  },

  setQueue: (queue, startIndex = 0) => {
    if (queue.length === 0) {
      set({
        queue: [],
        queueIndex: -1,
        currentTrack: null,
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        error: null,
      })
      return
    }

    const queueIndex = clamp(Math.trunc(startIndex), 0, queue.length - 1)
    const currentTrack = queue[queueIndex]

    if (!currentTrack) return

    set({
      queue: [...queue],
      queueIndex,
      currentTrack,
      currentTime: 0,
      duration: currentTrack.duration,
      isPlaying: false,
      error: null,
    })
  },

  setCurrentTime: (time) =>
    set({ currentTime: Number.isFinite(time) ? Math.max(0, time) : 0 }),
  setDuration: (duration) =>
    set({ duration: Number.isFinite(duration) ? Math.max(0, duration) : 0 }),
  setError: (error) => set({ error, isPlaying: error ? false : get().isPlaying }),
}))
