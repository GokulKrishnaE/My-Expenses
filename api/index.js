import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { addEarning, addExpense, deleteExpense, getAllData, getAllEarnings, getCompareData } from './controllers/data-controller.js'
import { login } from './controllers/login-controller.js'
import { register } from './controllers/register-controller.js'
import { addCategory, createCategory, getCategories } from './controllers/categories-controller.js'
import { verifyToken, verifyTokenEmail } from './verification/verify.js'
import { addBook,deleteBook,getBooks } from './controllers/books-controller.js'

const app = express()
dotenv.config()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get('/api/',verifyTokenEmail,getAllData)
app.post('/api/compare/',verifyTokenEmail,getCompareData)
app.get('/api/getEarnigs/',verifyTokenEmail,getAllEarnings)
app.get('/api/categories/',verifyTokenEmail,getCategories)
app.post('/api/categories/add/',verifyTokenEmail,addCategory)
app.post('/api/categories/create/',verifyTokenEmail,createCategory)
app.post('/api/addExpense/',verifyTokenEmail,addExpense)
app.post('/api/addEarning/',verifyTokenEmail,addEarning)
app.delete('/api/deleteExpense/:id',verifyToken,deleteExpense)
app.post('/api/login/',login)
app.post('/api/register/',register)
app.post('/api/books/addbook',verifyTokenEmail,addBook)
app.get('/api/books/getBooks',verifyTokenEmail,getBooks)
app.delete('/api/books/deleteBook/:id',verifyToken,deleteBook)


app.listen('8800',()=>{
    console.log('runnning on 8800')
})