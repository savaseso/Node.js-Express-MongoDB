const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')
// load env vars

dotenv.config({path:'./config/config.env'})

//connect to the database
connectDB();


//route files

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')


const app = express();

//body parser
app.use(express.json())

/* app.use(logger)
 *///dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//File uploading

app.use(fileUpload());


//Set static folder

app.use(express.static(path.join(__dirname, 'public')))

//Mount routers

app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`listening${process.env.NODE_ENV}.`.yellow.bold))

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red.bold)
    //close server exit process
    server.close(()=> process.exit(1))
})