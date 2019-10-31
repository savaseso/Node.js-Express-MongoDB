const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')

//descriptio: get all bootcamps
// @route GET  api/v1/bootcamps
//@access public
exports.getBootcamps = async (req, res, next) => {   
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({success:true,count:bootcamps.length, data:bootcamps})
    } catch (err) {
        next(err)
    }
}
//descriptio: get single bootcamps
// @route GET  api/v1/bootcamps/:id
//@access public
exports.getBootcamp = async (req, res, next) => {   
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp){
           return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({success:true, data:bootcamp})
    } catch (err) {
/*         res.status(400).json({success:false})
 */    
        next(err)
}
}
//descriptio: create new bootcamp
// @route POST  api/v1/bootcamps/
//@access Private need a token
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
         console.log(req.body)   
         res.status(201).json({
             success:true,
             data:bootcamp
         })
    } catch (err) {
        next(err)
    }
}
//descriptio: update  bootcamp
// @route PUT  api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = async (req, res, next) => {   
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({ success: true, data:bootcamp })
    } catch(err){
        next(err)
    }
 
}
//descriptio: delete  bootcamp
// @route DELETE  api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = async (req, res, next) => { 
    try{  
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
    }
    res.status(200).json({ success: true, data:{} })
} catch (err){
    next(err)    
}
}