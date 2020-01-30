import mongoose from 'mongoose';
import express from 'express';
import bodyParser from "body-parser";

import {UserController, DialogController} from "./controllers";

const app = express();

const User = new UserController();
const Dialog = new DialogController();

app.use(bodyParser.urlencoded({extended: false}));//multipart form data для форми
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

//User
app.get('/user/:id', User.show);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create);
//Dialogs
app.get('/dialogs/:id', Dialog.index);
app.post('/dialogs', Dialog.create);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});