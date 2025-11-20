const Certificate = require("../models/certificate.model");
const { cloudinary } = require("../middleware/upload");

if (!Certificate) {
  console.error(
    "Certificate model is not defined. Check the model file or import."
  );
  throw new Error("Certificate model initialization failed");
}

exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    if (!certificates || certificates.length === 0) {
      return res.status(200).json({ certificates: [] });
    }
    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCertificate = async (req, res) => {
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
    const { certificateBody, certificateNumber, expiryDate } = req.body;

    const date = new Date(expiryDate);
    if (isNaN(date.getTime())) {
      return res
        .status(400)
        .json({
          message:
            "Invalid expiryDate format. Use YYYY-MM-DD (e.g., 2026-10-03)",
        });
    }

    const certificate = new Certificate({
      certificateBody,
      certificateNumber,
      expiryDate: date,
      image: imageUrl,
    });
    await certificate.save();
    res
      .status(201)
      .json({ message: "Certificate created successfully", certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { certificateBody, certificateNumber, expiryDate } = req.body;
    let date = expiryDate ? new Date(expiryDate) : undefined;

    if (expiryDate && isNaN(date.getTime())) {
      return res
        .status(400)
        .json({
          message:
            "Invalid expiryDate format. Use YYYY-MM-DD (e.g., 2027-10-03)",
        });
    }

    if (req.file) {
      const certificate = await Certificate.findById(id);
      if (certificate && certificate.image) {
        const publicId = certificate.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
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
      const updatedCertificate = await Certificate.findByIdAndUpdate(
        id,
        {
          certificateBody,
          certificateNumber,
          expiryDate: date,
          image: imageUrl,
        },
        { new: true, runValidators: true }
      );
      if (!updatedCertificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res
        .status(200)
        .json({
          message: "Certificate updated successfully",
          certificate: updatedCertificate,
        });
    } else {
      const updatedCertificate = await Certificate.findByIdAndUpdate(
        id,
        { certificateBody, certificateNumber, expiryDate: date },
        { new: true, runValidators: true }
      );
      if (!updatedCertificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res
        .status(200)
        .json({
          message: "Certificate updated successfully",
          certificate: updatedCertificate,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    if (certificate.image) {
      const publicId = certificate.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Certificate.findByIdAndDelete(id);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
