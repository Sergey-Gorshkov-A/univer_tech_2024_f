import express from 'express';
import cors from 'cors'
import testRouter from './routers/testRouter/testRouter.js'
import postRouter from './routers/postRouter/postRouter.js'
import authRouter from './routers/authRouter/authRouter.js'
import userRouter from './routers/userRouter/userRouter.js'
import accountRouter from './routers/accountRouter/accountRouter.js'


const app = express()

const PORT = process.env.PORT || 3555

app.use(cors())
app.use(express.json())


app.use('/test/', testRouter)
app.use('/posts/', postRouter)
app.use('/auth/', authRouter)
app.use('/user/', userRouter)
app.use('/account/', accountRouter)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
  });