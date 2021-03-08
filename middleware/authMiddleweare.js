import jwt from "jsonwebtoken"
import secret from "../config.js"

const authMiddleweare = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        const decodeData = jwt.verify(token, secret)
        req.user = decodeData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}

export default authMiddleweare
