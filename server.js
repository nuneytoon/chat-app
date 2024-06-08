const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' },
]

app.get('/messages', (req, res) => {
    res.send(messages)
})
app.post('/messages', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', socket => {
    console.log('a user connected')
})

server.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
