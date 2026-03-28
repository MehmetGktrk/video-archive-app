const { getDB } = require("../../../database/connection");
const { ObjectId } = require("mongodb");

exports.createMedia = async(mediaData) => {
    const db = getDB();
    const result = await db.collection("media").insertOne(mediaData);
    return result.insertedId;
}

exports.findUserMediasByUserId = async(userId) => {
    const db = getDB();
    return db.collection("media").find({ ownerId: new ObjectId(userId) }).toArray();
} 

exports.findPrivateMediaById = async(userId, mediaId) => {
    const db = getDB();
    return db.collection("media").findOne({ ownerId: new ObjectId(userId), _id: new ObjectId(mediaId) });
}

exports.findPublicMediaById = async(mediaId) => {
    const db = getDB();
    return db.collection("media").findOne({ _id: new ObjectId(mediaId), visibility: "public" });
}

exports.updateMetadata = async(userId, mediaId, newMetadata) => {
    const db = getDB();
    const result = await db.collection("media").updateOne(
        { _id: new ObjectId(mediaId), ownerId: new ObjectId(userId) },
        { $set: { ...newMetadata, updatedAt: new Date() } }
    );
    return result.modifiedCount;
}