import { element } from "./jsxmm/jsxmm.js";
import hljs from "./lib/highlight.min.js";
export var jfx;
(function (jfx) {
    function new_title_bar(title, maximized = true) {
        return (element("div", { className: "jfx-title" }, element("div", { className: "jfx-java-logo" }), element("div", { className: "jfx-window-name" }, title), element("div", { className: "jfx-windows-options" }, element("div", { className: "jfx-minimize" }), element("div", { className: maximized ? "jfx-restore" : "jfx-maximize" }), element("div", { className: "jfx-close" }))));
    }
    jfx.new_title_bar = new_title_bar;
    function new_window(title, maximized = true, ...children) {
        return element("div", { className: "jfx-window" }, new_title_bar(title, maximized), ...children);
    }
    jfx.new_window = new_window;
    function new_menu(options, index) {
        const comp = element("div", { className: "jfx-menu" }, ...options.map(option => element("div", { className: "jfx-menu-option" }, option)));
        if (typeof index === "string") {
            index = options.findIndex(v => v === index);
        }
        const option = comp.children[index];
        if (option !== undefined) {
            option.classList.add("selected");
        }
        return comp;
    }
    jfx.new_menu = new_menu;
    function new_panel(...children) {
        return element("div", { className: "jfx-panel" }, ...children);
    }
    jfx.new_panel = new_panel;
    function new_button(text) {
        return element("div", { className: "jfx-button" }, text);
    }
    jfx.new_button = new_button;
    function new_field(...children) {
        return element("div", { className: "jfx-field" }, ...children);
    }
    jfx.new_field = new_field;
    function new_code_block(source, language) {
        return element("pre", { className: "jfx-code-block" }, element("code", {
            innerHTML: hljs.highlight(source, { language }).value
        }));
    }
    jfx.new_code_block = new_code_block;
})(jfx || (jfx = {}));
