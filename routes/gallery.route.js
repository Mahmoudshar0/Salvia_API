const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const { upload } = require("../middleware/upload");
const auth = require("../middleware/auth");

router.post("/", auth, upload.single("image"), galleryController.createImage);
router.put("/:id", auth, upload.single("image"), galleryController.updateImage);
router.delete("/:id", auth, galleryController.deleteImage);
router.get("/", galleryController.getAllImages);

module.exports = router;
