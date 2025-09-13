import jfx from "../jfx-components.ts"
import { element } from "../jsxmm/jsxmm.ts"
import { Slide } from "../sspm/slide.ts"
import { new_code_block_fetch, new_slide_window, WindowData } from "./common.ts"

const WINDOW_DATA: WindowData = {
    title: "Seminário de Engenharia de Software I",
    options: {
        home: "Início",
        // solid: "SOLID",
        strategy: "Strategy",
        deadly_diamond: "Diamante da Morte",
        refused_bequest: "Herança Negada",
        interface_extraction: "Extração de Interface",
        references: "Referências",
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
    const option = "strategy"

    const slide_window = (
        new_slide_window(WINDOW_DATA, option,
            jfx.new_panel(
                element("h1", {}, "Strategy"),
                jfx.new_field([
                    "Definir uma família de algoritmos, encapsular cada uma, e fazê-los intercambiáveis.",
                    "Strategy permite que o algoritmo varie de forma independente do cliente que o usa.",
                ].join(" ")),
                element("span", {}, "~ Gang of Four"),
            )
        )
    )

    slide_window.element().classList.add("foreword")
    return slide_window
}

function new_strategy_slide_2(): Slide {
    const option = "strategy"

    const slide_window = (
        new_slide_window(WINDOW_DATA, option,
            jfx.new_panel(
                jfx.new_field([
                    "Definir uma família de algoritmos, encapsular cada uma, e fazê-los intercambiáveis.",
                    "Strategy permite que o algoritmo varie de forma independente do cliente que o usa.",
                ].join(" ")),
                element("span", {}, "~ Gang of Four"),
            )
        )
    )

    return slide_window
}

async function new_interface_extraction_fs_slide(): Promise<Slide> {
    const option = "interface_extraction"

    const slide_window = (
        new_slide_window(WINDOW_DATA, option,
            jfx.new_field(
                await new_code_block_fetch(`./assets/code/iface-extract/fs.h`, "c")
            )
        )
    )

    slide_window.element().classList.add(`${option}-slide`)
    return slide_window
}

function new_references_slide(): Slide {
    const option = "references"

    const slide_window = (
        new_slide_window(WINDOW_DATA, option,
            jfx.new_panel(
                // new_reference("Casey Muratori", ""),
                // new_reference("Gang Of Four", "./assets/design-patterns.png"),
                // new_reference("Elixir Bootin", ""),
            )
        )
    )

    slide_window.element().classList.add(`${option}-slide`)
    return slide_window
}

export default async function (): Promise<Slide[]> {
    return [
        new_home_slide(),
        // new_solid_slide(),
        new_strategy_slide_1(),
        // new_strategy_slide_2(),
        await new_interface_extraction_fs_slide(),
        new_references_slide(),
        new Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")),
    ]
}