export default function component(tag, properties = {}, ...children) {
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
