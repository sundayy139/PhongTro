import * as blogService from "../services/blog";


export const getBlogs = async (req, res) => {
    try {
        const { page } = req.query
        const response = await blogService.getBlogsService(page);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at blog controller' + error
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.query
        const response = await blogService.getBlogByIdService(id);
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at blog controller' + error
        })
    }
}
