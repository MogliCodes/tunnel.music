// composables/useApp.ts
import { useState } from '#app'

export function useApp() {
    const tunnelMode = useState('tunnelMode', () => false)

    function setTunnelMode(bool: boolean): void {
        tunnelMode.value = bool
    }

    return {
        tunnelMode,
        setTunnelMode,
    }
}