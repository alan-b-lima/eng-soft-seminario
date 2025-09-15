interface Observer {
    update(): void
}

interface Notifier {
    attach(ob: Observer): void
    detach(ob: Observer): void
    notify(): void
}