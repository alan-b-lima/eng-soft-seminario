import { jfx } from "../jfx-components.js";
import sspm from "../sspm/slide.js";
export function new_slide_window(window, option, ...children) {
    const slide_window = (jfx.new_window(window.title, true, jfx.new_menu(Object.values(window.options), window.options[option]), ...children));
    slide_window.classList.add("slide");
    return new sspm.Slide(slide_window);
}
export function new_column_window(window, option, ...columns) {
    const slide_window = (jfx.new_window(window.title, true, jfx.new_menu(Object.values(window.options), window.options[option]), jfx.new_panel(...columns.map(c => jfx.new_panel(...c)))));
    slide_window.classList.add("slide");
    return new sspm.Slide(slide_window);
}
