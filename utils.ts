

export function relativeTime(seconds: number){
    const nowInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate the time difference in seconds
    const delta = nowInSeconds - seconds;

    // Convert the delta to various time units
    const minutes = Math.floor(delta / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Determine the relative time
    if (delta < 60) {
        return `${delta}s`;
    } else if (minutes < 60) {
        return `${minutes}min`;
    } else if (hours < 24) {
        return `${hours}hr`;
    } else if (days < 30) {
        return `${days}d`;
    } else if (months < 12) {
        return `${months}m`;
    } else {
        return `${years}y`;
    }
}