import { jfx } from "../jfx-components.ts"
import sspm from "../sspm/slide.ts"

export type WindowData = {
    title: string
    options: Record<string, {
        name: string,
        submenus: string[]
    }>
}

export function new_slide_window(window: WindowData, option: string, ...children: (Node | string)[]): sspm.Slide {
    const slide_window = (
        jfx.new_window(
            window.title, true,
            jfx.new_menu(Object.values(window.options).map(v => v.name), window.options[option].name),
            ...children
        )
    )

    slide_window.classList.add("slide")
    return new sspm.Slide(slide_window)
}

export function new_column_window(window: WindowData, option: string, ...columns: (Node | string)[][]): sspm.Slide {
    const slide_window = (
        jfx.new_window(
            window.title, true,
            jfx.new_menu(Object.values(window.options).map(v => v.name), window.options[option].name),
            jfx.new_panel(...columns.map(c => jfx.new_panel(...c)))
        )
    )

    slide_window.classList.add("slide")
    return new sspm.Slide(slide_window)
}