import { element } from "../jsxmm/jsxmm.ts"
import { Slide } from "../sspm/slide.ts"
import jfx  from "../jfx-components.ts"

export type WindowData = {
    title: string
    options: Record<string, string>
}

export function new_slide_window(window: WindowData, option: string, ...children: (Node | string)[]): Slide {
    const slide_window = (
        jfx.new_window(
            window.title, true,
            jfx.new_menu(Object.values(window.options), window.options[option]),
            ...children
        )
    )

    slide_window.classList.add("slide")
    return new Slide(slide_window)
}

export function new_column_window(window: WindowData, option: string, ...columns: (Node | string)[][]): Slide {
    const slide_window = (
        jfx.new_window(
            window.title, true,
            jfx.new_menu(Object.values(window.options), window.options[option]),
            jfx.new_panel(...columns.map(c => jfx.new_panel(...c)))
        )
    )

    slide_window.classList.add("slide")
    return new Slide(slide_window)
}

// type Language = "go" | "java" | "c" | (string & {})

// export function new_code_block_fetch(source: string, language: Language) {
//     const code = element("code")
//     const block = element("pre", { className: "code-block" }, code)

//     fetch(source)
//         .then(res => res.text())
//         .then(source => {
//             const hl_source = hljs.highlight(source, { language })
//             code.innerHTML = hl_source.value
//         })
//         .catch(err => code.textContent = err)

//     return block
// }

// export function new_code_block(source: string, language: Language) {
//     return (
//         element("pre", { className: "code-block" },
//             element("code", {
//                 innerHTML: hljs.highlight(source, { language }).value
//             })
//         )
//     )
// }

export function new_two_columns(children0: string | Node, children1: string | Node) {
    return element("div", { className: "two-columns" }, children0, children1)
}

export function new_bullet_list(...points: (string | Node)[]) {
    return element("ul", {},
        ...points.map(point => element("li", {}, point))
    )
}