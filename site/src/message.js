import ref from "./ref.js"

const emoteURL = (id) =>
    `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`

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
    if (emoteSource.length === 0) {
        return escape(source)
    }

    const emotes = Array.from(
        emoteSource.matchAll(emoteRegex),
        (match) => [
            source.substring(match.groups.start, parseInt(match.groups.end) + 1),
            match.groups.id
        ]
    )
    const mapping = Object.fromEntries(emotes)
    const emoteRegexSource =
        Object.keys(mapping)
        .map(key => key.replace(/[\:\)\\\/\|\-\+\[\]\~\$\^\.]/g, "\\$&"))
        .join("|")
    // console.log(emoteRegexSource)
    const messageRegex = new RegExp(`(^|\\s)(${emoteRegexSource})(\\s|$)`, "g")
    console.log(messageRegex)
    console.log(mapping)
    console.log(escape(source))
    return escape(source).replace(
        messageRegex,
        (_, head, text, tail) => `${head}<img src="${emoteURL(mapping[text])}" ws-x="[w 28px] [h 28px]" />${tail}`
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
