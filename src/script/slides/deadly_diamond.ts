import jfx from "../jfx-components.ts"
import { element } from "../jsxmm/jsxmm.ts"
import { Slide } from "../sspm/slide.ts"
import { new_bullet_list, new_code_block_fetch, new_slide_window, new_two_columns, new_two_rows, WindowData } from "./common.ts"

function new_deadly_diamond_slide_1(window_data: WindowData) {
    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", { style: { fontStyle: "italic" } }, "Deadly Diamond of Death"),
                new_two_columns(
                    element("article", {},
                        element("p", {},
                            "O \"diamante da morte\" (também conhecido como \"diamante mortal\" ou problema do \"ancestral comum\") é um problema que pode aparecer em hierarquias orientadas a objetos, isto é, linguagens que suportam herança múltipla."
                        ),
                    ),
                    jfx.new_field(element("img", { alt: "Diamante da Morte", src: "./assets/images/deadly-diamond.jpg" })),
                )
            )
        )
    )

    return slide_window
}

async function new_deadly_diamond_slide_python(window_data: WindowData) {
    const output = await new_code_block_fetch("./assets/code/deadly-diamond/main.py.txt", "plaintext")
    output.classList.add("terminal")

    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", {}, "Abordagem do Python"),
                new_two_columns(
                    new_two_rows(
                        new_bullet_list(
                            "Algoritmo C3 de Linearização MRO;",
                            "Busca dos métodos iniciando pela base;",
                            "Implementação própria é indiferente;",
                            "Propociona previsibilidade.",
                        ),
                        output
                    ),
                    await new_code_block_fetch("./assets/code/deadly-diamond/main.py", "python")
                )
            )
        )
    )

    return slide_window
}

async function new_deadly_diamond_slide_cpp(window_data: WindowData) {
    const output = await new_code_block_fetch("./assets/code/deadly-diamond/main.cpp.txt", "plaintext")
    output.classList.add("terminal")

    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", {}, "Abordagem do C++"),
                new_two_columns(
                    new_two_rows(
                        new_bullet_list(
                            "Herança virtual;",
                            "Duplicação de dados do ancestral comum;",
                            "Erro de compilação;",
                            "Resolução explícita;",
                            "Fornecer implementação própria;",
                            "Chamar uma versão ou combina-las.",
                        ),
                        output
                    ),
                    await new_code_block_fetch("./assets/code/deadly-diamond/main.cpp", "cpp")
                )
            )
        )
    )

    return slide_window
}

async function new_deadly_diamond_slide_java(window_data: WindowData) {
    const output = await new_code_block_fetch("./assets/code/deadly-diamond/main.java.txt", "plaintext")
    output.classList.add("terminal")

    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", {}, "Abordagem do Java"),
                new_two_columns(
                    new_two_rows(
                        new_bullet_list(
                            "Erro de sintaxe em tempo de compilação;",
                            "Gramática do Java não permite que o extends tenha mais de um argumento;",
                            "Isso vem do fato do Java não permitir herança múltipla;",
                            "Tentativa de resolução com interfaces(Também sujeitas ao Diamante da Morte).",
                        ),
                        output
                    ),
                    await new_code_block_fetch("./assets/code/deadly-diamond/main.java", "cpp")
                )
            )
        )
    )

    return slide_window
}

function new_deadly_diamond_slide_5(window_data: WindowData) {
    const diagrams = [
        jfx.new_field(element("img", { alt: "Diagrama de Classe", src: "./assets/images/widget-1.jpg" })),
        jfx.new_field(element("img", { alt: "Diagrama de Classe", src: "./assets/images/widget-2.jpg" })),
        jfx.new_field(element("img", { alt: "Diagrama de Classe", src: "./assets/images/widget-3.jpg" })),
    ]

    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", {}, "O Modelo Mental Orientado a Objetos"),
                new_two_rows(
                    new_two_columns(
                        element("article", {},
                            element("p", {},
                                "Um modelo mental comum para entender a herança é pensar em termos de classes e instâncias. Classes são como moldes que definem as características e comportamentos dos objetos, enquanto instâncias são os objetos reais criados a partir dessas classes."
                            ),

                            element("p", {},
                                "Esse modelo mental funciona bem se o problema for, de fato, modelável num sistema hierárquico. No entanto, muitos problemas do reais não são hierárquicos, e tentar forçar uma estrutura hierárquica pode levar a situações onde alguma entidade \"é\" dois tipos diferentes."
                            ),
                        ),
                        diagrams[0]
                    ),
                    new_two_columns(
                        diagrams[1],
                        diagrams[2]
                    )
                )
            )
        )
    )

    slide_window.animation(animation_deadly_diamond_slide_5.bind(null, ...diagrams))
    return slide_window
}

function* animation_deadly_diamond_slide_5(...elements: HTMLElement[]) {
    elements.forEach(element => element.classList.add("hidden"))
    yield

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden")
        yield
    }
}

function new_deadly_diamond_slide_6(window_data: WindowData) {
    const slide_window = (
        new_slide_window(window_data, "deadly-diamond",
            element("main", { className: "titled" },
                element("h1", {}, "Composição sobre Herança"),
                jfx.new_field(
                    element("img", { alt: "Widget Consertado", src: "./assets/images/widget-final.jpg" })
                )
            )
        )
    )

    return slide_window
}

export default async function (window_data: WindowData): Promise<Slide[]> {
    return [
        new_deadly_diamond_slide_1(window_data),
        await new_deadly_diamond_slide_python(window_data),
        await new_deadly_diamond_slide_cpp(window_data),
        await new_deadly_diamond_slide_java(window_data),
        new_deadly_diamond_slide_5(window_data),
        new_deadly_diamond_slide_6(window_data),
    ]
}