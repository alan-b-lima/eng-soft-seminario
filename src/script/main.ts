import { element } from "./jsxmm/jsxmm.js"
import slide from "./slide/slide.js"
import { new_jfx_button, newJFXField, new_jfx_menu, new_jfx_panel, new_jfx_window } from "./jfx-components.js"
import { setupEventListenters } from "./slide/listeners.js"


function main() {
	const root = document.body

	const panels: Record<string, [HTMLElement, slide.Animation[]]> = {
		home: newHomeSlide(),
		solid: newSOLIDSlide(),
	}

	const windowTitle = "Seminário de Engenharia de Software I"
	const menuOptionMap: Record<string, string> = {
		home: "Início",
		solid: "SOLID",
	}
	const menuOptions = Object.values(menuOptionMap)

	const startAt = function () {
		const page = localStorage.getItem("current-page")
		if (page === null) {
			return 0
		}

		const index = +page
		if (Number.isNaN(index)) {
			return 0
		}

		return index
	}()

	const slides = Object.keys(panels).map(option => {
		const [panel, animations] = panels[option]
		const menuOption = menuOptionMap[option] ?? "--"

		const page = newPage(windowTitle, menuOptions, menuOption, panel)
		page.classList.add(`${option}-slide`)

		return new slide.Slide(page, ...animations)
	})

	const ss = new slide.SlideShow({ startAt },
		...slides,
		new slide.Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação"))
	)

	root.append(...ss.slides().map(s => s.element()))
	setupEventListenters(ss)

	const mo = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver): void => {
		localStorage.setItem("current-page", `${ss.current()}`)
	})
	mo.observe(root, { attributeFilter: ["class"], childList: true, subtree: true })
}

function newPage(windowTitle: string, menuOptions: string[], option: string | number, ...children: (Node | string)[]) {
	const page = (
		new_jfx_window(windowTitle,
			new_jfx_menu(menuOptions, option),
			...children
		)
	)

	page.classList.add("slide")
	return page
}

function newHomeSlide(): [HTMLElement, slide.Animation[]] {
	const names = [
		"Alan Lima", "Breno Augusto", "Juan Pablo",
		"Luan Filipe", "Mateus Oliveira", "Vitor Moises"
	]

	const computedNameString = names.reduce((acc, v, i) => {
		if (i < names.length - 1) {
			return `${acc}, ${v}`
		}

		return `${acc} e ${v}`
	})

	const panel = (
		new_jfx_panel(
			element("h1", {}, "Seminário de Engenharia de Software I"),
			element("h2", {},
				new_jfx_button("Strategy"),
				new_jfx_button("Diamante da Morte"),
				new_jfx_button("Herança Negada"),
				new_jfx_button("Extração de Interface"),
			),
			element("span", {},
				newJFXField(computedNameString),
				element("div", {}, "Profª Kattiana Constantino"),
			)
		)
	)

	return [panel, []]
}

function newSOLIDSlide(): [HTMLElement, slide.Animation[]] {
	const panel = (
		new_jfx_panel(
			element("h1", {}, "SOLID"),
			newJFXField(
				element("div", {}, "S"), element("div", {}, "Princípio da Resposabilidade Única"),
				element("div", {}, "O"), element("div", {}, "Princípio do Aberto/Fechado"),
				element("div", {}, "L"), element("div", {}, "Princípio da Substituição de Liskov"),
				element("div", {}, "I"), element("div", {}, "Princípio da Segregação de Interface"),
				element("div", {}, "D"), element("div", {}, "Princípio da Inversão de Dependência"),
			)
		)
	)

	return [panel, [
		ss => {

		},
		ss => {

		},
	]]
}

window.addEventListener("DOMContentLoaded", main)