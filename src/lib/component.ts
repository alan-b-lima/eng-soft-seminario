export default function component<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    properties: { [J in keyof HTMLElementTagNameMap[K]]?: HTMLElementTagNameMap[K][J] } & Record<string, any> = {},
    ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag)

    for (const key in properties) {
        if (!(key in element)) {
            console.error(`${key} not present in ${tag} element`)
        }

        element[key] = properties[key]
    }

    element.append(...children)
    return element
}
