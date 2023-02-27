import * as adminService from "../services/admin";

export const getUsers = async (req, res) => {
    try {
        const response = await adminService.getUsersService();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.query
    try {
        const response = await adminService.deleteUserService(id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}


export const getPosts = async (req, res) => {
    try {
        const response = await adminService.getPostsService();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}

export const approvePost = async (req, res) => {
    try {
        const { postId } = req.query
        const response = await adminService.approvePostService(postId);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}

export const createBlog = async (req, res) => {
    try {
        const { id } = req.user
        const response = await adminService.createBlogService(req.body, id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const response = await adminService.updateBlogService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.query
    try {
        const response = await adminService.deleteBlogService(id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at admin controller' + error
        })
    }
}
