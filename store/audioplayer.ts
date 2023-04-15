import { defineStore } from 'pinia'
export const useAudioplayerStore = defineStore('audioplayer', () => {
  const currentAudioId = ref()
  const currentAudioIndex = ref(0)
  const playlistData = ref()

  function setCurrentAudioId(id: number): void {
    currentAudioId.value = id
  }

  function setPlaylistData(data: any) {
    playlistData.value = data
  }

  function setCurrentAudioIndex(index: number) {
    currentAudioIndex.value = index
  }

  return {
    setCurrentAudioId,
    playlistData,
    setPlaylistData,
    currentAudioId,
    currentAudioIndex,
    setCurrentAudioIndex,
  }
})
