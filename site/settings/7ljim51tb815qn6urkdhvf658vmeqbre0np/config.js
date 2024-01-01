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
    channel: "satoryugdq",
    userID: "12600824",
    container: `
        <div id="chat-wrapper" ws-x="@theme:dark [font Inter] [chat-wrapper]">
            <img src="./images/hexbg.svg" ws-x="[disp none]" />
            <div id="chat-messages"
                ws-x="[flex] [gap 4px]">
            </div>
        </div>
    `,
    chatHTML(data, messageHTML, badges) {
        const sent = parseInt(data.tags.tmiSentTS)
        const border = borderColor(data.tags)

        return `
            <div ws-x="[message-bg] [t.sz 20px]" class="enter">
                <div ws-x="[z 10] [m.l 4px] [p 4px]
                [w max-content]">
                    <img src="https://cdn.frankerfacez.com/avatar/twitch/${data.tags.userID}"
                    ws-x="[w 32px] [h 32px]" />
                    <span ws-x="[name-style ${data.tags.color}] [b.c ${border}]">
                        ${data.tags.displayName} ${badges.join("")}
                    </span>
                    <!-- @ ${new Date(sent).toLocaleTimeString()} -->
                </div>
                <div ws-x="[p 4px] [t.lh 28px]">
                    ${messageHTML}
                </div>
            </div>
        `
    }
}