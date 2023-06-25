import { defineStore } from 'pinia'
export const useAudioplayerStore = defineStore('audioplayer', () => {
  const currentAudioId = ref()
  const currentAudioIndex = ref(0)
  const playlistData = ref()

  function setCurrentAudioId(id: string): void {
    currentAudioId.value = id
  }
  function setCurrentAudioIdByIndex(index: number): void {
    currentAudioId.value =
      playlistData?.value?.items[index]?.snippet?.resourceId?.videoId
  }

  function setPlaylistData(data: any) {
    playlistData.value = data
  }

  function setCurrentAudioIndex(index: number) {
    currentAudioIndex.value = index
  }

  function incrementCurrentAudioIndex(): void {
    currentAudioIndex.value++
  }

  return {
    setCurrentAudioId,
    playlistData,
    setPlaylistData,
    currentAudioId,
    currentAudioIndex,
    setCurrentAudioIndex,
    incrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
  }
})
