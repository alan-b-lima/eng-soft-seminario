import { element } from "./lib/jsxmm.js";
export function newJFXTitleBar(title) {
    return (element("div", { className: "jfx-title" }, element("div", { className: "jfx-java-logo" }), element("div", { className: "jfx-window-name" }, title), element("div", { className: "jfx-windows-options" }, element("div", { className: "jfx-minimize" }), element("div", { className: "jfx-restore" }), element("div", { className: "jfx-close" }))));
}
export function newJFXWindow(title, ...children) {
    return element("div", { className: "jfx-window" }, newJFXTitleBar(title), ...children);
}
export function newJFXMenu(options, index) {
    const comp = element("div", { className: "jfx-menu" }, ...options.map(o => element("div", { className: "jfx-menu-option" }, o)));
    switch (typeof index) {
        case "string":
            index = options.findIndex(v => v === index);
        case "number":
            const option = comp.children[index];
            if (option !== undefined) {
                option.classList.add("selected");
            }
            break;
    }
    return comp;
}
export function newJFXPanel(...children) {
    return element("div", { className: "jfx-panel" }, ...children);
}
export function newJFXButton(text) {
    return element("div", { className: "jfx-button" }, text);
}
export function newJFXField(...children) {
    return element("div", { className: "jfx-field" }, ...children);
}
