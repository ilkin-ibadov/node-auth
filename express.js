import express from 'express';

const app = express()

app.use(express.json())

app.get("/todos", (req, res) => {
    res.status(200).json({ message: "Todo GET method successfull" })
})

app.post("/todos/add", (req, res) => {
    res.status(201).json({ message: "Todo POST method successfull" })
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