const { getDB } = require("../../../database/connection");

exports.createMedia = async(mediaData) => {
    const db = getDB();
    const result = await db.collection("media").insertOne(mediaData);
    return result.insertedId;
}
