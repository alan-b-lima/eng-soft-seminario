export function element<K extends keyof HTMLElementTagNameMap>(
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

export function style(style: { [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] }): CSSStyleDeclaration {
    const componentStyle = new CSSStyleDeclaration()
    for (const property in style) {
        componentStyle[property] = style[property]!
    }

    return componentStyle
}