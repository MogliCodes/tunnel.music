import { defineStore } from 'pinia'
import { PlaylistData } from 'types'
export const useAudioplayerStore = defineStore('audioplayer', () => {
  const currentAudioId = ref()
  const currentAudioIndex = ref()
  const currentType = ref()
  const currentCommentPath = ref<string>('')
  const playlistData = ref<PlaylistData | null>()
  const isPlaying = ref(false)
  const isCommentary = ref(false)

  function setCurrentAudioId(id: string): void {
    currentAudioId.value = id
  }

  function setCurrentAudioIdByIndex(index: number): void {
    if(!playlistData?.value) return
    currentAudioId.value =
      playlistData?.value[index]?.snippet?.resourceId?.videoId
    console.log(
      ' setCurrentAudioIdByIndex currentAudioId.value',
      currentAudioId.value,
    )
  }

  function setCurrentTypeByIndex(index: number): void {
    if(!playlistData?.value) return
    currentType.value = playlistData.value[index].type
  }

  function setPlaylistData(data: PlaylistData | null): void {
    playlistData.value = data
  }

  function clearPlaylistData(): void {
    playlistData.value = null
    currentAudioId.value = null
    currentAudioIndex.value = null
  }

  function setCurrentAudioIndex(index: number): void {
    currentAudioIndex.value = index
  }

  function decrementCurrentAudioIndex(): void {
    currentAudioIndex.value--
  }

  function incrementCurrentAudioIndex(): void {
    currentAudioIndex.value++
    console.log('INCREMENT')
    console.log(currentAudioIndex.value)
  }

  function setIsPlaying(bool: boolean): void {
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
    if(!playlistData?.value) return
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
})
