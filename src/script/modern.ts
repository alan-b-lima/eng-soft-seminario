const MILLISECOND = 1
const SECOND = 1000 * MILLISECOND
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

function format_duration(duration_ms: number): string {
    const seconds = Math.floor((duration_ms % MINUTE) / SECOND)
    const minutes = Math.floor((duration_ms % HOUR) / MINUTE)
    const hours = Math.floor(duration_ms / HOUR)

    return new (Intl as any).DurationFormat("pt-br", { style: "digital" }).format({
        hours, minutes, seconds
    })
}

export class Ticker {
    #id: number | null

    constructor() {
        this.#id = null
    }

    start(callback: () => void, timeout: number): void {
        if (this.#id !== null) {
            return
        }

        this.#id = setInterval(callback)
    }

    stop(): void {
        if (this.#id === null) {
            return
        }

        clearInterval(this.#id)
        this.#id = null
    }
}

export { format_duration }