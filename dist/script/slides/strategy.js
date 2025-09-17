import jfx from "../jfx-components.js";
import { element } from "../jsxmm/jsxmm.js";
import { new_bullet_list, new_code_block_fetch, new_slide_window, new_two_columns } from "./common.js";
function new_strategy_slide_1(window_data) {
    const slide_window = new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "Estratégia"), jfx.new_panel(jfx.new_field([
        "Define uma família de algoritmos, encapsula cada um, e os faz intercambiáveis.",
        "Estratégia permite que o algoritmo varie de forma independente do cliente que o usa.",
    ].join(" ")), element("span", {}, "~ Gang of Four"))));
    slide_window.element().classList.add("foreword");
    return slide_window;
}
function new_strategy_slide_2(window_data) {
    const image_cell = jfx.new_field(element("img", {
        alt: "Strategy Class Diagram",
        src: "./assets/images/diagram.jpg",
    }));
    image_cell.classList.add("image-cell");
    const slide_window = new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "Estratégia"), jfx.new_panel(new_bullet_list(element("strong", {}, "Estratégia:"), new_bullet_list("declara uma interface comum aos algoritmos suportados;"), element("strong", {}, "Estratégia Concreta:"), new_bullet_list("implementa a interface da estratégia;"), element("strong", {}, "Contexto:"), new_bullet_list("usa a interface da estratégia implementada por alguma estratégia concreta,", "contém e/ou recebe uma referência a uma estratégia.")), image_cell)));
    slide_window.element().classList.add("diagram");
    return slide_window;
}
async function new_strategy_slide_3(window_data) {
    const slide_window = (new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "Caneta Colorida"), await new_code_block_fetch("./assets/code/strategy/pen/pen.go", "go"))));
    return slide_window;
}
async function new_strategy_slide_4(window_data) {
    const packet = "Hello, World!\n";
    const web = (element("code", { className: "code-block web" }, element("span", {}, ...packet.split("").map(ch => {
        const code_point = ch.codePointAt(0);
        return element("div", {}, code_point.toString(16).padStart(2, "0"));
    })), element("div", {}, "===>"), element("div", { className: "file" }, element("img", { alt: "image-icon", src: "./assets/images/web.png" }), element("span", {}, "google.com"))));
    const file = element("div", { className: "file" }, element("img", { alt: "image-icon", src: "./assets/images/image-icon.png" }), element("span", {}, "a.txt"));
    const file_system = (element("code", { className: "code-block file-system" }, file, element("div", { className: "file" }, element("img", { alt: "image-icon", src: "./assets/images/image-icon.png" }), element("span", {}, "strategy.go"))));
    const command = element("span", {}, "> go run strategy.go", element("br"));
    const message = element("span", {}, element("span", { style: { color: "#f00" } }, packet), element("br"), "> ");
    const terminal = (element("code", { className: "code-block terminal" }, command, message));
    const slide_window = (new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "A Interface Escritora"), new_two_columns(await new_code_block_fetch("./assets/code/strategy/writer/writer.go", "go"), element("div", { className: "result" }, terminal, web, file_system)))));
    slide_window.animation(animation_strategy_slide_4.bind(null, terminal, command, web, file_system, file, message));
    return slide_window;
}
function* animation_strategy_slide_4(...elements) {
    elements.forEach(element => element.classList.add("hidden"));
    yield;
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden");
        yield;
    }
}
async function new_strategy_slide_5(window_data) {
    const slide_window = (new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "Estratégias Modernas"), new_two_columns(element("article", {}, element("p", {}, "No Java, a abstração escolhida para funções anônimas foi as chamadas interfaces funcionais."), element("p", {}, [
        "interfaces funcionais são interfaces que possuem um, e apenas uma método abstrato.",
        "Funções anônimas declaradas no Java são, implicitamente, classes anônimas que",
        "implementam a interface em questão.",
    ].join(" ")), element("p", {}, "Esse comportamento permite interoperabilidade com estratégias já existentes - como o ", jfx.new_button("Comparator"), ".")), await new_code_block_fetch("./assets/code/strategy/Main.java", "java")))));
    return slide_window;
}
async function new_strategy_slide_6(window_data) {
    const slide_window = (new_slide_window(window_data, "strategy", element("main", { className: "titled" }, element("h1", {}, "Estratégias Modernas"), jfx.new_panel(element("article", {}, element("p", {}, [
        "As funções anônimas e funções como cidadãos de primeira classe,",
        "nas mais variadas linguagens que as implementam, desde C (com",
        "ponteiros de funções) a Python (com lambdas e funções de ordem",
        "superior), satifazem o padrão estratégia."
    ].join(" ")), element("p", {}, [
        "Elas satisfazem o padrão pois implementam um algoritmo que tem uma",
        "assinatura específica, efetivamente substituinda uma interface de",
        "uma estratégia com um único método.",
    ].join(" "))), await new_code_block_fetch("./assets/code/strategy/map.c", "c")))));
    slide_window.element().classList.add("diagram");
    return slide_window;
}
export default async function (window_data) {
    return [
        new_strategy_slide_1(window_data),
        new_strategy_slide_2(window_data),
        await new_strategy_slide_3(window_data),
        await new_strategy_slide_4(window_data),
        await new_strategy_slide_5(window_data),
        await new_strategy_slide_6(window_data),
    ];
}
