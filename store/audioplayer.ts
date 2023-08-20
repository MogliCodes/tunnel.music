import { defineStore } from 'pinia'
export const useAudioplayerStore = defineStore('audioplayer', () => {
  const currentAudioId = ref()
  const currentAudioIndex = ref()
  const playlistData = ref(null)
  const isPlaying = ref(false)

  function setCurrentAudioId(id: string): void {
    currentAudioId.value = id
  }

  function setCurrentAudioIdByIndex(index: number): void {
    currentAudioId.value =
      playlistData.value[index]?.snippet?.resourceId?.videoId
    console.log(
      ' setCurrentAudioIdByIndex currentAudioId.value',
      currentAudioId.value,
    )
  }

  function setPlaylistData(data: object): void {
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

  return {
    setCurrentAudioId,
    playlistData,
    isPlaying,
    setPlaylistData,
    clearPlaylistData,
    currentAudioId,
    currentAudioIndex,
    setCurrentAudioIndex,
    decrementCurrentAudioIndex,
    incrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
    setIsPlaying
  }
})
