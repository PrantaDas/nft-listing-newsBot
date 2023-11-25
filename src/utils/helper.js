
/**
 * Generates an HTML message for the "Item Listed" event.
 *
 * @async
 * @function helper
 * @param {Object} params - The parameters for generating the message.
 * @param {string} params.event_type - The type of the event.
 * @param {string} params.slug - The slug for the collection name.
 * @param {string} params.permalink - The permalink for the item.
 * @param {string} params.name - The payment token name.
 * @param {string} params.symbol - The symbol associated with the item.
 * @returns {Promise<string>} A promise that resolves with the generated HTML message.
 */
export default async function helper({ event_type, slug, permalink, name, symbol }) {
    return `
        <b>Item Listed</b>
        <code>Collectin name: ${slug}</code>
        <code>Payment Token: ${name}</code>
        <code>Symbol: ${symbol}</code>
        <a href="${permalink}">${permalink}</a>`
};