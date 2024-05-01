const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;

router.post('/login', (req, res) => {
    const { username, password } = req.body

    // Check if username or password is empty
    if (!username || !password) {
        res.status(400).send({'message':'Username or Password empty'})
        return
    }

    // Load data from json file
    const datas = require('./datas.json')
    
    // Filter data by querying username
    const activeAccount = datas['account'].filter((data) => {
        return data['username'] === username
    })
    
    // Check if there are data that fullfil the filter criteria
    if (activeAccount.length === 0) {
        res.status(400).send({'message':'Username not found'})
        return
    }

    // Validate password hash
    bcrypt.compare(password, activeAccount[0]['password'], (err, result) => {
        if (!result) {
            res.status(400).send({'message':'Wrong username and password combination'})
            return
        }

        res.status(200).send({
            'message': 'Login success',
            'id': activeAccount[0]['id']
        })
    })
})

module.exports = router