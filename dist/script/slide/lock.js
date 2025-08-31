class ListenerLock {
    #lock;
    #listener;
    constructor(listener) {
        this.#listener = listener;
        this.#lock = false;
    }
    lock() {
        this.#lock = true;
    }
    unlock() {
        this.#lock = false;
    }
    locked() {
        return this.#lock === true;
    }
    listener() {
        return (evt) => {
            if (this.locked()) {
                return;
            }
            this.#listener(evt);
        };
    }
}
export { ListenerLock };
