import component from "./lib/component.js";
export function newJFXTitleBar(title) {
    return (component("div", { className: "jfx-title" }, component("div", { className: "jfx-java-logo" }), component("div", { className: "jfx-window-name" }, title), component("div", { className: "jfx-windows-options" }, component("div", { className: "jfx-minimize" }), component("div", { className: "jfx-restore" }), component("div", { className: "jfx-close" }))));
}
export function newJFXWindow(title, ...children) {
    return component("div", { className: "jfx-window" }, newJFXTitleBar(title), newJFXPanel(...children));
}
export function newJFXPanel(...children) {
    return component("div", { className: "jfx-panel" }, ...children);
}
export function newJFXButton(text) {
    return component("div", { className: "jfx-button" }, text);
}
export function newJFXField(...children) {
    return component("div", { className: "jfx-field" }, ...children);
}
export function newHomePage() {
    const names = [
        "Alan Lima", "Breno Augusto", "Juan Pablo",
        "Luan Filipe", "Mateus Oliveira", "Vitor Moises"
    ];
    const page = newJFXWindow("Seminário de Engenharia de Software I", component("h1", {}, "Seminário de Engenharia de Software I"), component("h2", {}, newJFXButton("Repository"), newJFXButton("Diamante da Morte"), newJFXButton("Herança Negada"), newJFXButton("Números Mágicos")), component("span", {}, newJFXField(...names.map(n => component("div", {}, n))), component("div", {}, "Profª Kattiana Constantino")));
    page.classList.add("slide", "home-page");
    return page;
}
export function newFinalSlide() {
    return component("section", { className: "slide final-page" }, "Fim da Apresentação");
}
