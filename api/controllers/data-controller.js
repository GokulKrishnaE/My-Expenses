import pool from '../db.js'
import {v4 as uuidv4} from 'uuid'

export const getAllData = async (req,res) =>{
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM EXPENSES WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const getAllEarnings = async (req,res) =>{
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM EARNINGS WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

export const addExpense = async (req,res) =>{
    const id = uuidv4()
    const userEmail = req.email
    const title = req.body.title
    const category = req.body.category || 'food'
    const date = req.body.date
    const amount = req.body.amount
    const month = req.body.month
    const year = req.body.year
    try{
        const data = await pool.query(`INSERT INTO EXPENSES(id,email,title,category,date,amount,month,year) VALUES('${id}','${userEmail}','${title}','${category}','${date}','${amount}','${month}','${year}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const addEarning = async (req,res) =>{
    const id = uuidv4()
    const userEmail = req.email
    const title = req.body.title
    const category = req.body.category || 'food'
    const date = req.body.date
    const amount = req.body.amount
    const month = req.body.month
    const year = req.body.year
    try{
        const data = await pool.query(`INSERT INTO EARNINGS(id,email,title,date,month,year,amount) VALUES('${id}','${userEmail}','${title}','${date}','${month}','${year}','${amount}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

export const deleteExpense = async (req,res) =>{
    const id = req.params.id
    try{
        const data = await pool.query(`DELETE FROM EXPENSES WHERE id = '${id}'`)
        res.json({data:data.rows,status:true, details:'deleted'})
    }
    catch(err){
        console.error(err)
    }
}


// get data for comparison

export const getCompareData = async (req,res) =>{
    const userEmail = req.email
    const month = req.body.month
    const year = req.body.year
    try{
        const data = await pool.query(`SELECT * FROM EXPENSES WHERE EMAIL = '${userEmail}' and MONTH = '${month}' and YEAR = '${year}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
