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
    console.log(year, month, day, hour, minutes, seconds);
    const dateTest = new Date(year, month, day, hour, minutes, seconds)
    console.log(dateTest);
    const dateArr = [
        dateTest.getFullYear(),
        dateTest.getMonth(),
        dateTest.toLocaleDateString().split('.')[0],
        dateTest.getHours(),
        dateTest.getMinutes(),
        dateTest.getSeconds(),
        
    ];
    console.log(dateArr);
    return new Date(year, month, day, hour, minutes, seconds)
}

export function dateStringify(date: Date): string {
    const dateArr = [
        date.getFullYear(),
        date.getMonth(),
        date.toLocaleDateString().split('.')[0],
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];
    const [Y, M, D, h, m, s] = dateArr;
    return `${Y}-${M}-${D} ${h}:${m}:${s}+00`
}