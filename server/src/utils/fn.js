require('dotenv').config()

const formatString = (str) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\s/g, '');
    str = str.replace(/-/g, '');
    return str;
}

const generateCode = (value) => {
    let output = ''
    value = formatString(value)
    let merge = value + process.env.SECRET_GENERATE

    let length = merge.length
    for (let i = 0; i < 3; i++) {
        let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2)
        output += merge.charAt(index)
        length = index
    }
    return `${value.charAt(2)}${value.charAt(3)}${output}`.toUpperCase()
}

export default generateCode

export const getNumberFromString = (string) => {
    return string.replace(/^\D+/g, '').match(/\d+/)[0]
}