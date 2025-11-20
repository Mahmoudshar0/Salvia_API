const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");

const upload = multer({ dest: "uploads/" });
const MODEL_API_URL = process.env.MODEL_API_URL || "https://say-app.fly.dev";

router.post("/", upload.single("voice_file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const formData = new FormData();
    formData.append("voice_file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const headers = formData.getHeaders();

    const response = await fetch(MODEL_API_URL + "/audio", {
      method: "POST",
      body: formData,
      headers,
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        `Model API responded with status ${response.status}: ${text}`
      );
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = router;
