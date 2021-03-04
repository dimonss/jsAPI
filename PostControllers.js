import PostServicce from "./PostService.js";

class PostControllers {
    async create(req, res){
        try {
            const post = await PostServicce.create(req.body, req.files.picture)
            res.json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getAll(req, res) {
        try {
            const posts = await PostServicce.getAll();
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getOne(req,res){
                try{
                    const post = await PostServicce.getOne(req.params.id)
                    return res.json(post)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async update(req,res){
        try{
            const updatePost = await PostServicce.update(req.body)
            return res.json(updatePost)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
    async delete(req,res){
        try{
            const post = await PostServicce.delete(req.params.id)
            return res.json(post)
        } catch (e){
            res.status(500).json(e.message)
        }
    }
}

export default  new PostControllers()
