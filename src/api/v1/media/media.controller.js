const mediaService = require("./media.service");

exports.createUploadUrl = async(req, res, next) => {
    try {
        const { contentType} = req.body;
        const result = await mediaService.createUploadUrl({
            userId: req.user.id,
            contentType: contentType
        });

        return res.status(200).json({
            success: true,
            message: "Upload URL generated successfully",
            data: result,
        })
    } catch (err) {
        return next(err);
    }
}

exports.completeUpload = async(req, res, next) => {
    try {
        const { title, keywords, description, key, contentType, size } = req.body;
        const result = await mediaService.completeUpload({
            userId: req.user.id,
            title: title,
            keywords: keywords,
            description: description,
            key: key,
            contentType: contentType,
            size: size,
        });

        return res.status(201).json({
            success: true,
            message: "Media uploaded successfully",
            data: result,
        })
    } catch (err) {
        return next(err);
    }
}

exports.getUserMedias = async(req, res, next) => {
    try {
        const result = await mediaService.getUserMedias({
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "User medias fetched successfully",
            data: result,
        })
    } catch (err) {
        return next(err);
    }
}

exports.getPrivateMedia = async(req, res, next) => {
    try {
        const { mediaId } = req.params;
        const result = await mediaService.getPrivateMedia({
            userId: req.user.id,
            mediaId: mediaId
        });

        return res.status(200).json({
            success: true,
            message: "Media fetched successfully",
            data: result
        })
    } catch (err) {
        return next(err);
    }
}

exports.getPublicMedia = async(req, res, next) => {
    try {
        const mediaId = req.params.mediaId;
        const result = await mediaService.getPublicMedia({
            mediaId: mediaId
        });

        return res.status(200).json({
            success: true,
            message: "Media fetched successfully",
            data: result,
        });
    } catch (err) {
        return next(err);
    }
}

exports.updateMetadata = async(req, res, next) => {
    try {
        const { mediaId } = req.params;
        const { title, keywords, description } = req.body;
        const result = await mediaService.updateMetadata({
            userId: req.user.id,
            mediaId: mediaId,
            metadataObject: { title, keywords, description }
        });

        return res.status(200).json({
            success: true,
            message: "Media metadata updated successfully",
            data: result,
        });
    } catch (err) {
        return next(err);
    }
}