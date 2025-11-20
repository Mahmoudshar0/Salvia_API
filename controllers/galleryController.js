const Gallery = require("../models/gallery.model");
const { cloudinary } = require("../middleware/upload");

exports.createImage = async (req, res) => {
  console.log("uploading image");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const imageUrl = await uploadPromise;

    const newImage = new Gallery({
      image: imageUrl,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete old image from Cloudinary
    if (galleryItem.image) {
      const publicId = galleryItem.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new image
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const imageUrl = await uploadPromise;

    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete image from Cloudinary
    if (galleryItem.image) {
      const publicId = galleryItem.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
