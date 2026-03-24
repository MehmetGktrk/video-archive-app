const jwt = require("jsonwebtoken");
const config = require("../config/config");

function generateAccessToken(payload) {
    const token = jwt.sign(
        payload,
        config.jwtAccessSecret,
        { expiresIn: config.jwtAccessExpiration }
    );

    return token;
}

function verifyAccessToken(token) {
    const decoded = jwt.verify(token, config.jwtAccessSecret);
    return decoded;
}


module.exports = {
    generateAccessToken,
    verifyAccessToken,
}