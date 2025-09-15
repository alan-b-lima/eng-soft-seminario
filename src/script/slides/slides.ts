import jfx from "../jfx-components.ts"
import { element } from "../jsxmm/jsxmm.ts"
import { Slide } from "../sspm/slide.ts"
import { new_bullet_list, new_code_block_fetch, new_slide_window, new_two_columns, WindowData } from "./common.ts"
import extract_interface from "./extract_interface.ts"

const WINDOW_DATA: WindowData = {
	title: "Seminário de Engenharia de Software I",
	options: {
		"home": "Início",
		// solid: "SOLID",
		"strategy": "Strategy",
		"deadly-diamond": "Diamante da Morte",
		"refused-bequest": "Herança Negada",
		"extract-interface": "Extração de Interface",
		"references": "Referências",
	}
}

function new_home_slide(): Slide {
	const names = [
		"Alan Lima", "Breno Augusto", "Juan Pablo",
		"Luan Filipe", "Mateus Oliveira", "Vitor Mozer"
	]

	const slide_window = new_slide_window(WINDOW_DATA, "home",
		jfx.new_panel(
			element("h1", {}, "Seminário de Engenharia de Software I"),
			element("h2", {},
				jfx.new_button("Strategy"),
				jfx.new_button("Diamante da Morte"),
				jfx.new_button("Herança Negada"),
				jfx.new_button("Extração de Interface"),
			),
			element("span", {},
				jfx.new_field(`${names.slice(0, -1).reduce((acc, v) => `${acc}, ${v}`)} e ${names[names.length - 1]}`),
				element("div", {}, "Profª Kattiana Constantino"),
			)
		)
	)

	return slide_window
}

function new_solid_slide(): Slide {
	const SOLID = [
		["S", "Princípio da Resposabilidade Única"],
		["O", "Princípio do Aberto/Fechado"],
		["L", "Princípio da Substituição de Liskov"],
		["I", "Princípio da Segregação de Interface"],
		["D", "Princípio da Inversão de Dependência"],
	]

	const principles = SOLID.map(([letter, statement]) => {
		const field = jfx.new_field(statement)
		field.classList.add("solid-statement")

		return (
			element("div", { className: "solid-principle" },
				element("div", { className: "solid-letter" }, letter),
				field
			)
		)
	})

	const principles_panel = jfx.new_panel(...principles)
	principles_panel.classList.add("solid-principles")

	const slide_window = new_slide_window(WINDOW_DATA, "solid", principles_panel)

	slide_window.animation(animation_solid.bind(null, principles))
	return slide_window
}

function* animation_solid(principles: HTMLElement[]) {
	principles.forEach(principle => principle.classList.remove("highlight"))
	yield

	for (let i = 0; i < principles.length; i++) {
		principles[i].classList.add("highlight")
		yield

		principles[i].classList.remove("highlight")
	}
}

function new_strategy_slide_1(): Slide {
	const slide_window = new_slide_window(WINDOW_DATA, "strategy",
		element("main", { className: "titled" },
			element("h1", {}, "Strategy"),
			jfx.new_panel(
				jfx.new_field([
					"Define uma família de algoritmos, encapsula cada um, e os faz intercambiáveis.",
					"Strategy permite que o algoritmo varie de forma independente do cliente que o usa.",
				].join(" ")),
				element("span", {}, "~ Gang of Four"),
			),
		)
	)

	slide_window.element().classList.add("foreword")
	return slide_window
}

function new_strategy_slide_2(): Slide {
	const image_cell = jfx.new_field(element("img", {
		alt: "Strategy Class Diagram",
		src: "./assets/images/diagram.jpg",
	}))
	image_cell.classList.add("image-cell")

	const slide_window = new_slide_window(WINDOW_DATA, "strategy",
		element("main", { className: "titled" },
			element("h1", {}, "Strategy"),
			jfx.new_panel(
				new_bullet_list("One Item"),
				image_cell
			)
		)
	)

	slide_window.element().classList.add("diagram")
	return slide_window
}

async function new_strategy_slide_3(): Promise<Slide> {
	const slide_window = (
		new_slide_window(WINDOW_DATA, "strategy",
			element("main", { className: "titled" },
				element("h1", {}, "Strategy"),
				await new_code_block_fetch("./assets/code/strategy/strategy.go", "go"),
			)
		)
	)

	slide_window.element().classList.add("code")
	return slide_window
}

function new_references_slide(): Slide {
	const option = "references"

	const slide_window = (
		new_slide_window(WINDOW_DATA, option,
			jfx.new_panel(
				new_reference({
					author: "Casey Muratori",
					work: "The Big OOPs: Anatomy of a Thirty-five-year Mistake",
					publisher: "Better Software Conference",
					source: "",
					info: "2025",
					image: "./assets/images/the-big-oops.png",
					horizontal: 3,
					vertical: 2,
				}),

				new_reference({
					author: "Robert Martin",
					work: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
					publisher: "Prentice Hall",
					source: "https://agorism.dev/book/software-architecture/(Robert C. Martin Series) Robert C. Martin - Clean Architecture_ A Craftsman%E2%80%99s Guide to Software Structure and Design-Prentice Hall (2017).pdf",
					info: "2017",
					image: "./assets/images/clean-arch.jpg",
					horizontal: 2,
					vertical: 2,
				}),

				new_reference({
					author: "Refactoring Guru",
					work: "Strategy",
					publisher: "Refactoring Guru",
					source: "https://refactoring.guru/design-patterns/strategy",
					info: "2025",
					image: "./assets/images/refactoring-guru.png",
					horizontal: 2,
				}),

				new_reference({
					author: "Vittorio Romeo",
					work: "Analysis of entity encoding techniques, design and implementation of a multithreaded compile-time Entity-Component-System C++14 library",
					publisher: "Università degli Studi di Messina",
					source: "http://dx.doi.org/10.13140/RG.2.1.1307.4165",
					info: "2016",
					vertical: 3,
				}),

				new_reference({
					author: "Erich Gamma; Richard Helm; Ralph Johnson; John Vilssides",
					work: "Design Patterns: Elements of Reusable Object-Oriented Software",
					publisher: "Addison-Wesley",
					source: "https://www.javier8a.com/itc/bd1/articulo.pdf",
					info: "1994",
					image: "./assets/images/design-patterns.png",
					horizontal: 2,
					vertical: 3,
				}),

				new_reference({
					author: "Elixir Bootlin",
					work: "Elixar Cross Reference v6.16.7",
					publisher: "Elixir Bootlin",
					source: "https://elixir.bootlin.com/linux/v6.16.7/source/include/linux/fs.h#L2151",
					info: "2025",
					image: "./assets/images/bootlin.png",
					horizontal: 2,
					vertical: 2,
				}),
			)
		)
	)

	slide_window.element().classList.add(`${option}-slide`)
	return slide_window
}

type Reference = {
	author: string
	work: string
	publisher: string
	source: string
	info: string
	image?: string
	vertical?: number
	horizontal?: number
}

function new_reference(reference: Reference) {
	const card = jfx.new_button(
		element("div", {},
			`${reference.author}. ${reference.work}. `,
			element("strong", {}, reference.publisher), `. `,
			element("a", {
				href: reference.source,
				target: "_blank",
				rel: "noopener noreferrer"
			}, "<disponível aqui>"),
			`. ${reference.info}.`
		),
	)

	if (reference.image !== undefined) {
		card.append(element("img", {
			loading: "lazy",
			alt: reference.work,
			src: reference.image
		}))
	}

	card.classList.add("reference")

	if (reference.vertical !== undefined) {
		card.style.gridRow = `span ${reference.vertical}`
	}

	if (reference.horizontal !== undefined) {
		card.style.gridColumn = `span ${reference.horizontal}`
	}

	return card
}

export default async function (): Promise<Slide[]> {
	return [
		new_home_slide(),
		// new_solid_slide(),
		new_strategy_slide_1(),
		new_strategy_slide_2(),
		await new_strategy_slide_3(),
		...await extract_interface(WINDOW_DATA),
		new_references_slide(),
		new Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")),
	]
}