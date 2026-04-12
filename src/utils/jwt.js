const jwt = require("jsonwebtoken");

function generateAccessToken(user){
    return jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        process.env.ACCESS_SECRET,
        {expiresIn: "5m"}
    );
}

function generateRefreshToken(user){
    return jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        process.env.REFRESH_SECRET,
        {expiresIn: "7d"}
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};