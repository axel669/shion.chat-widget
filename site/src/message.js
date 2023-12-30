import ref from "./ref.js"

const emoteURL = (id) =>
    `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`

const emoteRegex = /(?<id>\w+):(?<start>\d+)\-(?<end>\d+)/g
const fillEmotes = (source, emoteSource) => {
    if (emoteSource.length === 0) {
        return source
    }

    const emotes = Array.from(
        emoteSource.matchAll(emoteRegex),
        (match) => [
            source.substring(match.groups.start, parseInt(match.groups.end) + 1),
            match.groups.id
        ]
    )
    const mapping = Object.fromEntries(emotes)
    const messageRegex = new RegExp(`\\b(${Object.keys(mapping).join("|")})\\b`, "g")
    return source.replace(
        messageRegex,
        (_, text) => `<img src="${emoteURL(mapping[text])}" ws-x="[w 28px] [h 28px]" />`
    )
}

const template = document.createElement("template")
const createMessage = (data) => {
    const messageHTML = fillEmotes(data.message, data.tags.emotes)
    const badges = data.tags.badges.map(
        name => `<img src="${ref.badgeURL[name]}" />`
    )

    template.innerHTML = ref.chatHTML(
        data, messageHTML, badges
    )

    return template.content
}

export default createMessage
