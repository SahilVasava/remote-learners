require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { twitchBot } = require('./controllers');
const taskRoute = require('./routes/task');
//const { Task, User } = require('./db');

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
app.use(cors());

//routes
app.use('/task', taskRoute);

app.get('/', (request, response) => {
    response.json('Got it')
})

app.listen(process.env.port || 4000, () => {
    console.log(`Listening`);
});

