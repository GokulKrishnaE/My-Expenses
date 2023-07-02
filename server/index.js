import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { addEarning, addExpense, deleteEarning, deleteExpense, getAllData, getAllEarnings, getCompareData } from './controllers/data-controller.js'
import { login } from './controllers/login-controller.js'
import { register } from './controllers/register-controller.js'
import { addCategory, getCategories } from './controllers/categories-controller.js'
import { verifyToken, verifyTokenEmail } from './verification/verify.js'
import { addBook,deleteBook,deleteEarningBook,deleteExpenseBook,getBookDetails,getBookDetailsEarning,getBooks } from './controllers/books-controller.js'

const PORT = process.env.PORT ?? 8800
const app = express()
dotenv.config()


app.use(cors({origin: '*'}))
app.use(cookieParser())
app.use(express.json())

app.get('/api/',verifyTokenEmail,getAllData)
app.post('/api/compare/',verifyTokenEmail,getCompareData)
app.get('/api/getEarnigs/',verifyTokenEmail,getAllEarnings)
app.get('/api/categories/',verifyTokenEmail,getCategories)
app.post('/api/categories/add/',verifyTokenEmail,addCategory)
app.post('/api/addExpense/',verifyTokenEmail,addExpense)
app.post('/api/addEarning/',verifyTokenEmail,addEarning)
app.delete('/api/deleteExpense/:id',verifyToken,deleteExpense)
app.delete('/api/deleteEarning/:id',verifyToken,deleteEarning)
app.post('/api/login/',login)
app.post('/api/register/',register)
app.post('/api/books/addbook',verifyTokenEmail,addBook)
app.get('/api/books/getBooks',verifyTokenEmail,getBooks)
app.delete('/api/books/deleteBook/:id',verifyToken,deleteBook)
app.post('/api/books/getBookDetails/spending',verifyTokenEmail,getBookDetails)
app.post('/api/books/getBookDetails/earning',verifyTokenEmail,getBookDetailsEarning)
app.delete('/api/books/deleteExpense/:currentBookname',verifyTokenEmail,deleteExpenseBook)
app.delete('/api/books/deleteEarning/:currentBookname',verifyTokenEmail,deleteEarningBook)


app.listen(PORT,()=>{
    console.log(`runnning on ${PORT}`)
})