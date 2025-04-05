const express = require('express');

const app = express();

app.get('/', (req, res) => {

    res.send('this is working')
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