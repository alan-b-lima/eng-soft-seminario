export class Coordinator {
    #pages;
    static #DOM_PARSER = new DOMParser();
    constructor() {
        this.#pages = {};
    }
    pages() {
        return this.#pages;
    }
    add(name, location) {
        this.#pages[name] = {
            location: location,
            root: undefined
        };
    }
    async to(page_name) {
        const page = this.#pages[page_name];
        if (page.root === undefined) {
            const response = await fetch(page.location);
            if (!response.ok) {
                return;
            }
            const content = await response.text();
            const document = Coordinator.#DOM_PARSER.parseFromString(content, "text/html");
            page.root = document.documentElement;
        }
        history.pushState(null, "", page.location);
        document.documentElement.replaceWith(page.root);
    }
}
