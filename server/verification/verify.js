import Jwt from 'jsonwebtoken'

export const verifyTokenEmail = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.send('your are not autherized from me!')
    Jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`,(err,payload)=>{
        if(err) return res.send("token not valid")
        req.email = payload.email
        next()
    })
}
export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.send('your are not autherized from me!')
    Jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`,(err,payload)=>{
        if(err) return res.send('token not valid')
        next()
    })
}