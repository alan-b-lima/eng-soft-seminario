import { jfx } from "./jfx-components.ts"
import { element, style } from "./jsxmm/jsxmm.ts"
import { format_duration, Ticker } from "./modern.ts"
import { ChoiceTree, setup_event_listenters } from "./sspm/listeners.ts"
import sspm from "./sspm/slide.ts"
import slides from "./slides/slides.ts"

function main() {
	const ROOT = document.body

	const page_number_str = localStorage.getItem("current-page")
	let start_at = 0

	if (page_number_str !== null) {
		const page_number = +page_number_str
		if (!Number.isNaN(page_number)) {
			start_at = page_number
		}
	}

	const ss = new sspm.SlideShow({ start_at }, ...slides)
	ROOT.append(...ss.slides().map(s => s.element()))

	const listeners = setup_event_listenters(ss, new_choice_tree(ss))
	listeners.attach(new Callback(() => {
		localStorage.setItem("current-page", `${ss.current()}`)
		console.log(ss.current())
	}))
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

function new_choice_tree(ss: sspm.SlideShow): ChoiceTree {
	const time = {
		start: performance.now()
	}

	const page_number_element = jfx.new_field()
	const elapsed_time_element = jfx.new_field()

	page_number_element.style.display = "inline"
	elapsed_time_element.style.display = "inline"

	const panel = jfx.new_panel(
		element("div", {}, `Slide `, page_number_element, ` de ${ss.length()}`),
		element("div", {}, `Tempo decorrido: `, elapsed_time_element),
	)
	style(panel, {
		display: "grid",
		padding: "2rem",
		fontSize: "1.25rem",
		gap: "1rem",
	})

	const dialog_box = element("dialog", {},
		jfx.new_window("Informação", false, panel)
	)
	style(dialog_box, { padding: "0" })

	document.documentElement.append(dialog_box)

	const ticker = new Ticker()

	return [
		() => { time.start = performance.now() },
		() => {
			if (!dialog_box.open) {
				ticker.start(() => {
					const elapsed_time = performance.now() - time.start
					
					page_number_element.textContent = `${ss.current() + 1}`
					elapsed_time_element.textContent = format_duration(elapsed_time)
				}, 100)
				dialog_box.showModal()
			} else {
				dialog_box.close()
				ticker.stop()
			}
		}
	]
}

window.addEventListener("DOMContentLoaded", main)