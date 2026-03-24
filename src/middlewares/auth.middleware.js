const ApiError = require("../utils/apiError");
const { verifyToken, verifyAccessToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return next(
            new ApiError(401, "AUTH_REQUIRED", "Authentication required")
        );
    }

    const token = authHeader.split(" ")[1];

    try {

        req.user = verifyAccessToken(token)
        next()

    } catch (err) {
        return next(
            new ApiError(401, "INVALID_TOKEN", "Invalid or expired token")
        );
    }
}

module.exports = authMiddleware;