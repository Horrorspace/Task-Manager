export function emailValidate(email: string): boolean {
    const allowZones: string[] = ['com', 'ru', 'info', 'org', 'net'];
    const allowZonesStr = allowZones.join('|')
    const testExp: RegExp = new RegExp(`^[a-zA-z0-9_\.]{1,}@[a-zA-z0-9_]{1,}\.(${allowZonesStr})`);
    return email.length < 255 && testExp.test(email)
}

export function nameValidate(name: string): boolean {
    return name.length > 0 && name.length < 255
}