import slide from "./slide.js";
import { ListenerLock, Locker } from "./lock.js";

export function setup_event_listenters(ss: slide.SlideShow, tree?: ChoiceTree): Locker {
	const keydownLock = new ListenerLock(navigation_keydown_listener.bind(null, ss))
	const clickLock = new ListenerLock(navigation_click_listener.bind(null, ss))

	const lock = {
		lock: () => { keydownLock.lock(); clickLock.lock() },
		unlock: () => { keydownLock.unlock(); clickLock.unlock() },
		locked: () => { return clickLock.locked() || keydownLock.locked() },
	}

	window.addEventListener("keydown", keydownLock.listener())
	window.addEventListener("click", clickLock.listener())

	if (tree !== undefined) {
		window.addEventListener("keydown", escape_keydown_listener(lock, tree))
	}

	return lock
}

function navigation_keydown_listener(ss: slide.SlideShow, evt: KeyboardEvent): void {
	switch (evt.key) {
	case "PageUp":
	case "ArrowUp":
	case "ArrowLeft":
		ss.revert()
		break

	case "PageDown":
	case "ArrowDown":
	case "ArrowRight":
		ss.advance()
		break

	case "Home":
		ss.goto(0)
		break

	case "End":
		ss.goto(ss.length() - 1)
		break

	default:
		return
	}

	evt.preventDefault()
}

function navigation_click_listener(ss: slide.SlideShow, evt: MouseEvent): void {
	const THRESHOLD_FOR_REVERT = 0.10
	if (evt.screenX / window.innerWidth >= THRESHOLD_FOR_REVERT) {
		ss.advance()
	} else {
		ss.revert()
	}
}

function escape_keydown_listener(lock: Locker, root: ChoiceTree): (evt: KeyboardEvent) => void {
	let node: ChoiceTree = root

	return (evt: KeyboardEvent) => {
		if (!lock.locked()) {
			if (evt.key !== "b") {
				return
			}

			if (node instanceof Function) {
				node()
				lock.unlock()
				node = root
			}
		}

		switch (evt.key) {
		case "b":
			lock.unlock()
			node = root
			return

		case "PageUp":
		case "ArrowUp":
		case "ArrowLeft":
		case "Home":
			node = (node as [ChoiceTree, ChoiceTree])[0]
			break

		case "PageDown":
		case "ArrowDown":
		case "ArrowRight":
		case "End":
			node = (node as [ChoiceTree, ChoiceTree])[1]
			break

		default:
			return
		}

		if (node instanceof Function) {
			node()
			lock.unlock()
			node = root
		}
	}
}

export type ChoiceTree = [ChoiceTree, ChoiceTree] | (() => void)
