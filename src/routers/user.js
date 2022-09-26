const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middelware/auth')

//signUp
router.post('/signup', async(req, res) => {
        try {
            const user = new User(req.body)
            await user.save()
            const token = user.generateToken()
            res.send({ user, token })
        } catch (e) {
            res.send(e.message)
        }
    })
    // login

router.post('/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = user.generateToken()
        res.send({ user, token })
    } catch (e) {
        res.send(e.message)
    }
})

//get
//////////////////////////////////////////////////////////////////////

router.get('/profile', auth, (req, res) => {
        res.send(req.user)
    })
    ////////////////////////////////////////////////////////////////////




//update
router.patch('/user/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates) // ['name','age','password']
    try {
        const _id = req.params.id
            // bypass save
        const user = await User.findById(_id)
        console.log(user)
        if (!user) {
            return res.send('No user is found')
        }

        updates.forEach((el) => user[el] = req.body[el])
        await user.save()
        res.send(user)
    } catch (e) {
        res.send(e.message)
    }
})

// delete
router.delete('/user/:id', auth, async(req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.send('No user is found')
        }
        res.send(user)
    } catch (e) {
        res.send(e.message)
    }
})


module.exports = router