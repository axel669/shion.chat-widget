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

const [bttvUserEmotes, bttvGlobalEmotes, sevtvUserEmotes, ffzUserEmotes] =
    await Promise.all([
        fetch(`https://api.betterttv.net/3/cached/users/twitch/${ref.config.userID}`, { signal: AbortSignal.timeout(15000) })
            .then(async (res) => {
                if (res.ok === false) {
                    return []
                }
                const info = await res.json()
                return [...info.sharedEmotes, ...info.channelEmotes]
            })
            .catch(() => []),
        fetch("https://api.betterttv.net/3/cached/emotes/global", { signal: AbortSignal.timeout(15000) })
            .then(res => res.json())
            .catch(() => []),
        fetch(`https://7tv.io/v3/users/twitch/${ref.config.userID}`, { signal: AbortSignal.timeout(15000) })
            .then(async (res) => {
                if (res.ok === false) {
                    return []
                }
                const info = await res.json()
                return info.emote_set.emotes
            })
            .catch(() => []),
        fetch(`https://api.frankerfacez.com/v1/room/${ref.config.channel}`, { signal: AbortSignal.timeout(15000) })
            .then(async (res) => {
                if (res.ok === false) {
                    return []
                }
                const info = await res.json()
                return Object.values(info.sets).map(set => set.emoticons).flat()
            })
            .catch(() => [])
    ])

ref.externalEmotes = {}

for (const emote of ffzUserEmotes) {
    ref.externalEmotes[emote.name] = emote.urls["1"]
}

for (const emote of [...bttvGlobalEmotes, ...bttvUserEmotes]) {
    ref.externalEmotes[emote.code] =
        `https://cdn.betterttv.net/emote/${emote.id}/1x`
}

for (const emote of sevtvUserEmotes) {
    ref.externalEmotes[emote.name] =
        `https://cdn.7tv.app/emote/${emote.id}/${emote.data.host.files[0].name}`
}

ref.externalKeys = Object.keys(ref.externalEmotes)
