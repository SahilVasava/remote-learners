import tmi from 'tmi.js';
import botController from './botController';

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

const botTask = async (target, commandName, context) => {

    if (!commandName[2]) {
        client.say(target, `[Usage] !remote task <task-title>`);
        return;
    }
    const task = commandName.splice(2, commandName.length - 2).join(' ');
    const result = await botController.taskCreate({ title: task, done: false, twitchId: context['user-id'], username: context.username });
    client.say(target, `${result.title} task created`);
}

const botShow = async (target, commandName, context) => {
    const results = await botController.taskGetAll({ twitchId: context['user-id'] });
    let tArr = results.map(ob => `[${ob.id}: ${ob.done ? '✅' : '⬜'} ${ob.title}]`)
    //console.log(tArr)
    client.say(target, `Your tasks: \n${tArr.join('\n')} `);
}

const botDoneToggle = async (target, commandName, context, done) => {
    if (!commandName[2]) {
        client.say(target, `[Usage] !remote ${done ? 'done' : 'undone'} id`);
        return
    }
    const id = commandName[2];
    const updResult = await botController.taskUpdate({
        id, done, twitchId: context['user-id']
    });
    if (!updResult) {
        client.say(target, `Sorry! No task has been updated.`);
    } else {
        client.say(target, `Task has been updated.`);

    }
}

const botCommands = (target) => {
    let commands = `
        [!remote task <task-title>]
        [!remote show]
        [!remote done <task-id>]
        [!remote undone <task-id>]
        `
    client.say(target, `Remote Learner Commands: ${commands}`);

}

// Called every time a message comes in
const onMessageHandler = async (target, context, msg, self) => {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim().split(" ");

    // If the command is known, let's execute it
    if (commandName[0] === '!remote') {
        switch (commandName[1]) {
            case 'task':
                await botTask(target, commandNamem, context);
                break
            case 'show':
                await botShow(target, commandName, context);
                break
            case 'done':
                await botDoneToggle(target, commandName, context, true);
                break
            case 'undone':
                await botDoneToggle(target, commandName, context, false);
                break
        }
    } else if (commandName[0] === '!commands') {
        botCommands(target);
    }
}



// Called every time the bot connects to Twitch chat
const onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}: ${port} `);
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

module.exports = client