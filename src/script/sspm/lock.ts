interface Locker {
    lock(): void
    unlock(): void
    locked(): boolean
}

class Listener<E extends Event> implements Locker, Notifier {
    #lock: boolean
    #listener: (evt: E) => any
    #observers: Observer[]

    constructor(listener: (evt: E) => any) {
        this.#listener = listener
        this.#lock = false
        this.#observers = []
    }

    attach(ob: Observer): void {
        this.#observers.push(ob)
    }

    detach(ob: Observer): void {
        const index = this.#observers.findIndex(o => o === ob)
        this.#observers.splice(index, 1)
    }

    notify(): void {
        for (let i = 0; i < this.#observers.length; i++) {
             this.#observers[i].update()
        }
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
            this.notify()
        }
    }
}

export { Locker, Listener }