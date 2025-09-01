import { element } from "./jsxmm/jsxmm.js";
import slide from "./slide/slide.js";
import { new_jfx_button, new_jfx_field, new_jfx_menu, new_jfx_panel, new_jfx_window } from "./jfx-components.js";
import { setup_event_listenters } from "./slide/listeners.js";
function main() {
    const WINDOW_TITLE = "Seminário de Engenharia de Software I";
    const ROOT = document.body;
    const MENU_OPTIONS = {
        home: "Início",
        solid: "SOLID",
    };
    const slides = [
        new_home_slide(WINDOW_TITLE, MENU_OPTIONS, "home"),
        new_solid_slide(WINDOW_TITLE, MENU_OPTIONS, "solid"),
    ];
    const start_at = function () {
        const page = localStorage.getItem("current-page");
        if (page === null) {
            return 0;
        }
        const index = +page;
        if (Number.isNaN(index)) {
            return 0;
        }
        return index;
    }();
    const ss = new slide.SlideShow({ start_at }, ...slides, new slide.Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")));
    ROOT.append(...ss.slides().map(s => s.element()));
    setup_event_listenters(ss, () => {
        const popup = element("div", {
            style: {
                display: "grid",
                placeItems: "center",
                position: "absolute",
                width: "100dvw",
                height: "100dvh",
                overflow: "hidden",
                zIndex: "1",
                backgroundColor: "red",
            }
        }, `${ss.current()}`);
        document.documentElement.prepend(popup);
        setTimeout(() => {
            popup.remove();
        }, 1000);
    });
    const mo = new MutationObserver((mutations, observer) => {
        localStorage.setItem("current-page", `${ss.current()}`);
    });
    mo.observe(ROOT, { attributeFilter: ["class"], childList: true, subtree: true });
}
function new_home_slide(window_title, options, option) {
    const names = [
        "Alan Lima", "Breno Augusto", "Juan Pablo",
        "Luan Filipe", "Mateus Oliveira", "Vitor Moises"
    ];
    const slide_window = (new_jfx_window(window_title, new_jfx_menu(Object.values(options), options[option]), new_jfx_panel(element("h1", {}, "Seminário de Engenharia de Software I"), element("h2", {}, new_jfx_button("Strategy"), new_jfx_button("Diamante da Morte"), new_jfx_button("Herança Negada"), new_jfx_button("Extração de Interface")), element("span", {}, new_jfx_field(`${names.slice(0, -1).reduce((acc, v) => `${acc}, ${v}`)} e ${names[names.length - 1]}`), element("div", {}, "Profª Kattiana Constantino")))));
    slide_window.classList.add("slide", `${option}-slide`);
    return new slide.Slide(slide_window);
}
function new_solid_slide(window_title, options, option) {
    const SOLID = [
        ["S", "Princípio da Resposabilidade Única"],
        ["O", "Princípio do Aberto/Fechado"],
        ["L", "Princípio da Substituição de Liskov"],
        ["I", "Princípio da Segregação de Interface"],
        ["D", "Princípio da Inversão de Dependência"],
    ];
    const principles = SOLID.map(([letter, statement]) => {
        return (element("div", { className: "solid-principle" }, element("div", { className: "solid-letter" }, letter), (() => {
            const field = new_jfx_field(statement);
            field.classList.add("solid-statement");
            return field;
        })()));
    });
    const principles_panel = new_jfx_panel(...principles);
    principles_panel.classList.add("solid-principles");
    const slide_window = (new_jfx_window(window_title, new_jfx_menu(Object.values(options), options[option]), principles_panel));
    slide_window.classList.add("slide", `${option}-slide`);
    return new slide.Slide(slide_window, function* () {
        principles.forEach(principle => principle.classList.remove("highlight"));
        yield;
        for (let i = 0; i < principles.length; i++) {
            principles[i].classList.add("highlight");
            yield;
            principles[i].classList.remove("highlight");
        }
    });
}
window.addEventListener("DOMContentLoaded", main);
