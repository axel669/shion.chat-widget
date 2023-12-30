export const onRequestGet = async ({ request, next, params }) => {
    const nextRes = await next()
    const sourceHTML = await nextRes.text()

    return new Response(
        sourceHTML.replace(/\$\[id\]/g, params.settingsID),
        { headers: { "Content-Type": "text/html" } }
    )
    // console.log(await nextRes.text())
    // return nextRes
}
