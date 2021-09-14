const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


const multer = require("multer")
const upload = multer({
    dest: 'Images',
    limits:{
        filesize : 1000000 // in bytes
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)) //regex101.com
            return cb(new Error('please upload a word doc'))

            cb(undefined,true)
    }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{ //for handlng error 
    res.status(400).send({error: error.message})
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

