import pool from '../db.js'
import Jwt from 'jsonwebtoken'

export const login = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    try{
        const data = await pool.query(`SELECT * FROM USERS WHERE USERNAME = '${username}' and PASSWORD = '${password}'`)
        if(data.rowCount !=0){
            const user = data.rows
            const token = Jwt.sign({email: user.email, isAdmin: user.isAdmin},process.env.ACCESS_TOKEN_SECRET)
            res.send({data: data,token: token, user: user})
        }
        else{
            res.send({error: 'User not found'})
        }
    }
    catch(err){
        console.error(err)
    }
}