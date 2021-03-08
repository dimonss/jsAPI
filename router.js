import Router from "express"
import PostControllers from "./PostControllers.js"
import authController from "./authController.js"
import {check} from "express-validator"
// import authMiddleweare from "./middleware/authMiddleweare.js";
import roleMiddleware from "./middleware/roleMiddleware.js"

const router = new Router()

router.post('/posts', PostControllers.create)
router.get('/posts', PostControllers.getAll)
router.get('/posts/:id', PostControllers.getOne)
router.put('/posts', PostControllers.update)
router.delete('/posts/:id', PostControllers.delete)

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', 'Пароль должен быть не меньше 6-ти и не больше 10-ти символов').isLength({min: 6, max: 10})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['admin']), authController.getUser)

export default router