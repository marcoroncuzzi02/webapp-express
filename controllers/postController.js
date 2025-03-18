const posts = require('../data/postContent');

const connection = require('../data/db')

//index
function index(req, res) {
    // let filteredPosts = posts

    // if(req.query.tags){
    //     let filteredPosts = posts.filter(
    //         post => post.tags.includes(req.query.tags)
    //     )
    // }

    // res.json(filteredPosts);

    const sql = 'SELECT * FROM posts'
    
    connection.query( sql, (err,results) => {
        if(err) return res.status(500).json({
            error : 'database error'
        })

        res.json(results)
    } )

}
//show
function show(req, res) {
    
    // const post = posts.find(post => post.id === id);

    // if(!post){
    //     res.status(404)
    //     return res.json({
    //         error: "Not Found",
    //         message: "post non trovato"
    //     })
    // }

    // res.json(post);

    const {id} = req.params

    const sql = 'SELECT * FROM posts WHERE id = ?'
    
    connection.query( sql, [id], (err,results) => {
        if(err) return res.status(500).json({
            error : 'database error'
        })
        if (results.length === 0 ) return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'post non trovato'
        })

        res.json(results [0])
    } )
}
//store
function store(req, res) {

    // res.send('Creazione nuovo post');

    console.log(req.body)

    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost)

    console.log(posts)

    res.status(201)
    res.json(newPost)
}
//update
function update(req, res) {
    // res.send('Modifica integrale del post ' + req.params.id);

    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id);

    if(!post){
        
        res.status(404)

        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }

    post.id = req.body.id
    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    console.log(posts)

    res.json(post)

}
//modify
function modify(req, res) {
    res.send('Modifica parziale del post ' + req.params.id);
}
//destroy
function destroy(req, res) {
    // const id = parseInt(req.params.id)
    // const post = posts.find(post => post.id === id);

    // if(!post){
        
    //     res.status(404)

    //     return res.json({
    //         error: "Not Found",
    //         message: "post non trovato"
    //     })
    // }

    // posts.splice(posts.indexOf(post), 1)

    // res.sendStatus(204)
    const {id} = req.params

    const sql = 'DELETE  FROM posts WHERE id = ?'
    
    connection.query( sql, [id], (err) => {
        if(err) return res.status(500).json({
            error : 'database error'
        })

        res.sendStatus(204)
    } )

}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }

