const ApiError = require("../../../utils/apiError");
const authRepository = require("./auth.repository");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../../utils/jwt");

exports.registerUser = async(nickname, email, password) => {

    const existingUser = await authRepository.checkUserExists(email, nickname);

    if(existingUser && existingUser.email == email){
        throw new ApiError(400, "EMAIL_ALREADY_EXISTS", "Email already exists");
    }
    else if(existingUser && existingUser.nickname == nickname){
        throw new ApiError(400, "NICKNAME_ALREADY_EXISTS", "Nickname already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        nickname: nickname,
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const result = await authRepository.createUser(user);
    return result;
}


exports.loginUser = async(email, password) => {
    
    const user = await authRepository.findUserByEmail(email);

    if(!user){
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const jwtPayload = {
        id: user._id,
        nickname: user.nickname,
        email: user.email,
    }

    const accessToken = generateAccessToken(jwtPayload);

    return {
        id: user._id,
        nickname: user.nickname,
        email: user.email,
        accessToken: accessToken,
    }
}