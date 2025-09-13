import { SlideShow } from "./slide.ts";
import { Listener, Locker } from "./lock.ts";

export function setup_event_listenters(ss: SlideShow, tree?: ChoiceTree): Notifier & Locker {
	const keydown_lock = new Listener(navigation_keydown_listener.bind(null, ss))
	const click_lock = new Listener(navigation_click_listener.bind(null, ss))

	window.addEventListener("keydown", keydown_lock.listener())
	window.addEventListener("click", click_lock.listener())

	const bundle = new ListenerBundle<Event>(
		keydown_lock as Listener<Event>,
		click_lock as Listener<Event>
	)

	if (tree !== undefined) {
		window.addEventListener("keydown", escape_keydown_listener(bundle, tree))
	}

	return bundle
}

class ListenerBundle<E extends Event> {
	#listeners: Listener<E>[]

	constructor(...listeners: Listener<E>[]) {
		this.#listeners = listeners
	}

	attach(ob: Observer): void {
		for (let i = 0; i < this.#listeners.length; i++) {
			this.#listeners[i].attach(ob)
		}
	}

	detach(ob: Observer): void {
		for (let i = 0; i < this.#listeners.length; i++) {
			this.#listeners[i].detach(ob)
		}
	}

	notify(): void {
		for (let i = 0; i < this.#listeners.length; i++) {
			this.#listeners[i].notify()
		}
	}

	lock(): void {
		for (let i = 0; i < this.#listeners.length; i++) {
			this.#listeners[i].lock()
		}
	}

	unlock(): void {
		for (let i = 0; i < this.#listeners.length; i++) {
			this.#listeners[i].unlock()
		}
	}

	locked(): boolean {
		return this.#listeners.length > 0 && this.#listeners[0].locked()
	}
}

function navigation_keydown_listener(ss: SlideShow, evt: KeyboardEvent): void {
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

function navigation_click_listener(ss: SlideShow, evt: MouseEvent): void {
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

			lock.lock()
			if (node instanceof Function) {
				node()
				lock.unlock()
				node = root
			}

			return
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