export function stringToJson(text) {
    try {
        return JSON.parse(
            text.replace(/'id'/g, '"id"')
            .split(/'name'/g).join('"name"')
            .split(/ '/g).join(' "')
            .split(/ \\"/g).join(' "')
            .split(/'}/g).join('"}')
            .split(/\\"}/g).join('"}'));
    } catch {
        return {};
    }
}
