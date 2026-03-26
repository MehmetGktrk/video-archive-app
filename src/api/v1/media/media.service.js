const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = require("../../../integrations/aws/s3.client");
const config = require("../../../config/config");
const ApiError = require("../../../utils/apiError");
const { buildMediaKey } = require("../../../utils/buildMediaKey");
const mediaRepository = require("./media.repository");
const { ObjectId } = require("mongodb");

exports.createUploadUrl = async({ userId, contentType }) => {

    const key = buildMediaKey(userId);
    const expiresIn = Number(config.awsS3PresignedExpires);

    const command = new PutObjectCommand({
        Bucket: config.awsBucketName,
        Key: key,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });

    return {
        uploadUrl,
        key,
        expiresIn,
    };
}

exports.completeUpload = async({ userId, title, keywords, description, key, contentType, size }) => {

    const now = new Date();

    const mediaDoc = {
        ownerId: new ObjectId(userId),
        title: title,
        keywords: keywords,
        description: description,
        bucket: config.awsBucketName,
        key: key,
        contentType: contentType,
        size: Number(size),
        status: "uploaded",
        createdAt: now,
        updatedAt: now,
    };

    const mediaId = await mediaRepository.createMedia(mediaDoc);

    console.log(mediaId);
    console.log("--------------------------------");
    console.log(mediaDoc);

    return mediaDoc;
}