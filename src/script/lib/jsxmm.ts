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
    let computedStyle = ""
    for (const property in style) {
        computedStyle += `${camelCaseToDashSnakeCase(property)}:${style[property]};`
    }

    return computedStyle as any as CSSStyleDeclaration
}

function camelCaseToDashSnakeCase(identifier: string): string {
    const matches = identifier.match(/([A-Z])?([a-z]+)/g)
    if (matches === null) {
        return ""
    }

    return matches.reduce((acc, s) => acc + "-" + s.toLowerCase())
}