import Role from './models/Role.js'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {validationResult} from "express-validator"
import secret from "./config.js"

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try{
            console.log("stepOne!");
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'user'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.json("Пользователь был успешно зарегистрирован")
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration Error'})
        }

    }
    async login(req, res) {
        try{
            const {username, password} = req.body
            const user = await  User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: "Введеён не верный пароль"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Login Error'})
        }

    }
    async getUser(req, res) {
        try{
            const users = await User.find()
            res.json(users)
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Get users Error'})
        }

    }
}

export default new authController()
