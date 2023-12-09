import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', () => {
    const tunnelMode = ref(false)

    function setTunnelMode(bool: boolean): void {
        tunnelMode.value = bool
    }

    return {
        tunnelMode,
        setTunnelMode,
    }
})