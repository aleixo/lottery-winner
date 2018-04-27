module.exports = class HttpError {
    get notFound() {
        return (req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
          }
    }

    get internalServerError() {
        return (err, req, res, next) => {    
            console.log(err)                
            res.status(err.status || 500).send({ cause: err.message });            
        }
    }
}