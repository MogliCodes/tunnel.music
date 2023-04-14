import { defineStore } from 'pinia'
export const useAudioplayerStore = defineStore('audioplayer', () => {
    const currentAudioId = ref()

    function setCurrentAudioId(id: number): void {
        currentAudioId.value = id
    }

    return { setCurrentAudioId }
})
