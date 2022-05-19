var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer(function(req,res){
        if(req.url === '/'){
            res.writeHead(200,{'Content-Type':'text/plain'})
            res.end('Escribe un URL valido')
        }
        else if(req.url){
            res.writeHead(200, { 'Content-Type':'image/jpg' })
        const img = fs.readFileSync(`${__dirname}/images${req.url}.jpg`);
        res.end(img);
        }
        else{
            res.writeHead(404)
            res.end('*404 NOT FOUND*')
        }

}).listen(1337, console.log('procesando'));

