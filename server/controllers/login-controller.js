import pool from '../db.js'
import Jwt from 'jsonwebtoken'


export const login = async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    console.log('test')
    try{
        const data = await pool.query(`SELECT * FROM "USERS" WHERE USERNAME = '${username}' and PASSWORD = '${password}'`)
        if(data.rowCount !=0){
            const user = data.rows
            const payload = {email:user[0].email}
            // const userData = {email: user.email, isAdmin: user.isAdmin}
            const token = Jwt.sign(payload,`${process.env.ACCESS_TOKEN_SECRET}`)
            res.send({token: token, user: user})
        }
        else{
            res.send({error: 'User not found'})
        }
    }
    catch(err){
        res.send({error: 'Something went wrong'})
    }
}