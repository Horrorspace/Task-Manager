export function parseTimeWithTZ(timeWithTZ: string): number[] {
    if(timeWithTZ.includes('+')) {
        const [time, TZ] = timeWithTZ.split('+');
        const timeArr = time.split(':').map(val => parseInt(val, 10));
        const timeZone = parseInt(TZ, 10);
        const hour = timeArr[0] - timeZone;
        return [hour, ...timeArr.slice(1)]
    }
    else {
        const [time, TZ] = timeWithTZ.split('-');
        const timeArr = time.split(':').map(val => parseInt(val, 10));
        const timeZone = parseInt(TZ, 10);
        const hour = timeArr[0] + timeZone;
        return [hour, ...timeArr.slice(1)]
    }
}

export function dateParser(str: string): Date {
    const [date, timeWithTZ] = str.split(' ');
    const [year, month, day] = date.split('-').map(val => parseInt(val, 10));
    const [hour, minutes, seconds] = parseTimeWithTZ(timeWithTZ);
    const dateTest = new Date(`${year}-${month}-${day}T${hour}:${minutes}:${seconds}`)
    const dateResult = new Date();
    dateResult.setUTCFullYear(year);
    dateResult.setUTCMonth(month-1);
    dateResult.setUTCDate(day);
    dateResult.setUTCHours(hour);
    dateResult.setUTCMinutes(minutes);
    dateResult.setUTCSeconds(seconds);
    return dateResult
}

export function dateStringify(date: Date): string {
    const dateArr = [
        date.getUTCFullYear(),
        date.getUTCMonth()+1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ];
    const [Y, M, D, h, m, s] = dateArr;
    return `${Y}-${M}-${D} ${h}:${m}:${s}+00`
}