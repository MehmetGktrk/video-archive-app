const mediaService = require("./media.service");

exports.createUploadUrl = async(req, res, next) => {
    try {
        const { contentType, size } = req.body;
        const result = await mediaService.createUploadUrl({
            userId: req.user.id,
            contentType: contentType,
            size: size,
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
        const { key, contentType, size } = req.body;
        const result = await mediaService.completeUpload({
            userId: req.user.id,
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
