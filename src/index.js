import { Telegraf, } from 'telegraf';
import { config } from 'dotenv'
import { helpMessage } from './utils/extra.js';
import client from './utils/opnsea.js';
import helper from './utils/helper.js';
config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err, ctx) => {
    console.log(`Opps,encountered an error for ${ctx.updateType}`, err);
});

bot.use(Telegraf.log());

bot.telegram.setMyCommands([
    {
        command: 'start',
        description: 'Start the bot'
    },
    {
        command: 'greet',
        description: 'For greeting'
    },
    {
        command: 'status',
        description: 'To know the status of the bot'
    },
]);

bot.start((ctx) => {
    ctx.replyWithHTML(helpMessage);
});

bot.on('text', (ctx) => {
    if (ctx.message.text.toLowerCase() === 'hi') {
        ctx.replyWithHTML(`Hey <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>,how are you doing 🐵?`)
    }
});

bot.command('greet', (ctx) => ctx.reply('Hello,How can I help you?'));

bot.command('status', (ctx) => ctx.reply('I am online and ready to assist you.'));



client.onItemListed("*", async (event) => {
    const { event_type, payload: { collection: { slug }, item: { permalink }, payment_token: { name, symbol } } } = event;
    const message = await helper({ event_type, slug, permalink, name, symbol });
    await bot.telegram.sendMessage('1149670956', message, { parse_mode: 'HTML' });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
process.on('exit', (message) => `Exit, status code: ${message}`);