
export function prettyDate(input: string) {
    const d = new Date(input);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}