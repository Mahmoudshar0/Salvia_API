const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const { upload } = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/", certificateController.getCertificates);
router.get("/:id", certificateController.getCertificateById);
router.post(
  "/",
  auth,
  upload.single("image"),
  certificateController.createCertificate
);
router.put(
  "/:id",
  auth,
  upload.single("image"),
  certificateController.updateCertificate
);
router.delete("/:id", auth, certificateController.deleteCertificate);

module.exports = router;
