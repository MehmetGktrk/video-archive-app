require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
    port: process.env.PORT,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,

    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_BUCKET_NAME,



   
}