import pool from '../db.js'
import {v4 as uuidv4} from 'uuid'

export const getAllData = async (req,res) =>{
    let categoriesArray = []
    const addedCategories = []
    let legendArray = []
    const SpendChartData= []
    let totalAmount = 0
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM "EXPENSES" WHERE EMAIL = '${userEmail}'
        `)
        const expenseData = data.rows
        expenseData.forEach((expense)=>{
            addedCategories.indexOf(expense.category) === -1 && addedCategories.push(expense.category)
        })
        addedCategories.forEach((category,index) =>{
            categoriesArray.push({
                categoryName: category,
                value: 0
            })
            expenseData.forEach(expense =>{
                if(categoriesArray[index].categoryName == expense.category){
                    categoriesArray[index].value += expense.amount
                }
            })
            SpendChartData.push(categoriesArray[index].value)
            let legends={
                legend: categoriesArray[index].categoryName,
                value: categoriesArray[index].value
            }
            legendArray.push(legends)
        })
        expenseData.forEach(expense =>{
            totalAmount+=expense.amount
        })
        res.json({expenseData: expenseData,categoriesArray:categoriesArray,SpendChartData:SpendChartData,legendArray:legendArray,totalAmount:totalAmount})
    }
    catch(err){
        console.error(err)
    }
}
export const getAllEarnings = async (req,res) =>{
    const earnChartData=[]
    let totalEarnigs = 0
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM "EARNINGS" WHERE EMAIL = '${userEmail}'
        `)
        const earningsData = data.rows
        earningsData.forEach(earning =>{
            totalEarnigs+=earning.amount
        })  
        earningsData.forEach((earning)=>{
            let data = {
                data:earning.amount,
                legend: earning.title
            }
            earnChartData.push(data)
        })  
        res.json({earningsData:earningsData,earnChartData:earnChartData,totalEarnigs:totalEarnigs})
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
    const bookname = req.body.bookname
    try{
        const data = await pool.query(`INSERT INTO "EXPENSES"(id,email,title,category,date,amount,month,year,bookname) VALUES('${id}','${userEmail}','${title}','${category}','${date}','${amount}','${month}','${year}','${bookname}')`)
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
    const bookname = req.body.bookname
    try{
        const data = await pool.query(`INSERT INTO "EARNINGS"(id,email,title,date,month,year,amount,bookname) VALUES('${id}','${userEmail}','${title}','${date}','${month}','${year}','${amount}','${bookname}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

export const deleteExpense = async (req,res) =>{
    const id = req.params.id
    try{
        const data = await pool.query(`DELETE FROM "EXPENSES" WHERE id = '${id}'`)
        res.json({data:data.rows,status:true, details:'deleted'})
    }
    catch(err){
        console.error(err)
    }
}
export const deleteEarning = async (req,res) =>{
    const id = req.params.id
    try{
        const data = await pool.query(`DELETE FROM "EARNINGS" WHERE id = '${id}'`)
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
        const data = await pool.query(`SELECT * FROM "EXPENSES" WHERE EMAIL = '${userEmail}' and MONTH = '${month}' and YEAR = '${year}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
