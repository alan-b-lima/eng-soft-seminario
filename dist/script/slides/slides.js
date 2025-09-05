import { jfx } from "../jfx-components.js";
import { element } from "../jsxmm/jsxmm.js";
import sspm from "../sspm/slide.js";
import { new_slide_window } from "./common.js";
const WINDOW_DATA = {
    title: "Seminário de Engenharia de Software I",
    options: {
        home: "Início",
        solid: "SOLID",
        strategy: "Strategy",
        deadly_diamond: "Diamante da Morte",
        refused_bequest: "Herança Negada",
        interface_extraction: "Extração de Interface"
    }
};
function new_home_slide() {
    const option = "home";
    const names = [
        "Alan Lima", "Breno Augusto", "Juan Pablo",
        "Luan Filipe", "Mateus Oliveira", "Vitor Moises"
    ];
    const slide_window = new_slide_window(WINDOW_DATA, option, jfx.new_panel(element("h1", {}, "Seminário de Engenharia de Software I"), element("h2", {}, jfx.new_button("Strategy"), jfx.new_button("Diamante da Morte"), jfx.new_button("Herança Negada"), jfx.new_button("Extração de Interface")), element("span", {}, jfx.new_field(`${names.slice(0, -1).reduce((acc, v) => `${acc}, ${v}`)} e ${names[names.length - 1]}`), element("div", {}, "Profª Kattiana Constantino"))));
    slide_window.element().classList.add(`${option}-slide`);
    return slide_window;
}
function new_solid_slide() {
    const option = "solid";
    const SOLID = [
        ["S", "Princípio da Resposabilidade Única"],
        ["O", "Princípio do Aberto/Fechado"],
        ["L", "Princípio da Substituição de Liskov"],
        ["I", "Princípio da Segregação de Interface"],
        ["D", "Princípio da Inversão de Dependência"],
    ];
    const principles = SOLID.map(([letter, statement]) => {
        return (element("div", { className: "solid-principle" }, element("div", { className: "solid-letter" }, letter), (() => {
            const field = jfx.new_field(statement);
            field.classList.add("solid-statement");
            return field;
        })()));
    });
    const principles_panel = jfx.new_panel(...principles);
    principles_panel.classList.add("solid-principles");
    const slide_window = new_slide_window(WINDOW_DATA, option, principles_panel);
    slide_window.element().classList.add("slide", `${option}-slide`);
    slide_window.animation(animation_solid.bind(null, principles));
    return slide_window;
}
function* animation_solid(principles) {
    principles.forEach(principle => principle.classList.remove("highlight"));
    yield;
    for (let i = 0; i < principles.length; i++) {
        principles[i].classList.add("highlight");
        yield;
        principles[i].classList.remove("highlight");
    }
}
function new_strategy_slide() {
    const option = "strategy";
    const slide_window = (new_slide_window(WINDOW_DATA, option, jfx.new_panel("Strategy")));
    slide_window.element().classList.add(`${option}-slide`);
    return slide_window;
}
export default [
    new_home_slide(),
    new_solid_slide(),
    new_strategy_slide(),
    new sspm.Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")),
];
