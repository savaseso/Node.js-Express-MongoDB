//descriptio: get all bootcamps
// @route GET  api/v1/bootcamps
//@access public
exports.getBootcamps = (req, res, next) => {   
    res.status(200).json({ success: true, data: [{ name: 'bence', id: 1 }, { name: 'apa', id: 2 }] })
}
//descriptio: get single bootcamps
// @route GET  api/v1/bootcamps/:id
//@access public
exports.getBootcamp = (req, res, next) => {   
    res.status(200).json({ success: true, msg: `get bootcamp${req.params.id}` })
}
//descriptio: create new bootcamp
// @route POST  api/v1/bootcamps/
//@access public
exports.createBootcamp = (req, res, next) => {   
    res.status(200).json({ success: true, msg: 'create new bootcamp' })
}
//descriptio: update  bootcamp
// @route PUT  api/v1/bootcamps/:id
//@access public
exports.updateBootcamp = (req, res, next) => {   
    res.status(200).json({ success: true, msg: `ipdate bootcamp${req.params.id}` })
}
//descriptio: delete  bootcamp
// @route DELETE  api/v1/bootcamps/:id
//@access public
exports.deleteBootcamp = (req, res, next) => {   
    res.status(200).json({ success: true, msg: `delete bootcamp${req.params.id}` })
}