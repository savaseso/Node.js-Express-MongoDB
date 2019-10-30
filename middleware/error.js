const errorHandler = (err, req, res, next) =>{
  /*   if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err }) */

    res.status(500).json({
        success:false,
        error:err.message
    })
  }

  module.exports = errorHandler