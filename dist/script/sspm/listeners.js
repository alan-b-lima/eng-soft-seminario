import { Listener } from "./lock.js";
export function setup_event_listenters(ss, tree) {
    const keydown_lock = new Listener(navigation_keydown_listener.bind(null, ss));
    const click_lock = new Listener(navigation_click_listener.bind(null, ss));
    window.addEventListener("keydown", keydown_lock.listener());
    window.addEventListener("click", click_lock.listener());
    const bundle = new ListenerBundle(keydown_lock, click_lock);
    if (tree !== undefined) {
        window.addEventListener("keydown", escape_keydown_listener(bundle, tree));
    }
    return bundle;
}
class ListenerBundle {
    #listeners;
    constructor(...listeners) {
        this.#listeners = listeners;
    }
    attach(ob) {
        for (let i = 0; i < this.#listeners.length; i++) {
            this.#listeners[i].attach(ob);
        }
    }
    detach(ob) {
        for (let i = 0; i < this.#listeners.length; i++) {
            this.#listeners[i].detach(ob);
        }
    }
    notify() {
        for (let i = 0; i < this.#listeners.length; i++) {
            this.#listeners[i].notify();
        }
    }
    lock() {
        for (let i = 0; i < this.#listeners.length; i++) {
            this.#listeners[i].lock();
        }
    }
    unlock() {
        for (let i = 0; i < this.#listeners.length; i++) {
            this.#listeners[i].unlock();
        }
    }
    locked() {
        return this.#listeners.length > 0 && this.#listeners[0].locked();
    }
}
function navigation_keydown_listener(ss, evt) {
    switch (evt.key) {
        case "PageUp":
        case "ArrowUp":
        case "ArrowLeft":
        case "a":
            ss.revert();
            break;
        case "PageDown":
        case "ArrowDown":
        case "ArrowRight":
        case "d":
            ss.advance();
            break;
        case "Home":
            ss.goto(0);
            break;
        case "End":
            ss.goto(ss.length() - 1);
            break;
        default:
            return;
    }
    evt.preventDefault();
}
function navigation_click_listener(ss, evt) {
    const THRESHOLD_FOR_REVERT = 0.10;
    if (evt.screenX / window.innerWidth >= THRESHOLD_FOR_REVERT) {
        ss.advance();
    }
    else {
        ss.revert();
    }
}
function escape_keydown_listener(lock, root) {
    let node = root;
    return (evt) => {
        if (!lock.locked()) {
            if (evt.key !== "b") {
                return;
            }
            lock.lock();
            if (node instanceof Function) {
                node();
                lock.unlock();
                node = root;
            }
            return;
        }
        switch (evt.key) {
            case "b":
                lock.unlock();
                node = root;
                return;
            case "PageUp":
            case "ArrowUp":
            case "ArrowLeft":
            case "Home":
                node = node[0];
                break;
            case "PageDown":
            case "ArrowDown":
            case "ArrowRight":
            case "End":
                node = node[1];
                break;
            default:
                return;
        }
        if (node instanceof Function) {
            node();
            lock.unlock();
            node = root;
        }
    };
}
export function focus_lock(lock, element) {
    element.addEventListener("focusin", () => { lock.lock(); });
    element.addEventListener("focusout", () => { lock.unlock(); });
}
