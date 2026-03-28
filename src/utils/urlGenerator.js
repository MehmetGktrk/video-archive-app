const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = require("../integrations/aws/s3.client");
const config = require("../config/config");

async function generateMediaUrl(key, expiresIn = null) {
    const expires = Number(expiresIn || config.defaultS3ViewExpires);

    const command = new GetObjectCommand({
        Bucket: config.awsBucketName,
        Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn: expires });
}

module.exports = {
    generateMediaUrl,
};
