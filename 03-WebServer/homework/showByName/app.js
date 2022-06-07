var http = require('http');
var fs   = require('fs');

http.createServer( function(req, res){ 
    fs.readFile(`${__dirname}/images/${req.url}.jpg`, function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } else {
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(data);
        }
    });
}).listen(1337, '127.0.0.1');	
