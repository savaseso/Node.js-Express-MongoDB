const Bootcamp = require('../models/Bootcamp')

//descriptio: get all bootcamps
// @route GET  api/v1/bootcamps
//@access public
exports.getBootcamps = async (req, res, next) => {   
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({success:true,count:bootcamps.length, data:bootcamps})
    } catch (err) {
        res.status(400).json({success:false})
    }
}
//descriptio: get single bootcamps
// @route GET  api/v1/bootcamps/:id
//@access public
exports.getBootcamp = async (req, res, next) => {   
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp){
            res.status(400).json({success:false})
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
        res.status(400).json({success:false})
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
            return res.status(400).json({success:false})
        }
        res.status(200).json({ success: true, data:bootcamp })
    } catch(err){
        res.status(400).json({success:false})
    }
 
}
//descriptio: delete  bootcamp
// @route DELETE  api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = async (req, res, next) => { 
    try{  
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
        return res.status(400).json({success:false})
    }
    res.status(200).json({ success: true, data:{} })
} catch (err){
    res.status(400).json({success:false})
}
}