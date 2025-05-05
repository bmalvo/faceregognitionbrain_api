const profileGet = (req, res, db) => {

    const { id } = req.params;
    console.log(req.params.id)
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('error getting user')
        }
    })
        .catch(err => {
        res.status(400),json('not found')
    })
}

export default profileGet;
