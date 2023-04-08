import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { addExpense, deleteExpense, getAllData } from './controllers/data-controller.js'
import { login } from './controllers/login-controller.js'
import { register } from './controllers/register-controller.js'

const app = express()
dotenv.config()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get('/api/:userEmail',getAllData)
app.post('/api/addExpense/:userEmail',addExpense)
app.delete('/api/deleteExpense/:id',deleteExpense)
app.post('/api/login/',login)
app.post('/api/register/',register)


app.listen('8800',()=>{
    console.log('runnning on 8800')
})