import { element } from "./jsxmm/jsxmm.js"

export const Colors = {
    background_white: "#ffffff",
    background_highlight: "#9fb5c8",
    background_selected: "#3d5c72",
    background_dark: "#55585e",
    background: "#d6d9df",
    inactice_foreground: "#959b9e",
    foreground: "#000000",
    sans_serif_font: "system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    mono_space_font: "'Courier New', 'Consolas', Courier, monospace",
    padding: ".25rem",
    thin_border: "1px"
}

export function new_jfx_title_bar(title: string, maximized: boolean = true) {
    return (
        element("div", { className: "jfx-title" },
            element("div", { className: "jfx-java-logo" }),
            element("div", { className: "jfx-window-name" }, title),
            element("div", { className: "jfx-windows-options" },
                element("div", { className: "jfx-minimize" }),
                element("div", { className: maximized ? "jfx-restore" : "jfx-maximize" }),
                element("div", { className: "jfx-close" }),
            )
        )
    )
}

export function new_jfx_window(title: string, ...children: (Node | string)[]) {
    return element("div", { className: "jfx-window" },
        new_jfx_title_bar(title),
        ...children
    )
}

export function new_jfx_menu(options: string[], index: number | string) {
    const comp = element("div", { className: "jfx-menu" },
        ...options.map(o => element("div", { className: "jfx-menu-option" }, o))
    )

    if (typeof index === "string") {
        index = options.findIndex(v => v === index)
    }

    const option = comp.children[index]
    if (option !== undefined) {
        option.classList.add("selected")
    }

    return comp
}

export function new_jfx_panel(...children: (Node | string)[]) {
    return element("div", { className: "jfx-panel" }, ...children)
}

export function new_jfx_button(text: string) {
    return element("div", {
        style: {
            backgroundImage: `linear-gradient(${Colors.background_white} 0%, ${Colors.background} 75%, ${Colors.background_white} 100%)`,
            border: `${Colors.thin_border} solid ${Colors.background_highlight}`,
            borderRadius: `.25rem`,
            padding: `.25rem .75rem`,
            textAlign: `center`,
        }
    }, text)
}

export function newJFXField(...children: (Node | string)[]) {
    return element("div", { className: "jfx-field" }, ...children)
}