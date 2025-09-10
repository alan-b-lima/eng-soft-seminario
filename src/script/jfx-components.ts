import { element } from "./jsxmm/jsxmm.ts"
import hljs from "./lib/highlight.min.js"

export namespace jfx {
    export function new_title_bar(title: string, maximized: boolean = true) {
        return (
            element("div", { className: "jfx-title" },
                element("div", { className: "jfx-java-logo" }),
                element("div", { className: "jfx-window-name" }, title),
                element("div", { className: "jfx-windows-options" },
                    element("div", { className: "jfx-minimize" }),
                    element("div", { className: maximized ? "jfx-restore" : "jfx-maximize" }),
                    element("div", { className: "jfx-close" }),
                )
            )
        )
    }

    export function new_window(title: string, maximized: boolean = true, ...children: (Node | string)[]) {
        return element("div", { className: "jfx-window" },
            new_title_bar(title, maximized),
            ...children
        )
    }

    export function new_menu(options: string[], index: number | string) {
        const comp = element("div", { className: "jfx-menu" },
            ...options.map(option => element("div", { className: "jfx-menu-option" }, option))
        )

        if (typeof index === "string") {
            index = options.findIndex(v => v === index)
        }

        const option = comp.children[index]
        if (option !== undefined) {
            option.classList.add("selected")
        }

        return comp
    }

    export function new_panel(...children: (Node | string)[]) {
        return element("div", { className: "jfx-panel" }, ...children)
    }

    export function new_button(text: string) {
        return element("div", { className: "jfx-button" }, text)
    }

    export function new_field(...children: (Node | string)[]) {
        return element("div", { className: "jfx-field" }, ...children)
    }

    export function new_code_block(source: string, language: string) {
        return element("pre", { className: "jfx-code-block" },
            element("code", {
                innerHTML: hljs.highlight(source, { language }).value
            })
        )
    }
}
