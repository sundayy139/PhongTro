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

export const getCodePrice = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumberPrice(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortArr = arr.sort()

        return ({
            ...item,
            min: sortArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortArr.indexOf(arrMaxMin[0]) === 1 ? 9999 : arrMaxMin[1],
        })
    })
}

export const getCodeArea = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumberAcreage(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortArr = arr.sort()

        return ({
            ...item,
            min: sortArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortArr.indexOf(arrMaxMin[0]) === 1 ? 9999 : arrMaxMin[1],
        })
    })
}


export const getRangePrice = (arrMaxMin, prices) => {
    const pricesWithMinMax = getCodePrice(prices)
    return pricesWithMinMax.filter(item => ((item.min >= arrMaxMin[0] && item.min <= arrMaxMin[1]) || (item.max >= arrMaxMin[0] && item.max <= arrMaxMin[1])))
}

export const getRangeAcreage = (arrMaxMin, acreages) => {
    const acreagesWithMinMax = getCodeArea(acreages)
    return acreagesWithMinMax.filter(item => ((item.min >= arrMaxMin[0] && item.min <= arrMaxMin[1]) || (item.max >= arrMaxMin[0] && item.max <= arrMaxMin[1])))
}

export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};