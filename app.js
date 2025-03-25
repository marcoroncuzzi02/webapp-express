import 'dotenv/config'

import express from 'express'

const app = express()

const port = process.env.SERVER_PORT || 3005;

import movieRouter from './routers/movieRouter.js'

import ImagePath from './middlewares/imagePath.js';

// const endPointMiddleware = require('./middlewares/endPointMiddleware')
// const errorHandler = require('./middlewares/errorHandler')

app.use(express.static('../public'));

app.use(express.json())

// app.get('/movies', (req, res) => {
// res.send('QUESTO è IL SERVER DI MOVIES')
// })

app.use("/movies", movieRouter)

app.use( ImagePath )
// app.use(endPointMiddleware)
// app.use(errorHandler)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

