const tmi = require('tmi.js');
const botController = require('./botController');

// Define configuration options
const opts = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

// Create a client with our options
const client = new tmi.client(opts);



// Called every time a message comes in
const onMessageHandler = async (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim().split(" ");
    console.log(commandName)

    // If the command is known, let's execute it
    if (commandName[0] === '!remote') {
        switch (commandName[1]) {
            case 'task':
                const task = commandName.splice(2, commandName.length - 2).join(' ');
                const result = await botController.taskCreate({ title: task, done: false });
                client.say(target, `${result.title} task created`);
                break
            case 'show':
                break
            case 'done':
                break
            case 'undone':
                break
        }
        //client.say(target, `You miss me!`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}


// Called every time the bot connects to Twitch chat
const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

module.exports = client