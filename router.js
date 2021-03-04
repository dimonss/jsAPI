import Router from "express"
import PostControllers from "./PostControllers.js";

const router = new Router()

router.post('/posts', PostControllers.create)
router.get('/posts', PostControllers.getAll)
router.get('/posts/:id', PostControllers.getOne)
router.put('/posts', PostControllers.update)
router.delete('/posts/:id', PostControllers.delete)

export default router