const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb+srv://snake:S95es5Psb2n6xQ7P@snake.e8eodon.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const Score = mongoose.model('Score', { name: String, score: Number });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/leaderboard', async (req, res) => res.send(
    await Score.find({})
));

app.post('/leaderboard', async (req, res) => {
    const score = new Score({ name: req.body.name, score: req.body.score });
    score.save().then(() => console.log(score));
    res.send(score);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
