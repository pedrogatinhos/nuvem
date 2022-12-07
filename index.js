import { createServer } from "http";
import { createReadStream } from "fs";
import { create } from "domain";

const send = (res, status, type, file) =>{
    res.writeHead(status, {"Content-Type": type})
    createReadStream(file).pipe(res)
}

createServer((req, res) =>{
    switch(req.url) {
        case "/": return send(res, 200, "text/html", "./home-page.html")
    }
}).listen(8000)