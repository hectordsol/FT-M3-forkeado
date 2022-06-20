// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let myId=1;
const server = express();
// to enable parsing of json bodies for post requests
 server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
    const {author, title, contents} = req.body;
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const newPost = {
         id: myId,
         author,
         title,
         contents
    }
    posts.push(newPost);
    myId++;
    res.json(newPost);
}
);

server.post('/posts/author/:author', (req, res) => {
    const { title, contents} = req.body;
    const {author} = req.params;
    if (!title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const newPost = {
         id: myId,
         author,
         title,
         contents
    }
    posts.push(newPost);
    myId++;
    res.json(newPost);
}
);
// get ---> /post?term=algo
server.get('/posts', (req, res) => {
    const { term } = req.query;
    if (term) {
        const filteredPosts = posts.filter(post => post.title.includes(term)
        || post.contents.includes(term));
        return res.json(filteredPosts);
    }
    //si no devuelve todos los posts
    res.json(posts);   
});

server.get('/posts/:author', (req, res) => {
    const {author} = req.params;
        const filteredPosts = posts.filter(post => post.author===author);
        if (filteredPosts.length === 0) {
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
        }
    res.json(filteredPosts);
});

server.get('/posts/:author/:title', (req, res) => {
    const {author, title} = req.params;
    const filteredPosts = posts.filter(post => post.author===author
        &&post.title===title);
    if (filteredPosts.length === 0) {
       return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
    res.json(filteredPosts);
});

server.put('/posts', (req, res) => {
    const { id, title , contents } = req.body;
    if (!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }        
    const post = posts.find(p => p.id ===id)
    if (!post) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con el id indicado"});
    }
    post.title = title;
    post.contents = contents;
    res.json(post);   
});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    if (!id ) {
        return res.status(STATUS_USER_ERROR).json({error: "Informa que falta el parámetro `id`"});
    }        
    const post = posts.find(p => p.id === id)
    if (!post) {
        return res.status(STATUS_USER_ERROR).json({error: "Informa que el `id` indicado no corresponde con un Post existente"});
    }
    //   posts.splice(posts.indexOf(post), 1);
    posts = posts.filter(p => p.id !== id);
    res.json({success: true});
});

server.delete('/author', (req, res) => {
    const { author } = req.body;
    if (!author ) {
        return res.status(STATUS_USER_ERROR).json({error: "Informa que falta la ruta `author`"});
    }        
    const postsAuthor = posts.filter(p => p.author === author)
    if (postsAuthor.length === 0) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    }

    res.json( postsAuthor);
});

module.exports = { posts, server };
