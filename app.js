import 'dotenv/config'

import express from 'express'

const app = express()

const port = process.env.SERVER_PORT || 3005;

import cors from 'cors'

import movieRouter from './routers/movieRouter.js'

import ImagePath from './middlewares/imagePath.js';

app.use(cors({
    origin : process.env.FRONTEND_APP,
}))

app.use(express.static('../public'));

app.use(express.json())


app.use("/movies", movieRouter)

app.use( ImagePath )


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

