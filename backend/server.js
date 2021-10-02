const express = require('express');
const app = express();
const db = require('./models')
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

require('./server/route')(app, router);

db.sequelize.sync().then((result) => {
    app.listen(5000, () => {
        console.log('Server started');
    })
}).catch((err) => {
    console.log(err);
})