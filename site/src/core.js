import { Chat } from "https://esm.sh/@axel669/twitch/browser/module.mjs"

// import testMessages from "./tests.js"
import createMessage from "./message.js"
import ref from "./ref.js"

const [globalBadges, userBadges] = await Promise.all([
    fetch("https://shion-chat-api.axel669.net/badges/global")
        .then(res => res.json()),
    fetch(`https://shion-chat-api.axel669.net/badges/${ref.config.userID}`)
        .then(res => res.json())
])

const badgeURL = {}
for (const badge of globalBadges) {
    for (const version of badge.versions) {
        const key = `${badge.set_id}/${version.id}`
        badgeURL[key] = version.image_url_1x
    }
}
for (const badge of userBadges) {
    for (const version of badge.versions) {
        const key = `${badge.set_id}/${version.id}`
        badgeURL[key] = version.image_url_1x
    }
}
ref.badgeURL = badgeURL
ref.chatHTML = ref.config.chatHTML

const template = document.createElement("template")
template.innerHTML = ref.config.container
document.body.append(template.content)
const messages = document.querySelector("#chat-messages")
const wrapper = document.querySelector("#chat-wrapper")

const observer = new ResizeObserver(
    ([change]) => {
        wrapper.scrollTo(0, change.contentRect.height)
    }
)
observer.observe(messages)

const chat = Chat({
    user: {
        name: "justinfan669",
        token: "",
    },
    channel: ref.config.channel
})

const appendMessage = (chatMessage) => {
    messages.append(chatMessage)
    if (messages.children.length > 30) {
        messages.children[0].remove()
    }
}
chat.on(
    "chat.message",
    ({ data }) => {
        console.log(data)
        const chatMessage = createMessage(data)
        appendMessage(chatMessage)
    }
)
// chat.on("chat.*", console.log)
chat.on("connect", () => console.log("connected"))
chat.connect()

const url = new URL(location)
const testFile = url.searchParams.get("tests")

if (testFile !== null) {
    const wait = (time) => new Promise(resolve => setTimeout(resolve, time))
    const module = await import(testFile)
    for (const message of module.default) {
        appendMessage(
            createMessage(message)
        )
        await wait(250)
    }
}
