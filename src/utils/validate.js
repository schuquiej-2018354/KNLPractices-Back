'use strict'

const bcrypt = require('bcrypt');

exports.validateData = (data) => {
    let keys = Object.keys(data), msg = '';
    for (let key of keys) {
        if (data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        msg += `The params ${key} is required\n`
    }
    return msg.trim();
}

exports.encrypt = async (password) => {
    try {
        return  bcrypt.hashSync(password, 10);
    } catch (e) {
        console.error(e);
        return e;
    }
}

exports.checkPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        console.error(e);
        return false;
    }
}

exports.checkUpdate = (data, isUser)=>{
    if(isUser){
        if( data.password == '' ||
            data.password ||
            Object.entries(data).length === 0 || 
            data.role
        ){
            return false;
        }
        return true
    }else{
        if( Object.entries(data).length === 0 || 
            data.user ||
            data.user == ''){
            return false;
        }
        return true
    }
}