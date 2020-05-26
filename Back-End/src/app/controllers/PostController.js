import Post from '../models/Post';
import File from '../models/File';

class PostController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const posts = await Post.findAll({
            where: {
                id_user: req.userId
            },
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: File,
                    as: 'file',
                    attributes: ['path', 'url']
                }
            ]
        });

        return res.json(posts);
    }

    async store(req, res) {
        const { id_file, title, description } = req.body;

        const post = await Post.create({
            id_user: req.userId,
            id_file,
            title,
            description
        });

        return res.json(post);
    }
}

export default new PostController;
