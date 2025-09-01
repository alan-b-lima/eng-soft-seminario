const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
function format_duration(duration_ms) {
    const seconds = Math.floor((duration_ms % MINUTE) / SECOND);
    const minutes = Math.floor((duration_ms % HOUR) / MINUTE);
    const hours = Math.floor(duration_ms / HOUR);
    return new Intl.DurationFormat("pt-br", { style: "digital" }).format({
        hours, minutes, seconds
    });
}
export { format_duration };
