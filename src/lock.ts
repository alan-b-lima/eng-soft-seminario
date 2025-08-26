interface Locker {
    lock(): void
    unlock(): void
    locked(): boolean
}

class ListenerLock<E extends Event> implements Locker {
    #lock: boolean
    #listener: (evt: E) => any

    constructor(listener: (evt: E) => any) {
        this.#listener = listener
        this.#lock = false
    }

    lock(): void {
        this.#lock = true
    }

    unlock(): void {
        this.#lock = false
    }

    locked(): boolean {
        return this.#lock === true
    }

    listener(): (evt: E) => any {
        return (evt: E) => {
            if (this.locked()) {
                return
            }

            this.#listener(evt)
        }
    }
}

export { Locker, ListenerLock }