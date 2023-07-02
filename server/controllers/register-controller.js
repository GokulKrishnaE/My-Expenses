import pool from '../db.js'

export const register = async (req,res) =>{
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    try{
        const checkUser = await  pool.query(`SELECT * from USERS WHERE email='${email}'`)
        if(checkUser.rowCount !=0){
            res.send({error: "email address is already registered",status: false,user: checkUser})
            return
        }
        else{
            const data = await pool.query(`INSERT INTO USERS(username,password,email,isAdmin) VALUES('${username}','${password}','${email}',false)`)
            if(data != undefined){
                const user = data.rows
                res.send({user: user, status: true})
            }
            else{
                res.send({error: "An error has been occured. Try again.",status: false})
            }
        }
        
    }
    catch(err){
        console.error(err)
    }
}