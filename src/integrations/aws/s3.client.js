const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../../config/config");

if(!config.awsRegion){
    throw new Error("AWS Region is not configured");
}

if(!config.awsBucketName){
    throw new Error("AWS Bucket Name is not configured");
}

const s3Client = new S3Client({
    region: config.awsRegion,
    credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
    },
});

module.exports = s3Client;