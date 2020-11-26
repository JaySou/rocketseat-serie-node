const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('ok');
})

require('./src/app/controllers/index')(app);

app.listen(3000, console.log('servidor rodando na porta 3000'));
