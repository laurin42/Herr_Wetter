export function formatToWeekday(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
}