

export const toISODateTime = (date: string, time12h: string) => {
    const [time, modifier] = time12h.toLowerCase().split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours < 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;

    // Combine to full ISO string in UTC
    const isoString = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`).toISOString();
    return isoString;
}