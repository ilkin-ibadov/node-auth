import express from 'express';
import EventEmitter from 'events';

const emitter = new EventEmitter()

const app = express()

app.use(express.json())

emitter.on("userLogin", (username) => {
    console.log(`User with username: ${username} has logged in`)
})

app.get("/todos", (req, res) => {
    res.status(200).json({ message: "Todo GET method successfull" })
})

app.post("/todos/add", (req, res) => {
    res.status(201).json({ message: "Todo POST method successfull" })
})

app.post("/auth/login", (req, res) => {
    const username = req.body.username
    emitter.emit("userLogin", username)
    res.status(201).json({ message: "User logged in" })
})

app.put("/todos/edit/:id", (req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(404).json({ message: "Todo ID not found" })
    }
    res.status(201).json({ message: "Todo PUT method successfull" })
})

app.delete("/todos/delete/:id", (req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(404).json({ message: "Todo ID not found" })
    }
    res.status(201).json({ message: "Todo DELETE method successfull" })
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})