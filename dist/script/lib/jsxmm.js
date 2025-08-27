export function element(tag, properties = {}, ...children) {
    const element = document.createElement(tag);
    for (const key in properties) {
        if (!(key in element)) {
            console.error(`${key} not present in ${tag} element`);
        }
        element[key] = properties[key];
    }
    element.append(...children);
    return element;
}
export function style(style) {
    let computedStyle = "";
    for (const property in style) {
        computedStyle += `${camelCaseToDashSnakeCase(property)}:${style[property]};`;
    }
    return computedStyle;
}
function camelCaseToDashSnakeCase(identifier) {
    const matches = identifier.match(/([A-Z])?([a-z]+)/g);
    if (matches === null) {
        return "";
    }
    return matches.reduce((acc, s) => acc + "-" + s.toLowerCase());
}
