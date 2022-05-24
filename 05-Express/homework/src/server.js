// const bodyParser = require("body-parser");
const express = require("express");


const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.get('/',function(req,res){
    let saludo= {
       saludito:'Helooooooooo!!!'+ req.body.name,
    }
    res.json(saludo);
});

server.post('/posts', function(req, res){
    if (req.body.author&&req.body.title&&req.body.contents){
        let idPlus=0;
        let Post= {
            id: idPlus++,
            author: req.body.author,
            title:req.body.title,
            contents:req.body.contents,
        }
        posts.push(Post);
        res.json(Post); 
    }
    else {
        res.status(STATUS_USER_ERROR).json({
            error:'No se recibieron los parámetros necesarios para crear el Post'
    })}
    
});

server.post('/posts/author/:author',function(req,res){
        
            if(req.params.author&&req.body.title&&req.body.contents){
                let idPlus=0;
                    let Post= {
                        id: idPlus++,
                        author:req.params.author,
                        title:req.body.title,
                        contents:req.body.contents
                    }
                posts.push(Post);
                res.json(Post);
            }
            else{
                res.status(STATUS_USER_ERROR).json({
                    error:'No se recibieron los parámetros necesarios para crear el Post'
                })
            }    
});

server.get('/posts', function(req,res){
    let condicion
    if(req.query.term){
         condicion=posts.filter((Post)=>Post.title.includes(req.query.term)||Post.contents.includes(req.query.term)) 
    }
    res.json(condicion);
});

server.get('/posts/:author',function(req,res){
    let post=posts.filter((Post)=>Post.author.includes(req.params.author))
    if(post.length){
        res.json(post)
    }
    else{
        res.status(STATUS_USER_ERROR).json({
            error:'No existe el autor indicado'
        })
    }
});

server.get('/posts/:author/:title', function(req,res){
    let match=posts.filter((Post)=>Post.author===req.params.author&&Post.title===req.params.title)

    if(match.length){
        res.json(match)
    }
    else{
        res.status(STATUS_USER_ERROR).json({
            error:'No existe ningun post con dicho titulo y autor indicado'
        })
    }
});

server.put('/posts', function(req,res){

    if(req.body.id&&req.body.title&&req.body.contents){
        let match=posts.find((Post)=>Post.body.id===req.body.id)
        //let filtrado=match.filter((e)=>e.id=req.body.id)
        if(match){
                    let Post= {
                        author:req.body.author,
                        title:req.body.title,
                        contents:req.body.contents
                    }            
            res.json(Post)
        }
        else{
            res.status(STATUS_USER_ERROR).json({
                error:'El id indicado no corresponde con un Post existente'
            })
        } 
        
    }
    else{
        res.status(STATUS_USER_ERROR).json({
            error:'El id indicado no corresponde con un Post existente'
        })
    }   
});

server.delete('/posts', function(req,res){
    res.json({success: true});
    res.status(STATUS_USER_ERROR).json({error:'No se pudo eliminar el post'});
});

server.delete('/author', function(req,res){
    res.status(STATUS_USER_ERROR).json({error:'No se pudo eliminar el author'});
});

// post, get, put, head, delete
module.exports = { posts, server };
