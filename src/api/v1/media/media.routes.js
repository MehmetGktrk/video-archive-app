const express = require("express");
const router = express.Router();

const mediaController = require("./media.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

router.post("/upload-url", authMiddleware, mediaController.createUploadUrl);
router.post("/complete", authMiddleware, mediaController.completeUpload);
router.get('/me', authMiddleware, mediaController.getUserMedias);
router.get('/public/:mediaId', mediaController.getPublicMedia);
router.get('/private/:mediaId', authMiddleware, mediaController.getPrivateMedia);
router.patch('/:mediaId', authMiddleware, mediaController.updateMetadata);

module.exports = router;
