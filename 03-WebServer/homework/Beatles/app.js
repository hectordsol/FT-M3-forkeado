var http = require('http');
var fs   = require('fs');

var beatles=[{
  id: 1,
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  id: 2,
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  id: 3,
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  id: 4,
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http
.createServer(function(req,res){
  if(req.url.includes==='/api/'){
    var name= req.url.slice(5);
  }
  else{
    var name= req.url.slice(1);
  }
  const replace= name.replace('%20',' ')
  const members= beatles.find((e)=>e.name===replace);
  

  if (req.url==='/'){
    res.writeHead(200,{'Content-Type':'text/html'})
    var html = fs.readFileSync(__dirname +'/index.html');
    res.end(html)
  }
  else if (req.url==='/api'){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end(JSON.stringify(beatles))
  }
  else if (members&&req.url===`/api/${name}`){
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.end(JSON.stringify(members))
  }
  else if(req.url===`/${name}`){
    // res.writeHead(200,{'Content-Type':'text/plain'})
    var html = fs.readFileSync(__dirname +'/index.html','utf-8');
    html=html.replace('{name}',members.name)
    html=html.replace('{birthday}',members.birthdate)
    html=html.replace('{image}',members.profilePic)
    res.end(html)
  }
  else{
    res.writeHead(404,{'Content-Type':'text/plain'})
    res.end('404 NOT FOUND');
  }

}).listen(3001,()=> console.log('Server escuchando al puerto 3001'));
