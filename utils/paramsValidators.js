/**
 *  Validate params.
 * */
async function paramsValidators (data,validators) {
    let flag = true
    for(let cont = 0; cont < validators.length; cont++){
        if(!data[validators[cont]]){
            flag = false
        }
    }
    return flag
}

module.exports = paramsValidators