import pool from '../db.js'

export const getCategories = async (req,res) =>{
    const userEmail = req.email
    try{
        const data = await pool.query(`SELECT * FROM CATEGORIES WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const addCategory = async (req,res) =>{
    const userEmail = req.email
    const category = req.body.category
    try{
        const data = await pool.query(`UPDATE CATEGORIES SET CATEGORIES = array_append(CATEGORIES,'${category}') WHERE EMAIL = '${userEmail}'
        `)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}
export const createCategory = async (req,res) =>{
    const userEmail = req.email
    try{
        const data = await pool.query(`INSERT INTO CATEGORIES(EMAIL,CATEGORIES) VALUES('${userEmail}','{food,travel,accomodation,others}')`)
        res.json(data.rows)
    }
    catch(err){
        console.error(err)
    }
}

