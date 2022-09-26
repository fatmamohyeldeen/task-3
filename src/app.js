const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose')

app.use(express.json())

const userRouter = require('./routers/user')
const newsRouter = require('./routers/news')
app.use(userRouter)
app.use(newsRouter)

app.listen(port, () => {
    console.log('Server is running')
})


//////////////////////////////////////////////////////////////////////

const bcryptjs = require('bcryptjs')
const passwordFunction = async() => {
    const password = '@123t456'
    const hashedPassword = await bcryptjs.hash(password, 8)
    console.log(hashedPassword)

    const compare = await bcryptjs.compare('@123t456', hashedPassword)
    console.log(compare)
}
passwordFunction()



///////////////////////////////////////////////////////////////////////

const jwt = require('jsonwebtoken')
const myToken = () => {

    const token = jwt.sign({ _id: '123' }, 'secretKey')
    console.log(token)

    const tokenVerify = jwt.verify(token, 'secretKey')
    console.log(tokenVerify)
}
myToken()