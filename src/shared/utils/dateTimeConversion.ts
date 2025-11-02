import moment, { min } from "moment";


export const toISODateTime = (date: string, time12h: string) => {
    const [time, modifier] = time12h.toLowerCase().split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours < 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;

    // Combine to full ISO string in UTC
    const isoString = new Date(`${date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`).toISOString();
    return isoString;
}

export const getLocalTimeBreakdown = (isoString: string) => {
    // Remove the trailing Z so JS doesn't treat it as UTC
    const cleanString = isoString.replace('Z', '')
    const date = new Date(cleanString) // interpreted as local time

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'

    hours = hours % 12
    hours = hours ? hours : 12 // convert 0 → 12

    return {
        date: `${day}/${month}/${year}`,
        hours: hours.toString(),
        minutes: minutes.toString(),
        ampm,
    }
}