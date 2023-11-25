import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { helpMessage } from './utils/extra.js';
import client from './utils/opnsea.js';
import helper from './utils/helper.js';

config();

/**
 * Represents the Telegraf bot instance.
 *
 * @type {Telegraf}
 */
const bot = new Telegraf(process.env.BOT_TOKEN);

/**
 * Handles errors encountered by the bot and logs them.
 *
 * @event Telegraf#error
 * @param {Error} err - The error encountered.
 * @param {Telegraf.Context} ctx - The context in which the error occurred.
 */
bot.catch((err, ctx) => {
    console.log(`Opps, encountered an error for ${ctx.updateType}`, err);
});

/**
 * Logs incoming updates to the bot.
 *
 * @event Telegraf#log
 * @param {Telegraf.Context} ctx - The context of the incoming update.
 */
bot.use(Telegraf.log());

/**
 * Sets the commands for the bot.
 *
 * @method
 * @param {Object[]} commands - An array of command objects.
 * @param {string} commands[].command - The command trigger.
 * @param {string} commands[].description - The description of the command.
 */
bot.telegram.setMyCommands([
    {
        command: 'start',
        description: 'Start the bot',
    },
    {
        command: 'greet',
        description: 'For greeting',
    },
    {
        command: 'status',
        description: 'To know the status of the bot',
    },
]);

/**
 * Responds with a help message when the bot is started.
 *
 * @event Telegraf#start
 * @param {Telegraf.Context} ctx - The context of the start event.
 */
bot.start((ctx) => {
    ctx.replyWithHTML(helpMessage);
});

/**
 * Responds with a greeting when the user sends "hi".
 *
 * @event Telegraf#text
 * @param {Telegraf.Context} ctx - The context of the text event.
 */
bot.on('text', (ctx) => {
    if (ctx.message.text.toLowerCase() === 'hi') {
        ctx.replyWithHTML(`Hey <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>, how are you doing 🐵?`);
    }
});

/**
 * Responds to the "greet" command with a greeting message.
 *
 * @event Telegraf#command
 * @param {Telegraf.Context} ctx - The context of the command event.
 */
bot.command('greet', (ctx) => ctx.reply('Hello, how can I help you?'));

/**
 * Responds to the "status" command with the bot's status message.
 *
 * @event Telegraf#command
 * @param {Telegraf.Context} ctx - The context of the command event.
 */
bot.command('status', (ctx) => ctx.reply('I am online and ready to assist you.'));

/**
 * Listens for the "itemListed" event from the OpenSeaStreamClient and sends a message using the helper function.
 *
 * @event OpenSeaStreamClient#itemListed
 * @param {string} event - The type of the event.
 * @param {Object} event.payload - The payload of the event.
 * @param {Object} event.payload.collection - The collection details.
 * @param {string} event.payload.collection.slug - The slug for the collection name.
 * @param {Object} event.payload.item - The item details.
 * @param {string} event.payload.item.permalink - The permalink for the item.
 * @param {Object} event.payload.payment_token - The payment token details.
 * @param {string} event.payload.payment_token.name - The payment token name.
 * @param {string} event.payload.payment_token.symbol - The symbol associated with the payment token.
 */
client.onItemListed("*", async (event) => {
    const { event_type, payload: { collection: { slug }, item: { permalink }, payment_token: { name, symbol } } } = event;
    const message = await helper({ event_type, slug, permalink, name, symbol });
    await bot.telegram.sendMessage(process.env.USER_ID, message, { parse_mode: 'HTML' });
});

/**
 * Launches the bot.
 *
 * @method
 */
bot.launch();

/**
 * Handles the SIGINT signal to stop the bot.
 *
 * @event process#SIGINT
 */
process.once('SIGINT', () => bot.stop('SIGINT'));

/**
 * Handles the SIGTERM signal to stop the bot.
 *
 * @event process#SIGTERM
 */
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/**
 * Handles the exit event and logs the exit status code.
 *
 * @event process#exit
 * @param {string} message - The exit message.
 * @returns {string} The formatted exit message.
 */
process.on('exit', (message) => `Exit, status code: ${message}`);
