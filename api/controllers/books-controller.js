import pool from '../db.js'
import {v4 as uuidv4} from 'uuid'


export const addBook = async (req,res) =>{
    const userEmail = req.email
    const bookName = req.body.bookName
    const totalearning = req.body.totalearning
    const totalspending = req.body.totalspending
    const id = uuidv4()
    try{
        const data = await pool.query(`INSERT INTO BOOKS(id,email,bookname,totalearning,totalspending) VALUES('${id}','${userEmail}','${bookName}','${totalearning}','${totalspending}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const getBooks = async (req,res) =>{
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM BOOKS WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const deleteBook = async (req,res) =>{
    const id = req.params.id
    try{
        const data = await pool.query(`DELETE FROM BOOKS WHERE id = '${id}'`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
