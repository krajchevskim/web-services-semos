const post = require('../pkg/blog');
const { validate, Post, PostPartial } = require('../pkg/blog/validate');

const getAll = async (req, res) => {
    try {
        const data = await post.getAll(req.user.id);
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const getSingle = async (req, res) => {
    try {
        const data = post.getSingle(req.user.id, req.params.id);
        if(!data) {
            throw {
                code: 404,
                error: 'Post not found!'
            };
        };
        return res.status(200).send(post);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const create = async (req, res) => {
    try {
        await validate(req.body, Post);
        const data = {
            ...req.body,
            user_id: req.user.id
        };
        const newPost = await post.create(data);
        return res.status(200).send(newPost);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const update = async (req, res) => {
    try {
        await validate(req.body, PostPartial);
        const data = {
            ...req.body,
            user_id: req.user.id
        };
        await post.update(req.params.id, data);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};  //think about security

const updatePartial = async (req, res) => {
    try {
        await validate(req.body, Post);
        const data = {
            ...req.body,
            user_id: req.user.id
        };
        const newPost = await post.create(data);
        return res.status(204).send(newPost);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const remove = async (req, res) => {
    try{
        
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    updatePartial,
    remove
};