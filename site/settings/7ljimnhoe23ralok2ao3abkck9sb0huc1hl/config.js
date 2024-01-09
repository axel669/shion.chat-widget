const borderColor = (tags) => {
    if (tags.broadcaster === true) {
        return "@primary"
    }
    if (tags.mod === true) {
        return "@secondary"
    }
    if (tags.vip === true) {
        return "@accent"
    }
    return "@text-color-normal"
}

export default {
    channel: "xserris",
    userID: "206621705",
    container: `
        <div id="chat-wrapper" ws-x="@theme:dark [font Inter] [chat-wrapper]">
            <div id="chat-messages"
                ws-x="[flex] [gap 4px] [pos absolute] [inset.x 0px] [-y 0px]">
            </div>
        </div>
    `,
    chatHTML(data, messageHTML, badges) {
        // const sent = parseInt(data.tags.tmiSentTS)
        const border = borderColor(data.tags)

        return `
            <div ws-x="[message-bg]" class="enter">
                <ws-grid ws-x="[z 10] [p 4px] [gr.cols min-content 1fr]">
                    <img src="https://cdn.frankerfacez.com/avatar/twitch/${data.tags.userID}"
                    ws-x="[w 32px] [h 32px] [r 50%]" class="avatar" />

                    <div>
                        <span ws-x="[name-style ${data.tags.color}] [b.c ${border}]
                        [disp inline-block] [h 32px]">
                            ${data.tags.displayName} ${badges.join("")}
                        </span>

                        ${messageHTML}
                    </div>
                </ws-grid>
            </div>
        `
    }
}
