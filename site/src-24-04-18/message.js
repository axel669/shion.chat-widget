import ref from "./ref.js"

const replacers = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
}
const escape = (value) =>
    value?.toString().replace(/[\&<>"]/g, (s) => replacers[s])
    ?? ""

const emoteRegex = /(?<id>\w+):(?<start>\d+)\-(?<end>\d+)/g
const fillEmotes = (source, emoteSource) => {
    const emotes =
        (emoteSource.length === 0)
        ? []
        : Array.from(
            emoteSource.matchAll(emoteRegex),
            (match) => [
                source.substring(match.groups.start, parseInt(match.groups.end) + 1),
                `https://static-cdn.jtvnw.net/emoticons/v2/${match.groups.id}/default/dark/1.0`
            ]
        )
    const mapping = Object.fromEntries(emotes)

    const emoteRegexSource =
        [...Object.keys(mapping), ...ref.externalKeys]
        .map(key => key.replace(/[\:\)\\\/\|\-\+\[\]\~\$\^\.\&\(]/g, "\\$&"))
        .join("|")
    const messageRegex = new RegExp(
        `(?<=^|\\s)(${emoteRegexSource})(?=\\s|$)`, "g"
    )

    return escape(source).replace(
        messageRegex,
        (text) => {
            const url = mapping[text] ?? ref.externalEmotes[text]
            return `<img src="${url}" ws-x="[w 28px] [h 28px]" />`
        }
    )
}

const template = document.createElement("template")
const createMessage = (data) => {
    const messageHTML = fillEmotes(data.message, data.tags.emotes)
    const badges = data.tags.badges
        .filter(
            badge => badge !== ""
        )
        .map(
            name => `<img src="${ref.badgeURL[name]}" />`
        )

    template.innerHTML = ref.chatHTML(
        data, messageHTML, badges
    )

    return template.content
}

export default createMessage
