const express = require('express')
const router = express.Router()
const Task = require('../models/news')
const auth = require('../middelware/auth')


/////////////////////////////////////////////////////////////////
//post
router.post('/neww', auth, async(req, res) => {
    try {
        console.log(req.user)
        const event = new event({...req.body, userName: req.user.name })
        await event.save()
        res.send(event)
    } catch (e) {
        res.send(e.message)
    }
})

// get 

router.get('/news', auth, async(req, res) => {
    try {
        const event = await event.find({})
        res.send(event)
    } catch (e) {
        res.send(e.message)
    }
})


//patch
///////////////////////////////////////////////////
router.patch('/news/:id', auth, async(req, res) => {
        try {
            const updates = Object.keys(req.body)
            const _id = req.params.id
            const event = await event.findById(_id)
            if (!event) {
                return res.send('Not found')
            }
            updates.forEach((el) => event[el] = req.body[el])
            await event.save()
            res.send(event)
        } catch (e) {
            res.send(e.message)
        }
    })
    //delete
router.delete('/news/:id', auth, async(req, res) => {
    try {
        const event = await event.findByIdAndDelete(req.params.id)
        if (!event) {
            return res.send('Not found')
        }
        res.send(event)
    } catch (e) {
        res.send(e.message)
    }

})

module.exports = router