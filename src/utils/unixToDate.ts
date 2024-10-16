export default function unixToDate(unix: number): string {
    const date = new Date(unix * 1000);
    return date.toLocaleDateString();
}

export function unixToYear(unix: number): string {
    const date = new Date(unix * 1000);
    return date.getFullYear().toString();
}
