const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
// load env vars

dotenv.config({path:'./config/config.env'})

//connect to the database
connectDB();


//route files

const bootcamps = require('./routes/bootcamps')


const app = express();


/* app.use(logger)
 *///dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



//Mount routers

app.use('/api/v1/bootcamps',bootcamps)


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`listening${process.env.NODE_ENV}`))

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`)
    //close server exit process
    server.close(()=> process.exit(1))
})