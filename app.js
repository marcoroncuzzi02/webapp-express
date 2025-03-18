const express = require('express')
const app = express()
const port = 3001
const postRouter = require('./routers/postRouter');
const endPointMiddleware = require('./middlewares/endPointMiddleware')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.static('./public/imgs'));

app.use(express.json())

app.get('/', (req, res) => {
res.send('QUESTO è IL SERVER DEL BLOG')
})

app.use("/api/posts", postRouter)

app.use(endPointMiddleware)
app.use(errorHandler)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

