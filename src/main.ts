import component from "./lib/component.js"
import slide from "./lib/slide.js"
import { newFinalSlide, newHomePage } from "./components.js"
import { setupEventListenters } from "./listeners.js"

function main() {
	const root = document.body

	const slides: slide.Slide[] = [
		new slide.Slide(newHomePage()),
		new slide.Slide(newFinalSlide()),
	]

	const ss = new slide.SlideShow({ startAt: currentPage() }, ...slides)
	root.append(...ss.slides().map(s => s.root()))

	setCurrentPage(ss.current())
	setupEventListenters(ss)

	const mo = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver): void => {
		setCurrentPage(ss.current())
	})

	mo.observe(root, { attributeFilter: ["class"], childList: true, subtree: true })
}

export function currentPage(): number {
	const page = localStorage.getItem("current-page")
	if (page === null) {
		return 0
	}

	const index = +page
	if (Number.isNaN(index)) {
		return 0
	}

	return index
}

export function setCurrentPage(index: number): void {
	localStorage.setItem("current-page", `${index}`)
}

window.addEventListener("DOMContentLoaded", main)