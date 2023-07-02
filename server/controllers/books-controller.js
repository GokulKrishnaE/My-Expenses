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
        let booksData = {}
        if(data.rows.length){
            booksData = {books:data.rows, firstbookName:data.rows[0].bookname}
        }
        else{
            booksData = {books:data.rows}
        }
        res.json(booksData)
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


// get data for a particular book
export const getBookDetails = async (req,res) =>{
    let spendingCategoriesArray = []
    const spendingCategories = []
    let legendArray = []
    const SpendChartData= []
    let spendingTotalAmount = 0
    const userEmail = req.email
    const bookname = req.body.bookname
    try{
        const data = await pool.query(`SELECT * FROM EXPENSES WHERE EMAIL = '${userEmail}' and BOOKNAME = '${bookname}'
        `)
        const bookDetailsData = data.rows
        bookDetailsData.forEach((spending)=>{
            spendingCategories.indexOf(spending.category) === -1 && spendingCategories.push(spending.category)
        })
        spendingCategories.forEach((category,index) =>{
            spendingCategoriesArray.push({
                categoryName: category,
                value: 0
            })
            bookDetailsData.forEach(spending =>{
                if(spendingCategoriesArray[index].categoryName == spending.category){
                    spendingCategoriesArray[index].value += spending.amount
                }
            })
            SpendChartData.push(spendingCategoriesArray[index].value)
            let legends={
                legend: spendingCategoriesArray[index].categoryName,
                value: spendingCategoriesArray[index].value
            }
            legendArray.push(legends)
        })
        bookDetailsData.forEach(expense =>{
            spendingTotalAmount+=expense.amount
        })
        res.json({bookDetailsData:bookDetailsData,spendingCategoriesArray:spendingCategoriesArray,SpendChartData:SpendChartData,spendingTotalAmount:spendingTotalAmount})
    }
    catch(err){
        console.error(err)
    }
}
export const getBookDetailsEarning = async (req,res) =>{
    const earnChartData=[]
    let totalEarnigs = 0
    const userEmail = req.email
    const bookname = req.body.bookname
    try{
        const data = await pool.query(`SELECT * FROM EARNINGS WHERE EMAIL = '${userEmail}' and BOOKNAME = '${bookname}'
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

export const deleteExpenseBook = async (req,res) =>{
    console.log('delete book expense')
    const currentBookname=  req.params.currentBookname
    try{
        const data = await pool.query(`DELETE FROM EXPENSES WHERE BOOKNAME = '${currentBookname}'`)
        res.json({data:data.rows,status:true, details:'deleted'})
    }
    catch(err){
        console.error(err)
    }
}
export const deleteEarningBook = async (req,res) =>{
    console.log('delete book earning')
    const currentBookname=  req.params.currentBookname
    try{
        const data = await pool.query(`DELETE FROM EARNINGS WHERE BOOKNAME = '${currentBookname}'`)
        res.json({data:data.rows,status:true, details:'deleted'})
    }
    catch(err){
        console.error(err)
    }
}
