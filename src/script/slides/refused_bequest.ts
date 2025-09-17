import jfx from "../jfx-components.ts"
import { element } from "../jsxmm/jsxmm.ts"
import { Slide } from "../sspm/slide.ts"
import { new_bullet_list, new_code_block, new_code_block_fetch, new_slide_window, new_two_columns, WindowData } from "./common.ts"

function new_refused_bequest_slide_1(window_data: WindowData) {
    const slide_window = (
        new_slide_window(window_data, "refused-bequest",
            element("main", { className: "titled" },
                element("h1", { style: {} }, "Herança Negada"),
                new_two_columns(
                    element("article", {},
                        element("p", {},
                            "Code Smells são como sinais de alerta do código, indicando possíveis pequenos problemas que podem levar a problemas maiores no futuro.",
                        ),

                        element("p", {},
                            "A Herança Negada (", element("span", { style: { fontStyle: "italic" } }, "Refused Bequest"), ") é um code smell que ocorre quando uma subclasse herda de uma classe pai, mas usa apenas uma fração dos métodos ou propriedades herdadas.",
                        ),

                        element("p", {},
                            "Isso leva a uma base de código onde a herança é mal utilizada e pode resultar em código difícil de manter e entender.",
                        ),
                    ),
                    element("div", { className: "image-cell" },
                        element("img", { alt: "Throwing Exception", src: "./assets/images/throw.png" })
                    )
                )
            )
        )
    )

    return slide_window
}

function new_refused_bequest_slide_2(window_data: WindowData) {
    const instance = jfx.new_field(
        new_code_block("U instanceof T", "java"),
        new_code_block("U /* not really */ instanceof T", "java"),
    )
    instance.classList.add("instanceof")

    const slide_window = (
        new_slide_window(window_data, "refused-bequest",
            element("main", { className: "titled" },
                element("h1", { style: {} }, "O que é Herança?"),
                new_two_columns(
                    element("article", {},
                        element("p", {},
                            "Herança é uma relação \"é tipo de\", que envolve duas entidades, o tipo herdado e o tipo herdeiro. Quando um tipo ", jfx.new_button("T"), " é herdado pelo tipo ", jfx.new_button("U"), ", é estabelicido um contrato que diz:"
                        ),

                        element("p", { className: "paragraph", style: { fontStyle: "italic" } },
                            "\"Aquele tipo que de mim herda deverá, em todos os momentos, satisfazer toda a interface pública a mim conferida\"."
                        ),

                        element("p", {},
                            "Assim, tipos que são criados que negam a herança podem causar problemas como lançamento inesperado de exceções ou provocar falhas silenciosas."
                        )
                    ),
                    instance
                )
            )
        )
    )

    slide_window.animation(animation_refused_bequest_slide_2.bind(null, instance))
    return slide_window
}

function* animation_refused_bequest_slide_2(instance: HTMLElement) {
    instance.classList.remove("not-really")

    let id
    id = setTimeout(() => {
        instance.classList.add("not-really")
        id = undefined
    }, 3000)

    yield
    
    if (id !== undefined) {
        instance.classList.add("not-really")
        clearTimeout(id)
        yield
    }
}

function new_refused_bequest_slide_3(window_data: WindowData) {
    const slide_window = (
        new_slide_window(window_data, "refused-bequest",
            element("main", { className: "titled" },
                element("h1", { style: {} }, "Herança Negada"),
                new_two_columns(
                    element("div", { className: "titled-bullet-list" },
                        element("h2", {}, "Sinais e sintomas"),
                        new_bullet_list(
                            "métodos herdados, mas não utilizados;",
                            "sobrescreve e não faz nada;",
                            "implementação incompleta da interface;",
                            "uma hierarquia confusa de classes.",
                        )
                    ),

                    element("div", { className: "titled-bullet-list" },
                        element("h2", {}, "Razões do problema"),
                        new_bullet_list(
                            "generalização excessiva;",
                            "alteração de requisitos ao longo do tempo;",
                            "falta de refatoração."
                        )
                    )
                )
            )
        )
    )

    return slide_window
}

async function new_refused_bequest_slide_4(window_data: WindowData) {
    const slide_window = (
        new_slide_window(window_data, "refused-bequest",
            element("main", { className: "titled" },
                element("h1", { style: {} }, "Solucionando a Herança Negada"),
                new_two_columns(
                    element("article", {},
                        element("p", {},
                            "Lidar com o Recused Bequest requer uma abordagem sistemática para simplificar e organizar o código. Algumas estratégias para resolver este code smell são listadas."
                        ),
                        element("p", {},
                            "Ao invés de usar herança para compartilhar código, considere usar composição. Crie componentes menores, que podem ser incluídos quando necessário."
                        ),
                        element("p", {},
                            "Usar interfaces segregadas para definir comportamento de alto nível, ao invés de confiar em implementações concretas possivelmente voláteis."
                        ),
                        element("p", {},
                            "Revisar periodicamente a hierarquia da sua classe para identificar subclasses que estão recusando o legado."
                        ),
                    ),
                    await new_code_block_fetch("./assets/code/refused-bequest/Imagem.java", "java")
                )
            )
        )
    )

    return slide_window
}

export default async function (window_data: WindowData): Promise<Slide[]> {
    return [
        new_refused_bequest_slide_1(window_data),
        new_refused_bequest_slide_2(window_data),
        new_refused_bequest_slide_3(window_data),
        await new_refused_bequest_slide_4(window_data),
    ]
}