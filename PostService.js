import Post from "./Post.js";
import FileService from "./fileService.js";

class PostService {
    create(post, picture) {
        const fileName = FileService.saveFile(picture)
        return Post.create({...post, picture: fileName})
    }

    getAll() {
        return Post.find();
    }

    getOne(id) {
        if (!id) {
            throw new Error("id not exist")
        }
        return Post.findById(id);
    }

    async update(post) {
        if (!post._id) {
            throw new Error("id not exist")
        }
        return Post.findByIdAndUpdate(post._id, post, {new: true})
    }

    delete(id) {
        if (!id) {
            throw new Error("id not exist")
        }
        return Post.findByIdAndDelete(id)
    }
}

export default new PostService()
