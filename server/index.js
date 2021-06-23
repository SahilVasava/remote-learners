require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { twitchBot } = require('./controllers')
//const db = require('./db');

const app = express()


//Connect to Twitch:
twitchBot.connect().catch(console.error);

// Middlewares
app.use(morgan('tiny'));
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json('Got it')
})

app.listen(process.env.port || 3000, () => {
    console.log(`Listening`);
});

