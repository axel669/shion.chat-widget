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

// 615x660

let lineNum = 0
export default {
    channel: "odatnurd",
    userID: "66586458",
    container: `
        <div id="chat-wrapper" ws-x="@theme:dark [font Sublime] [chat-wrapper]">
            <div ws-x="[message-wrapper]">
                <div id="chat-messages"
                    ws-x="[flex] [gap 4px] [pos absolute] [inset.x 0px] [-y 0px]">
                </div>
            </div>
        </div>
    `,
    chatHTML(data, messageHTML, badges) {
        lineNum += 1

        return `
            <div ws-x="[p.l 4px] [grid] [gr.cols 60px 524px]" class="enter">
                <div ws-x="[t.a right] [t.lh 32px] [p.r 12px] [t.c #808790]">
                    ${lineNum}
                </div>
                <div ws-x="[t.c #d8dee9]">
                    <div ws-x="[z 10] [w max-content] [t.lh 32px] [h 32px]
                    [t.c ${data.tags.color}]">
                        <img src="https://cdn.frankerfacez.com/avatar/twitch/${data.tags.userID}"
                        ws-x="[w 32px] [h 32px] [r 50%]" class="avatar" />
                        ${data.tags.displayName} ${badges.join("")}
                    </div>
                    <div ws-x="[t.lh 28px] [p.l 30px]">
                        ${messageHTML}
                    </div>
                </div>
            </div>
        `
    }
}
