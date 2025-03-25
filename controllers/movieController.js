
import connection from '../data/db.js'

//index

function index(req, res) {

    const sql = 'SELECT * FROM movies'
    
    connection.query( sql, (err,results) => {
        if(err) return res.status(500).json({
            error : 'database error'
        })

        // res.json(results)
        
        console.log(req.ImagePath)

        const movies = results

        movies.map((movie) => {
            return{
            ...movie,
            image: req.ImagePath + movie.image,
            }
        })

        res.json(movies)
    } )

}

//show

function show(req, res) {

    const {id} = req.params

    const movieSql = 'SELECT * FROM movies WHERE id = ?'

    const reviewSql = 'SELECT * FROM reviews WHERE id = ?'
    
    connection.query( movieSql, [id], (err,movieResults) => {
        if (err) return res.status(500).json({
            error : 'database error'
        })

        if (movieResults.length === 0 ) return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'film non trovato'
        })

        const movie = movieResults[0]

        connection.query(reviewSql, [id], (err,reviewsResults) => {
            if (err) 
                return res.status(500).json({
                error : 'database error'
            })
            
            movie.reviews = reviewsResults[0]
            // res.json(moovie)

            res.json({
                ...movie,
                image: req.ImagePath + movie.image,
            })
        })

        
    } )
}

//destroy

function destroy(req, res) {
    
    const {id} = req.params

    const sql = 'DELETE FROM movies WHERE id = ?'
    
    connection.query( sql, [id], (err) => {
        if(err) return res.status(500).json({
            error : 'database error destroy'
        })

        res.sendStatus(204)
    } )

}

// esportiamo tutto
export { index, show, destroy }

