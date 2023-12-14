class AppMiddleware {
    static logRequests(req, res, next) {
        console.debug('AppMiddleware.logRequests');
        console.log(`${req.method} ${req.url} ${req.path}`);
        next();
    }

    static notFound(req, res) {
        console.debug('AppMiddleware.notFound');
        console.warn(`${req.path} 404`);
        res.status(404);
        res.redirect('/img/404.png');
    }

    static errorHandler(err, req, res, next) {
        console.debug('AppMiddleware.errorHandler');
        console.error(err.stack)
        res.status(500).end(`Error : ${err.message}`)
    }
}

module.exports = AppMiddleware;
