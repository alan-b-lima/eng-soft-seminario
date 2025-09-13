const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
export function format_duration(duration_ms) {
    const seconds = Math.floor((duration_ms % MINUTE) / SECOND);
    const minutes = Math.floor((duration_ms % HOUR) / MINUTE);
    const hours = Math.floor(duration_ms / HOUR);
    return new Intl.DurationFormat("pt-br", { style: "digital" }).format({
        hours, minutes, seconds
    });
}
export class Ticker {
    #id;
    constructor() {
        this.#id = null;
    }
    start(callback, timeout) {
        if (this.#id !== null) {
            clearInterval(this.#id);
        }
        this.#id = setInterval(callback);
    }
    stop() {
        if (this.#id === null) {
            return;
        }
        clearInterval(this.#id);
        this.#id = null;
    }
}
