import { jfx } from "../jfx-components.ts"
import { element } from "../jsxmm/jsxmm.ts"
import sspm from "../sspm/slide.ts"
import { new_slide_window, WindowData } from "./common.ts"

const WINDOW_DATA: WindowData = {
    title: "Seminário de Engenharia de Software I",
    options: {
        home: { name: "Início", submenus: [] },
        solid: { name: "SOLID", submenus: [] },
        strategy: { name: "Strategy", submenus: ["Definição"] },
        deadly_diamond: { name: "Diamante da Morte", submenus: [] },
        refused_bequest: { name: "Herança Negada", submenus: [] },
        interface_extraction: { name: "Extração de Interface", submenus: [] },
    }
}

function new_home_slide(): sspm.Slide {
    const option = "home"

    const names = [
        "Alan Lima", "Breno Augusto", "Juan Pablo",
        "Luan Filipe", "Mateus Oliveira", "Vitor Mozer"
    ]

    const slide_window = new_slide_window(WINDOW_DATA, option,
        jfx.new_panel(
            element("h1", {}, "Seminário de Engenharia de Software I"),
            element("h2", {},
                jfx.new_button("Strategy"),
                jfx.new_button("Diamante da Morte"),
                jfx.new_button("Herança Negada"),
                jfx.new_button("Extração de Interface"),
            ),
            element("span", {},
                jfx.new_field(
                    `${names.slice(0, -1).reduce((acc, v) => `${acc}, ${v}`)} e ${names[names.length - 1]}`
                ),
                element("div", {}, "Profª Kattiana Constantino"),
            )
        )
    )

    slide_window.element().classList.add(`${option}-slide`)
    return slide_window
}

function new_solid_slide(): sspm.Slide {
    const option = "solid"

    const SOLID = [
        ["S", "Princípio da Resposabilidade Única"],
        ["O", "Princípio do Aberto/Fechado"],
        ["L", "Princípio da Substituição de Liskov"],
        ["I", "Princípio da Segregação de Interface"],
        ["D", "Princípio da Inversão de Dependência"],
    ]

    const principles = SOLID.map(([letter, statement]) => {
        return (
            element("div", { className: "solid-principle" },
                element("div", { className: "solid-letter" }, letter),
                (() => {
                    const field = jfx.new_field(statement)
                    field.classList.add("solid-statement")
                    return field
                })()
            )
        )
    })

    const principles_panel = jfx.new_panel(...principles)
    principles_panel.classList.add("solid-principles")

    const slide_window = new_slide_window(WINDOW_DATA, option, principles_panel)

    slide_window.element().classList.add("slide", `${option}-slide`)
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

function new_strategy_slide(): sspm.Slide {
    const option = "strategy"

    const slide_window = (
        new_slide_window(WINDOW_DATA, option,
            jfx.new_panel("Strategy")
        )
    )

    slide_window.element().classList.add(`${option}-slide`)
    return slide_window
}

export default async function (): Promise<sspm.Slide[]> {
    return [
        new_home_slide(),
        new_solid_slide(),
        new_strategy_slide(),
        new sspm.Slide(element("div", { className: "slide" }, jfx.new_code_block(
            await fetch("./assets/code/main.go").then(res => res.text()),
            "go"
        ))),
        new sspm.Slide(element("div", { className: "slide" }, jfx.new_code_block(
            await fetch("./assets/code/Main.java").then(res => res.text()),
            "java"
        ))),
        new sspm.Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")),
    ]
}