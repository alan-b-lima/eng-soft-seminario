import { ListenerLock } from "./lock.js";
export function setupEventListenters(ss, tree) {
    const keydownLock = new ListenerLock(navigationKeydownListener.bind(null, ss));
    const clickLock = new ListenerLock(navigationClickListener.bind(null, ss));
    const lock = {
        lock: () => { keydownLock.lock(); clickLock.lock(); },
        unlock: () => { keydownLock.unlock(); clickLock.unlock(); },
        locked: () => { return clickLock.locked() || keydownLock.locked(); },
    };
    window.addEventListener("keydown", keydownLock.listener());
    window.addEventListener("click", clickLock.listener());
    if (tree !== undefined) {
        window.addEventListener("keydown", escapeKeydownListener(lock, tree));
    }
    return lock;
}
function navigationKeydownListener(ss, evt) {
    switch (evt.key) {
        case "PageUp":
        case "ArrowUp":
        case "ArrowLeft":
            {
                ss.revert();
            }
            break;
        case "PageDown":
        case "ArrowDown":
        case "ArrowRight":
            {
                ss.advance();
            }
            break;
        case "Home":
            {
                ss.goto(0);
            }
            break;
        case "End":
            {
                ss.goto(ss.length() - 1);
            }
            break;
        default: return;
    }
    evt.preventDefault();
}
function navigationClickListener(ss, evt) {
    const THRESHOLD_FOR_REVERT = 0.10;
    if (evt.screenX / window.innerWidth >= THRESHOLD_FOR_REVERT) {
        ss.advance();
    }
    else {
        ss.revert();
    }
}
function escapeKeydownListener(lock, tree) {
    let node;
    return (evt) => {
        if (!lock.locked()) {
            if (evt.key === "b") {
                node = tree;
                lock.lock();
            }
            return;
        }
        switch (evt.key) {
            case "b":
                {
                    lock.unlock();
                }
                return;
            case "PageUp":
            case "ArrowUp":
            case "ArrowLeft":
                {
                    evt.preventDefault();
                    node = node[0];
                }
                break;
            case "PageDown":
            case "ArrowDown":
            case "ArrowRight":
                {
                    evt.preventDefault();
                    node = node[1];
                }
                break;
        }
        if (node instanceof Function) {
            node();
            lock.unlock();
        }
    };
}
