function endPointNotFound (req,res,next){
    res.status(404)
    res.json({
    error: "Not Found",
    message: "Pagina non trovata"
});
}


 module.exports = endPointNotFound
