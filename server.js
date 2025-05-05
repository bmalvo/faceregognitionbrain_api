import express from'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profileGet.js';
import handleImage from './controllers/image.js';

const db =knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'smart-brain',
  },
});

db.select('name').from('users').then(data => {
    console.log(data)});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success!')
})

app.post('/signin', (req, res) => {
    handleSignin(req, res, db, bcrypt)
});

app.post('/register', (req, res) => {
    handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
    handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
    handleImage(req,res, db)
})

app.listen(3000, () => {

    console.log('app is running on port 3000')
});

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST = user
/profile/:iserId --> GET = user 
/image --> PUT --> user
*/