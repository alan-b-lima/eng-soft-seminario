import jfx from "../jfx-components.js";
import { element } from "../jsxmm/jsxmm.js";
import { Slide } from "../sspm/slide.js";
import { new_slide_window } from "./common.js";
import deadly_diamond from "./deadly_diamond.js";
import extract_interface from "./extract_interface.js";
import refused_bequest from "./refused_bequest.js";
import strategy from "./strategy.js";
const WINDOW_DATA = {
    title: "Seminário de Engenharia de Software I",
    options: {
        "home": "Início",
        "strategy": "Estratégia",
        "refused-bequest": "Herança Negada",
        "deadly-diamond": "Diamante da Morte",
        "extract-interface": "Extração de Interface",
        "references": "Referências",
    }
};
function new_home_slide() {
    const names = [
        "Alan Lima", "Breno Augusto", "Juan Pablo",
        "Luan Filipe", "Mateus Oliveira", "Vitor Mozer"
    ];
    const slide_window = new_slide_window(WINDOW_DATA, "home", jfx.new_panel(element("h1", {}, "Seminário de Engenharia de Software I"), element("h2", {}, jfx.new_button("Estratégia"), jfx.new_button("Diamante da Morte"), jfx.new_button("Herança Negada"), jfx.new_button("Extração de Interface")), element("span", {}, jfx.new_field(`${names.slice(0, -1).reduce((acc, v) => `${acc}, ${v}`)} e ${names[names.length - 1]}`), element("div", {}, "Profª Kattiana Constantino"))));
    return slide_window;
}
function new_references_slide() {
    const option = "references";
    const slide_window = (new_slide_window(WINDOW_DATA, option, jfx.new_panel(new_reference({
        author: "Casey Muratori",
        work: "The Big OOPs: Anatomy of a Thirty-five-year Mistake",
        publisher: "Better Software Conference",
        source: "",
        info: "2025",
        image: "./assets/images/the-big-oops.png",
        horizontal: 3,
        vertical: 2,
    }), new_reference({
        author: "Robert Martin",
        work: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
        publisher: "Prentice Hall",
        source: "https://agorism.dev/book/software-architecture/(Robert C. Martin Series) Robert C. Martin - Clean Architecture_ A Craftsman%E2%80%99s Guide to Software Structure and Design-Prentice Hall (2017).pdf",
        info: "2017",
        image: "./assets/images/clean-arch.jpg",
        horizontal: 2,
        vertical: 2,
    }), new_reference({
        author: "Refactoring Guru",
        work: "Strategy",
        publisher: "Refactoring Guru",
        source: "https://refactoring.guru/design-patterns/strategy",
        info: "2025",
        image: "./assets/images/refactoring-guru.png",
        horizontal: 2,
    }), new_reference({
        author: "Vittorio Romeo",
        work: "Analysis of entity encoding techniques, design and implementation of a multithreaded compile-time Entity-Component-System C++14 library",
        publisher: "Università degli Studi di Messina",
        source: "http://dx.doi.org/10.13140/RG.2.1.1307.4165",
        info: "2016",
        vertical: 3,
    }), new_reference({
        author: "Erich Gamma; Richard Helm; Ralph Johnson; John Vilssides",
        work: "Design Patterns: Elements of Reusable Object-Oriented Software",
        publisher: "Addison-Wesley",
        source: "https://www.javier8a.com/itc/bd1/articulo.pdf",
        info: "1994",
        image: "./assets/images/design-patterns.png",
        horizontal: 2,
        vertical: 3,
    }), new_reference({
        author: "Elixir Bootlin",
        work: "Elixar Cross Reference v6.16.7",
        publisher: "Elixir Bootlin",
        source: "https://elixir.bootlin.com/linux/v6.16.7/source/include/linux/fs.h#L2151",
        info: "2025",
        image: "./assets/images/bootlin.png",
        horizontal: 2,
        vertical: 2,
    }))));
    slide_window.element().classList.add(`${option}-slide`);
    return slide_window;
}
function new_reference(reference) {
    const card = jfx.new_button(element("div", {}, `${reference.author}. ${reference.work}. `, element("strong", {}, reference.publisher), `. `, element("a", {
        href: reference.source,
        target: "_blank",
        rel: "noopener noreferrer"
    }, "<disponível aqui>"), `. ${reference.info}.`));
    if (reference.image !== undefined) {
        card.append(element("img", {
            loading: "lazy",
            alt: reference.work,
            src: reference.image
        }));
    }
    card.classList.add("reference");
    if (reference.vertical !== undefined) {
        card.style.gridRow = `span ${reference.vertical}`;
    }
    if (reference.horizontal !== undefined) {
        card.style.gridColumn = `span ${reference.horizontal}`;
    }
    return card;
}
export default async function () {
    return [
        new_home_slide(),
        ...await strategy(WINDOW_DATA),
        ...await refused_bequest(WINDOW_DATA),
        ...await deadly_diamond(WINDOW_DATA),
        ...await extract_interface(WINDOW_DATA),
        new_references_slide(),
        new Slide(element("div", { className: "slide final-slide" }, "Fim da Apresentação")),
    ];
}
