const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/userdetails", { useNewUrlParser: true },{UnhandledPromiseRejection:true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("MongoDB runnning as well"))

app.use(express.json())

const usersRouter = require('./routes/users')

app.use('/', usersRouter);


app.listen(5000, () => {
    console.log("Server Started");
})