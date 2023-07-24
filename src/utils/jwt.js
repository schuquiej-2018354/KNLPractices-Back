'use strict'

const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
    try {
        let payload = {
            sub: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            username: user.username,
            phone: user.phone,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 120)
        }
        return jwt.sign(payload, `$(procces.env.SECRET_KEY)`);
    } catch (e) {
        console.error(e);
        return e;
    }
}