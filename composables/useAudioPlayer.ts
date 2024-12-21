import { useState } from '#app'
type YoutubeItem = {
    snippet: {
        resourceId: {
            videoId: string
        }
        title: string
    }
    type: string
    snipped: any
    path: string
}

type PlaylistComment = {
    path: string
    index: number
    text: string
    type: string
    snippet?: any
}

type PlaylistData = Array<YoutubeItem | PlaylistComment>

export function useAudioplayer() {
  const currentAudioId = useState<string | undefined>('currentAudioId', () => undefined)
  const currentAudioIndex = useState<number | null>('currentAudioIndex', () => null)
  const currentType = useState<string | undefined>('currentType', () => undefined)
  const currentCommentPath = useState<string>('currentCommentPath', () => '')
  const playlistData = useState<PlaylistData | null>('playlistData', () => null)
  const isPlaying = useState<boolean>('isPlaying', () => false)
  const isCommentary = useState<boolean>('isCommentary', () => false)

  function setCurrentAudioId(id: string): void {
    console.log('setCurrentAudioId id', id)
    currentAudioId.value = id
  }

  function setCurrentAudioIdByIndex(index: number | null): void {
    if(!index || !playlistData.value) return
    if (!playlistData.value) return
    currentAudioId.value = playlistData.value[index]?.snippet?.resourceId?.videoId
    console.log('setCurrentAudioIdByIndex currentAudioId.value', currentAudioId.value)
  }

  function setCurrentTypeByIndex(index: number): void {
    if (!playlistData.value) return
    currentType.value = playlistData.value[index].type
  }

  function setPlaylistData(data: PlaylistData | null): void {
    playlistData.value = data
  }

  function clearPlaylistData(): void {
    playlistData.value = null
    currentAudioId.value = undefined
    currentAudioIndex.value = null
  }

  function setCurrentAudioIndex(index: number): void {
    currentAudioIndex.value = index
  }

  function decrementCurrentAudioIndex(): void {
    if (!!currentAudioIndex.value) {
      currentAudioIndex.value--
    }
  }

  function incrementCurrentAudioIndex(): void {
    if (!!currentAudioIndex.value) {
      currentAudioIndex.value++
      console.log('INCREMENT')
      console.log(currentAudioIndex.value)
    }
  }

  function setIsPlaying(bool: boolean): void {
    console.log('setIsPlaying bool', bool)
    isPlaying.value = bool
  }

  function setIsCommentary(bool: boolean): void {
    isCommentary.value = bool
  }

  function setCurrentType(type: string): void {
    currentType.value = type
  }

  function setCurrentCommentPath(path: string): void {
    currentCommentPath.value = path
  }

  function setCurrentCommentPathByIndex(index: number): void {
    if (!playlistData.value) return
    currentCommentPath.value = playlistData.value[index].path
  }

  return {
    playlistData,
    isPlaying,
    isCommentary,
    currentAudioId,
    currentAudioIndex,
    currentType,
    currentCommentPath,
    setPlaylistData,
    clearPlaylistData,
    setCurrentAudioId,
    setCurrentAudioIndex,
    decrementCurrentAudioIndex,
    incrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
    setIsPlaying,
    setIsCommentary,
    setCurrentType,
    setCurrentCommentPath,
    setCurrentCommentPathByIndex,
    setCurrentTypeByIndex
  }
}