import * as postService from "../services/post";

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, acreageNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, acreageNumber });
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostsService();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const getPostById = async (req, res) => {
    const { postId } = req.query
    try {
        const response = await postService.getPostByIdService(postId);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { id } = req.user
        const response = await postService.createNewPostService(req.body, id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const getPostsUser = async (req, res) => {
    try {
        const { id } = req.user
        const response = await postService.getPostsUserService(id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.user
        const response = await postService.updatePostService(req.body, id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.user
        const { postId } = req.query
        const response = await postService.deletePostService(postId, id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}

export const updateStatusPost = async (req, res) => {
    try {
        const { id } = req.user
        const { postId } = req.query
        const response = await postService.updateStatusPostService(postId, id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at post controller' + error
        })
    }
}


