export type Page = {
	location: string
	root: HTMLElement
}

export class Coordinator {
	#pages: { [K in string]: Page }
	// #current: string

	static #DOM_PARSER = new DOMParser()

	constructor() {
		this.#pages = {}
		// this.#current = ""
	}

	pages(): { [K in string]: Page } {
		return this.#pages
	}

	// current(): string {
	// 	return this.#current
	// }

	add(name: string, location: string): void {
		this.#pages[name] = {
			location: location,
			root: undefined as any as HTMLElement
		}
	}

	async to(page_name: string) {
		// const old_page = this.#pages[this.#current]
		const page = this.#pages[page_name]

		if (page.root === undefined) {
			const response = await fetch(page.location)
			if (!response.ok) {
				return
			}
			
			const content = await response.text()

			const document = Coordinator.#DOM_PARSER.parseFromString(content, "text/html")
			page.root = document.documentElement
		}

		// if (old_page?.root !== undefined) {
		// 	old_page.root.replaceWith(document.documentElement)
		// }

		history.pushState(null, "", page.location)
		document.documentElement.replaceWith(page.root)
	}
}