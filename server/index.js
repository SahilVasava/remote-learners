require('dotenv').config();
const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const client = require('./routes/twitch-bot')
const tbotRun = require('./routes/twitch-bot1')

const app = express()


//Connect to Twitch:
client.connect().catch(console.error);
//tbotRun();

// Middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json('Got it')
})

app.listen(process.env.port || 3000, () => {
    console.log(`Listening`);
});

