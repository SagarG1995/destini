import moment from 'moment';

export function parseTimestamp(
    ts?: string | number | Date | { toDate?: () => Date } | { seconds?: number; nanoseconds?: number }
): string {
    let date: Date;

    if (!ts) {
        date = new Date(); // fallback
    } else if (typeof (ts as any).toDate === 'function') {
        // Firestore Timestamp object
        date = (ts as any).toDate();
    } else if (typeof (ts as any).seconds === 'number') {
        // Firestore plain object (from JSON)
        date = new Date((ts as any).seconds * 1000);
    } else if (typeof ts === 'number') {
        // Unix timestamp (seconds or ms)
        date = ts < 9999999999 ? new Date(ts * 1000) : new Date(ts);
    } else if (typeof ts === 'string') {
        // ISO date string or other string formats
        date = new Date(ts);
    } else if (ts instanceof Date) {
        date = ts;
    } else {
        console.warn('Unknown timestamp type:', ts);
        date = new Date();
    }

    return moment(date).format('MMM DD, YYYY');
}


export function parseFirestoreTimestamp(
    ts?: string | number | Date | { toDate?: () => Date } | { seconds?: number; nanoseconds?: number }
): Date {
    if (!ts) return new Date(); // fallback to now

    if (typeof (ts as any).toDate === 'function') {
        // Firestore Timestamp object
        return (ts as any).toDate();
    } else if (typeof (ts as any).seconds === 'number') {
        // Firestore plain object (from JSON)
        return new Date((ts as any).seconds * 1000);
    } else if (typeof ts === 'number') {
        // Unix timestamp (seconds or ms)
        return ts < 9999999999 ? new Date(ts * 1000) : new Date(ts);
    } else if (typeof ts === 'string') {
        // ISO date string
        return new Date(ts);
    } else if (ts instanceof Date) {
        return ts;
    }

    console.warn('Unknown timestamp type:', ts);
    return new Date();
}