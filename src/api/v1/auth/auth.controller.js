const authService = require("./auth.service");

exports.register = async(req, res, next) => {
    try {
        const { nickname, email, password } = req.body;
        const user = await authService.registerUser(nickname, email, password);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (err) {
        return next(err);
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
        })
    } catch (err) {
        return next(err);
    }
}