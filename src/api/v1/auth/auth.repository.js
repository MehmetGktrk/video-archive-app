const { getDB } = require("../../../database/connection");

exports.checkUserExists = async(email, nickname) => {
    const db = getDB();

    return db.collection("users").findOne({ $or: [{ email: email }, { nickname: nickname }] });
}

exports.findUserByEmail = async(email) => {
    const db = getDB();

    return db.collection("users").findOne({ email: email });
}

exports.createUser = async(userData) => {
    const db = getDB();
    
    const result = await db.collection("users").insertOne(userData);
    return result.insertedId;
}