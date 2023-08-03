require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');
const User = require('./models/users');
const userRouter = require('./routes/userRoute');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT, PATCH, DELETE');
    next();
});

//test route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//CRUD Routes
app.use('/users', userRouter);

// error handler
app.use((err, req, res, next) => {
    console.log('reached out')
    console.log(err)
    const status = err.status || 500;
    const message = err.errors[0].message || err;
    res.status(status).json({message});
})

//sync database
sequelize.sync().then(() => {
    console.log('Database connected')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(err => console.log(err));