import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import cors from "cors";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
const PORT=5000;
app.set("view engine", "ejs");
const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.render("index");
})

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    socket.on('edit', (content) => {
        // console.log(content);
        io.emit('updateContent', content);
    });

    socket.on('bold', (bold) => {
        io.emit('updateStyleBold', bold);
    })

    socket.on('italic', (italic) => {
        io.emit('updateStyleItalic', italic);
    })

    socket.on('underline', (underline) => {
        io.emit('updateStyleUnderline', underline);
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


httpServer.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
})