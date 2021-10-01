const express = require('express');
const app = express();
const db = require('./models')
app.get('/', (req, res) => {
    res.send('API is up')
})


db.sequelize.sync().then((result) => {
    app.listen(3000, () => {
        console.log('Server started');
    })
}).catch((err) => {
    console.log(err);
})