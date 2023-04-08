import pool from '../db.js'
import {v4 as uuidv4} from 'uuid'

export const getAllData = async (req,res) =>{
    const userEmail = req.params.userEmail
    try{
        const data = await pool.query(`SELECT * FROM EXPENSES WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

export const addExpense = async (req,res) =>{
    const id = uuidv4()
    const userEmail = req.params.userEmail
    const title = req.body.title
    const category = req.body.category || 'food'
    const date = req.body.date
    const amount = req.body.amount
    try{
        const data = await pool.query(`INSERT INTO EXPENSES(id,email,title,category,date,amount) VALUES('${id}','${userEmail}','${title}','${category}','${date}','${amount}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

export const deleteExpense = async (req,res) =>{
    const id = req.params.id
    try{
        const data = await pool.query(`DELETE FROM EXPENSES WHERE id = ${id}`)
        res.json({data:data.rows,status:true, details:'deleted'})
    }
    catch(err){
        console.error(err)
    }
}

