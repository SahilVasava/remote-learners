const { Chat, ChatEvents } = require("twitch-js");

const username = process.env.BOT_USERNAME;
const token = process.env.OAUTH_TOKEN;
//const channel = process.env.CHANNEL_NAME;
const channel = 'sahil_vasava';

const run = async () => {
    const chat = new Chat({
        username,
        token
    });

    await chat.connect();
    await chat.join(channel);

    chat.on(ChatEvents.message, (message) => {
        // Do stuff ...
        console.log(message)
    });
};

module.exports = run;