
export function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " yr ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " mo ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hrs ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " mins ago";
    }
    return Math.floor(seconds) + " secs ago";
}

export function formatDate(date: Date): string {
    // Pad the day and month with a leading zero if they are less than 10
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    // Format the date as "dd/MM/yyyy"
    return `${day}/${month}/${year}`;
}

export function timeLeftUntil(futureDate: Date): string {
    const now = new Date();
    const diffInSeconds = (futureDate.getTime() - now.getTime()) / 1000;

    if (diffInSeconds < 0) {
        return "The date is in the past!";
    }

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const months = Math.floor(days / 30);  // Approximation: assuming each month has 30 days

    if (months > 0) {
        return `${months} months left`;
    } else if (days > 0) {
        return `${days} days left`;
    } else if (hours > 0) {
        return `${hours} hours left`;
    } else if (minutes > 0) {
        return `${minutes} minutes left`;
    } else {
        return "Less than a minute left";
    }
}

export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}