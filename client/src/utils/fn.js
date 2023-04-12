export const isVietnamesePhoneNumber = (number) => {
    return /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(number);
}

export const formatVietnameseToString = (string) => {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\s+/g, '-')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

export const getNumberPrice = (string) => {
    let arr = string.split(' ')
    return arr.map(item => +item).filter(item => !item === false)
}


export const getNumberAcreage = (string) => {
    let arr = string.split(' ')
    return arr.map(item => +item.match(/\d+/)).filter(item => !+item === false)
}

export const getCodeArr = (totals, type, min, max) => {
    return totals.map(item => {
        let arrMaxMin = type === 'price' ? getNumberPrice(item.value) : getNumberAcreage(item.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 9999999999 : arrMaxMin[0]
        })
    })
}


export const getCode = (entry, arr, type, min, max) => {
    const minMax = getCodeArr(arr, type, min, max)
    return minMax.filter(item => (item.min <= entry && item.max > entry))
}


export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const getNumberFromString = (string) => {
    var numb = string?.match(/\d/g);
    numb = numb?.join("");
    return numb?.slice(0, 6)
};

export const formatNumber = (number) => {
    // format number 1000000 to 1,234,567
    return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const validate = (payload, setInvalidFileds) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach(item => {
        if (item[1] === '' || item[1] === undefined) {
            setInvalidFileds(prev => [...prev, {
                name: item[0],
                message: 'Bạn không được để trống trường này'
            }])
            invalids++
        }
    })
    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 8) {
                    setInvalidFileds(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải tối thiểu 8 kí tự '
                    }])
                    invalids++
                }
                break;
            case 'newPassword':
                if (item[1].length < 8) {
                    setInvalidFileds(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải tối thiểu 8 kí tự '
                    }])
                    invalids++
                }
                break;
            case 'confirmPassword':
                if (item[1].length < 8) {
                    setInvalidFileds(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải tối thiểu 8 kí tự '
                    }])
                    invalids++
                }
                break;
            case 'phone':
                let checkPhone = isVietnamesePhoneNumber(item[1])
                if (checkPhone === false) {
                    setInvalidFileds(prev => [...prev, {
                        name: item[0],
                        message: 'Số điện thoại không tồn tại'
                    }])
                    invalids++
                }
                break;
            case 'email':
                let checkEmail = validateEmail(item[1])
                if (checkEmail === false) {
                    setInvalidFileds(prev => [...prev, {
                        name: item[0],
                        message: 'Email không tồn tại'
                    }])
                    invalids++
                }
                break;
            default:
                break;
        }
    })
    return invalids
}

export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

export const convertToText = (number) => {
    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const scales = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'];

    if (isNaN(number)) {
        return '';
    }

    if (number === 0) {
        return 'Không đồng';
    }

    if (number < 0) {
        return 'Số tiền âm';
    }

    let result = '';
    let scaleIndex = 0;

    while (number > 0) {
        const threeDigits = number % 1000;
        const onesText = ones[threeDigits % 10];
        const tensText = tens[Math.floor(threeDigits / 10) % 10];
        const hundredsText = ones[Math.floor(threeDigits / 100)];

        let scaleText = '';
        if (threeDigits !== 0) {
            scaleText = scales[scaleIndex];
            if (scaleIndex > 0) {
                scaleText += ' ';
            }
        }

        let currentText = '';
        if (hundredsText) {
            currentText += hundredsText + ' trăm ';
        }

        if (tensText === 'mười' && onesText !== '') {
            currentText += 'mười ';
        } else {
            currentText += tensText;
            if (tensText && onesText) {
                currentText += ' ';
            }
            if (onesText !== '' && tensText !== 'mười') {
                currentText += onesText;
            }
        }

        if (currentText !== '') {
            result = currentText + scaleText + result;
        }

        scaleIndex++;
        number = Math.floor(number / 1000);
    }

    return result.trim() + ' đồng';
}

export const formatMoney = (value) => {
    value = value.replace(/\D/g, ''); // loại bỏ tất cả các ký tự không phải là số
    value = value.replace(/^0+/, ''); // loại bỏ các số 0 đứng đầu tiên
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // thêm dấu . phân cách giữa các nghìn

    return value
}