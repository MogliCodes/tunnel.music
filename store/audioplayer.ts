import { defineStore } from 'pinia'
export const useAudioplayerStore = defineStore('audioplayer', () => {
  const currentAudioId = ref()
  const currentAudioIndex = ref()
  const playlistData = ref()

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

  function setPlaylistData(data: object) {
    playlistData.value = data
  }

  function setCurrentAudioIndex(index: number) {
    currentAudioIndex.value = index
  }

  function decrementCurrentAudioIndex() {
    currentAudioIndex.value--
  }

  function incrementCurrentAudioIndex(): void {
    currentAudioIndex.value++
    console.log('INCREMENT')
    console.log(currentAudioIndex.value)
  }

  return {
    setCurrentAudioId,
    playlistData,
    setPlaylistData,
    currentAudioId,
    currentAudioIndex,
    setCurrentAudioIndex,
    decrementCurrentAudioIndex,
    incrementCurrentAudioIndex,
    setCurrentAudioIdByIndex,
  }
})
