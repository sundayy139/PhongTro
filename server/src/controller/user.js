import * as userService from "../services/user";

export const getCurrentUser = async (req, res) => {
    const { id } = req.user
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing required parameters'
            })
        } else {
            const response = await userService.getUserService(id)
            return res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}
