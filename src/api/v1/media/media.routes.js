const express = require("express");
const router = express.Router();

const mediaController = require("./media.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");

router.post("/upload-url", authMiddleware, mediaController.createUploadUrl);
router.post("/complete", authMiddleware, mediaController.completeUpload);

module.exports = router;
