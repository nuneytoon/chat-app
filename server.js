require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', async (_req, res) => {
    try {
        const messages = await Message.find({})
        res.send(messages)
    } catch (error) {
        sendStatus(500)
        return console.error(error)
    }
})
app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body)
        await message.save()

        io.emit('message', req.body)
        res.sendStatus(200)
    } catch (error) {
        sendStatus(500)
        return console.error(error)
    }
})

io.on('connection', socket => {
    console.log('a user connected')
})

const dbConnect = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
}
dbConnect()
    .then(() => console.log('mongo db connected'))
    .catch(err => console.log('mongo db connection error', err))

server.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
