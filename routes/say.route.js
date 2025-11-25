const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { FormData, File } = require("formdata-node");

const MODEL_API_URL = "https://say-app.fly.dev";

// Home route
router.get("/", (req, res) => {
  res.json({
    message: "Say App API - Backend middleware for Say App AI models",
  });
});

router.post("/audio", upload.single("voice_file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    // ✅ FormData بالطريقة اللي FastAPI يفهمها
    const formData = new FormData();
    
    // Create a File object from the buffer (since we are using memory storage)
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    
    formData.set("voice_file", file);

    // ✅ إرسال الملف مباشرة للموديل
    const response = await fetch(MODEL_API_URL + "/audio", {
      method: "POST",
      body: formData,
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
  }
});

module.exports = router;
