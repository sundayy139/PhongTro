import db from "../models/index";


// GET ALL PRICES
export const getProvincesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const provinces = await db.Province.findAll({
                raw: true,
                attributes: ['code', 'value']
            })
            resolve({
                err: provinces ? 0 : 1,
                msg: provinces ? "Thành công" : "Không lấy được danh mục",
                provinces
            })
        } catch (e) {
            reject(e);
        }
    })
}
