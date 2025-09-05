class Listener {
    #lock;
    #listener;
    #observers;
    constructor(listener) {
        this.#listener = listener;
        this.#lock = false;
        this.#observers = [];
    }
    attach(ob) {
        this.#observers.push(ob);
    }
    detach(ob) {
        const index = this.#observers.findIndex(o => o === ob);
        this.#observers.splice(index, 1);
    }
    notify() {
        for (let i = 0; i < this.#observers.length; i++) {
            this.#observers[i].update();
        }
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
            this.notify();
        };
    }
}
export { Listener };
