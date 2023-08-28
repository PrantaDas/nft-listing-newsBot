export default async function helper({ event_type, slug, permalink, name, symbol }) {
    return `
        <b>Item Listed</b>
        <code>Collectin name: ${slug}</code>
        <code>Payment Token: ${name}</code>
        <code>Symbol: ${symbol}</code>
        <a href="${permalink}">${permalink}</a>`
};