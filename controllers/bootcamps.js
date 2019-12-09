const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const geocoder = require('../utils/geocoder')

//descriptio: get all bootcamps
// @route GET  api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {   
        console.log(req.query)
        let query; 
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        query = Bootcamp.find(JSON.parse(queryStr));
        const bootcamps = await query;
        res.status(200).json({success:true,count:bootcamps.length, data:bootcamps})
})
//descriptio: get single bootcamps
// @route GET  api/v1/bootcamps/:id
//@access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {   
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp){
           return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({success:true, data:bootcamp})
})
//descriptio: create new bootcamp
// @route POST  api/v1/bootcamps/
//@access Private need a token
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body)
         console.log(req.body)   
         res.status(201).json({
             success:true,
             data:bootcamp
         })
})
//descriptio: update  bootcamp
// @route PUT  api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {   
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({ success: true, data:bootcamp })
})
//descriptio: delete  bootcamp
// @route DELETE  api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => { 
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404))
    }
    res.status(200).json({ success: true, data:{} })
})
//descriptio: get  bootcamps within a radius
// @route DELETE  api/v1/bootcamps/radius/:zipcode/:distance
//@access private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => { 
    const {zipcode, distance} = req.params
    //get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude
    //calc radius using radians
    //divide distance by radius of Earth
    //Earth Radius = 6378km
    const radius = distance / 6378;
    const bootcamps = await Bootcamp.find({
        location:{$geoWithin: {$centerSphere: [[ lng, lat], radius]}}
    })
    res.status(200).json({
        success:true,
        count:bootcamps.length,
        data:bootcamps
    })
})