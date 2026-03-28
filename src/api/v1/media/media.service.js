const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = require("../../../integrations/aws/s3.client");
const config = require("../../../config/config");
const ApiError = require("../../../utils/apiError");
const { buildMediaKey } = require("../../../utils/buildMediaKey");
const mediaRepository = require("./media.repository");
const { ObjectId } = require("mongodb");
const { generateMediaUrl } = require("../../../utils/urlGenerator");

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
        visibility: "private",
        createdAt: now,
        updatedAt: now,
    };

    const mediaId = await mediaRepository.createMedia(mediaDoc);

    return mediaDoc;
}

exports.getUserMedias = async({ userId }) => {
    const medias = await mediaRepository.findUserMediasByUserId(userId);

    await Promise.all(
        medias.map(async(media) => {
            media.url = await generateMediaUrl(media.key);
        })
    );

    return medias;
};

exports.getPrivateMedia = async({ userId, mediaId }) => {
    
    const media = await mediaRepository.findPrivateMediaById(userId, mediaId);

    if(!media){
        throw new ApiError(404, "MEDIA_NOT_FOUND", "Media not found");
    }

    return media;
}

exports.getPublicMedia = async({ mediaId }) => {
    const media = await mediaRepository.findPublicMediaById(mediaId);

    if(!media){
        throw new ApiError(404, "MEDIA_NOT_FOUND", "Media not found");
    }

    if(media.visibility === "private"){
        throw new ApiError(403, "MEDIA_NOT_PUBLIC", "Media is not public");
    }

    const url = await generateMediaUrl(media.key);

    const mediaData = {
        _id: media._id.toString(),
        url: url
    }

    return mediaData;
}

exports.updateMetadata = async({ userId, mediaId, metadataObject }) => {

    const convertedArray = Object.entries(metadataObject);

    const newMetadata = {}

    convertedArray.forEach(([key, value]) => {
        if(value){
            newMetadata[key] = value;
        }
    });

    const updatedMedia = await mediaRepository.updateMetadata(userId, mediaId, newMetadata);

    if(!updatedMedia){
        throw new ApiError(404, "MEDIA_NOT_FOUND", "Media not found");
    }

    return newMetadata;
}