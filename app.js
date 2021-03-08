const express =require("express")
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app)
const socketIO = require("socket.io")
const moment = require('moment')

const io = socketIO(server);

console.log(__dirname)

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`${PORT} server running`))

io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        const {name, message} = data;

        io.emit("chatting", {
            name,
            message,
            time: moment(new Date()).format("h:ss A")
        });
    })
})