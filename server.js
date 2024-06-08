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

app.get('/messages', async (req, res) => {
    const messages = await Message.find({}).catch(_err => sendStatus(500))
    res.send(messages)
})
app.post('/messages', async (req, res) => {
    const message = new Message(req.body)
    await message.save().catch(_err => sendStatus(500))

    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', socket => {
    console.log('a user connected')
})

const dbConnect = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
}
dbConnect().catch(err => console.log('mongo db connection error', err))

server.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
