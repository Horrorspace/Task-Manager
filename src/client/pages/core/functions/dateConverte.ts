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

export function getLocalDataString(date: Date): string {
    const dateArr = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
    ];
    const [Y, M, D] = dateArr;
    return `${D}.${M}.${Y}`
}

export function getDateOnly(date: Date): Date {
    const dateResult = new Date();
    dateResult.setFullYear(date.getFullYear());
    dateResult.setMonth(date.getMonth());
    dateResult.setDate(date.getDate());
    return dateResult
}

export function getLocalFullDataString(date: Date): string {
    const dateArr = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ];
    const [Y, M, D, h, m] = dateArr;
    return `${D}.${M}.${Y} ${h}:${m}`
}

export function getLocalTimeString(date: Date): string {
    const dateArr = [
        date.getHours(),
        date.getMinutes()
    ];
    const time: string[] = dateArr.map(val => val < 10 ? `0${val}` : `${val}`)
    const [h, m] = time;

    return `${h}:${m}`
}