const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    REDIS_URL,
    SESSION_SECRET,
    REDIS_PORT
    } = require('./config/config');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});
console.log(REDIS_URL);
console.log(REDIS_PORT);
redisClient.connect().catch(console.error);
const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Connected to DB"))
    .catch( (e) => {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(
    session({
        store: new RedisStore({client: redisClient}), 
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 30000 
        } 
    })
);
app.use(express.json());


app.get('/', (req, res) => {
    res.send('<h2> Hell Yeah!!!</h2>')
});

//localhost:3000/api/v1/posts/
app.use('/api/v1/posts',postRouter);

app.use('/api/v1/users',userRouter);

const port = process.env.port || 3000

app.listen(port, () => console.log(`listening on port ${port}`))