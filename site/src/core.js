import { Chat } from "https://esm.sh/@axel669/twitch/browser/module.mjs"

// import testMessages from "./tests.js"
import createMessage from "./message.js"
import ref from "./ref.js"
import "./setup.js"

const template = document.createElement("template")
template.innerHTML = ref.config.container
document.body.append(template.content)
const messages = document.querySelector("#chat-messages")

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
        chatMessage.children[0].setAttribute("data-msg-id", data.tags.id)
        appendMessage(chatMessage)
    }
)
chat.on(
    "CLEARMSG",
    ({ data }) => {
        document.querySelector(`[data-msg-id="${data.tags.targetMsgID}"]`)?.remove()
    }
)
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
        await wait(500)
    }
}
