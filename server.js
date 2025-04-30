import express from'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';


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

const database = {

    users: [
        {
            id: '1',
            name: 'Stefka2',
            email: 'stefka@cat.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Brydzie',
            email: 'brydzia@cat.com',
            password: 'candies',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    console.log(db.users)
    res.send(db.users)
})

app.post('/signin', (req, res) => {
    
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password
    )
    {    
        res.json('🚀')
    } else {
        res.status(400).json('error loggin in') 
    }
})

app.post('/register', (req, res) => {
    
    let pass =''
    const { email, name, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        // Store hash in your password DB
        console.log(hash)
        pass = hash
        // password = hash;
        db('users')
            .returning('*')
            .insert({
                email: email,
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            }).catch(err => res.status(404).json('unable to register'))
});

    // database.users.push({
    //         id: (database.users.length + 1).toString(),
    //         name: name,
    //         email: email,
    //         password: pass,
    //         entries: 0,
    //         joined: new Date()
    // })
}) 

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    console.log(req.params.id)
    // let found = false;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        // console.log(user)
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('error getting user')
        }
    })
        .catch(err => {
        res.status(400),json('not found')
    })

    // database.users.forEach(user => {

    //     if (user.id === id) {
            
    //         found = true;
    //         return res.json(user);
    //     } 
    // })
    // if (!found) {
        
    //     res.status(400).json('not found');
    // }
})

app.put('/image', (req, res) => {

    const { id } = req.body;
    console.log(req.params.id)
    let found = false;

    database.users.forEach(user => {

        if (user.id === id) {
            
            found = true;
            user.entries ++
            return res.json(user.entries);
        } 
    })
    if (!found) {
        
        res.status(400).json('not found');
    }
})

app.listen(3000, () => {

    console.log('app is running on port 3000')
})

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST = user
/profile/:iserId --> GET = user 
/image --> PUT --> user
*/