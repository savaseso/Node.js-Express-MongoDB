
//desc logs request to console 
const logger = (req, res, next) => {
    req.hello = 'HelloWorld'
    console.log(`${req.method}${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}


module.exports = logger;