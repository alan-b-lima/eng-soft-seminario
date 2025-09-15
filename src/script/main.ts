import jfx from "./jfx-components.ts"
import { element } from "./jsxmm/jsxmm.ts"
import { format_duration, Ticker } from "./modern.ts"
import slides from "./slides/slides.ts"
import { ChoiceTree, focus_lock, setup_event_listenters } from "./sspm/listeners.ts"
import { SlideShow } from "./sspm/slide.ts"

async function main() {
	const ROOT = document.body

	const page_number_str = localStorage.getItem("current-page")
	let start_at = 0

	if (page_number_str !== null) {
		const page_number = +page_number_str
		if (!Number.isNaN(page_number)) {
			start_at = page_number
		}
	}

	const ss = new SlideShow({ start_at }, ...(await slides()))
	ROOT.append(...ss.slides().map(s => s.element()))

	const listeners = setup_event_listenters(ss, new_choice_tree(ss))
	listeners.attach(new Callback(() => {
		localStorage.setItem("current-page", `${ss.current()}`)
	}))

	ROOT.querySelectorAll("a").forEach(anchor => {
		focus_lock(listeners, anchor)
	})
}

class Callback implements Observer {
	#callback: () => void

	constructor(callback: () => void) {
		this.#callback = callback
	}

	update() {
		this.#callback()
	}
}

function new_choice_tree(ss: SlideShow): ChoiceTree {
	const time = {
		start: performance.now()
	}

	const page_number_element = jfx.new_field()
	const elapsed_time_element = jfx.new_field()

	const dialog_box = element("dialog", { className: "dialog-box" },
		jfx.new_window("Informação", false,
			element("form", { method: "dialog" },
				element("div", {}, `Slide `, page_number_element, ` de ${ss.length()}`),
				element("div", {}, `Tempo decorrido: `, elapsed_time_element),
			)
		)
	)

	dialog_box.addEventListener("close", evt => { ticker.stop() })
	document.documentElement.append(dialog_box)

	const ticker = new Ticker()

	return [
		function () {
			time.start = performance.now()
		},

		function () {
			if (dialog_box.open) {
				dialog_box.close()
				return
			}

			ticker.start(() => {
				const elapsed_time = performance.now() - time.start

				page_number_element.textContent = `${ss.current() + 1}`
				elapsed_time_element.textContent = format_duration(elapsed_time)
			}, 100)

			dialog_box.showModal()
		}
	]
}

window.addEventListener("DOMContentLoaded", main)