import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import { usePlayerStore } from '../store'

export interface UseAudioPlayerResult {
  audioRef: RefObject<HTMLAudioElement | null>
}

function getAudioErrorMessage(error: MediaError | null): string {
  switch (error?.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return 'Audio loading was aborted.'
    case MediaError.MEDIA_ERR_NETWORK:
      return 'A network error interrupted audio loading.'
    case MediaError.MEDIA_ERR_DECODE:
      return 'The audio file could not be decoded.'
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'The audio source or format is not supported.'
    default:
      return 'An unknown audio error occurred.'
  }
}

async function playAudio(audio: HTMLAudioElement): Promise<void> {
  try {
    await audio.play()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Playback failed.'
    usePlayerStore.getState().setError(message)
  }
}

export function useAudioPlayer(): UseAudioPlayerResult {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackId = usePlayerStore((state) => state.currentTrack?.id ?? null)
  const audioUrl = usePlayerStore((state) => state.currentTrack?.audioUrl ?? null)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const currentTime = usePlayerStore((state) => state.currentTime)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const handleTimeUpdate = () => {
      usePlayerStore.getState().setCurrentTime(audio.currentTime)
    }

    const handleDurationChange = () => {
      usePlayerStore.getState().setDuration(audio.duration)
    }

    const handleEnded = () => {
      const player = usePlayerStore.getState()

      if (player.repeatMode === 'one') {
        audio.currentTime = 0
        player.setCurrentTime(0)
        void playAudio(audio)
        return
      }

      player.nextTrack()
    }

    const handleError = () => {
      usePlayerStore.getState().setError(getAudioErrorMessage(audio.error))
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!audioUrl) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      return
    }

    audio.src = audioUrl
    audio.load()
  }, [audioUrl, trackId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && audioUrl) {
      void playAudio(audio)
    } else {
      audio.pause()
    }
  }, [audioUrl, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.muted = isMuted
  }, [isMuted, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || Math.abs(audio.currentTime - currentTime) < 0.5) return

    audio.currentTime = currentTime
  }, [currentTime])

  return { audioRef }
}
