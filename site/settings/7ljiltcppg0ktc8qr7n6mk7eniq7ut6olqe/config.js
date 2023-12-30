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
    channel: "axel669",
    userID: "64263610",
    chatHTML(data, messageHTML, badges) {
        const sent = parseInt(data.tags.tmiSentTS)
        const border = borderColor(data.tags)

        return `
            <div ws-x="[b.l 4px solid ${border}] [gradient-bg]">
                <div ws-x="[z 10] [m.l 4px] [p 4px]
                [w max-content]">
                    <img src="https://cdn.frankerfacez.com/avatar/twitch/${data.tags.userID}"
                    ws-x="[w 32px] [h 32px]" />
                    <span ws-x="[name-style ${data.tags.color}]">
                        ${data.tags.displayName} ${badges}
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
