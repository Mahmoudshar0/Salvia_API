const OurQualityCommitment = require("../models/ourQualityCommitment.model");

exports.getPage = async (req, res) => {
  try {
    const quality = await OurQualityCommitment.findOne();
    if (!quality) {
      const newQuality = new OurQualityCommitment({
        sections: [
          {
            name: "Quality Standards",
            details: "Ensuring top-tier quality standards...",
          },
          {
            name: "Testing Procedures",
            details: "Rigorous testing for safety...",
          },
          {
            name: "Certification Compliance",
            details: "Meeting global certifications...",
          },
          {
            name: "Product Integrity",
            details: "Maintaining product integrity...",
          },
          {
            name: "Safety Research",
            details: "Researching safety protocols...",
          },
          {
            name: "Quality Assurance",
            details: "Continuous quality improvement...",
          },
          {
            name: "Customer Trust",
            details: "Building trust through quality...",
          },
        ],
      });
      await newQuality.save();
      return res
        .status(200)
        .json({
          pageTitle: newQuality.pageTitle,
          intro: newQuality.intro,
          finalTitle: newQuality.finalTitle,
        });
    }
    res
      .status(200)
      .json({
        pageTitle: quality.pageTitle,
        intro: quality.intro,
        finalTitle: quality.finalTitle,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { pageTitle, intro, finalTitle } = req.body;
    let quality = await OurQualityCommitment.findOne();
    if (!quality) {
      quality = new OurQualityCommitment({ pageTitle, intro, finalTitle });
    } else {
      quality.pageTitle = pageTitle || quality.pageTitle;
      quality.intro = intro || quality.intro;
      quality.finalTitle = finalTitle || quality.finalTitle;
    }
    await quality.save();
    res
      .status(200)
      .json({
        message: "Page updated successfully",
        pageTitle: quality.pageTitle,
        intro: quality.intro,
        finalTitle: quality.finalTitle,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const quality = await OurQualityCommitment.findOne();
    if (!quality || !quality.sections || quality.sections.length === 0) {
      return res.status(200).json({ sections: [] });
    }
    res.status(200).json({ sections: quality.sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // Accept either the old payload shape ({ sectionName, newDetails, sectionId })
    // or the newer one used by the admin UI ({ name, details, sectionId }).
    const { sectionName, newDetails, sectionId, name, details } = req.body;

    // Normalize incoming values
    const updatedName = sectionName || name;
    const updatedDetails = newDetails || details;

    if (!sectionId) {
      return res.status(400).json({ message: "sectionId is required" });
    }

    let quality = await OurQualityCommitment.findOne();
    if (!quality) {
      return res
        .status(404)
        .json({ message: "Our Quality Commitment not found" });
    }

    const section = quality.sections.find(
      (sec) => String(sec._id) === String(sectionId)
    );
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Only update when provided, otherwise keep existing values
    if (typeof updatedDetails !== "undefined" && updatedDetails !== null) {
      section.details = updatedDetails;
    }
    if (typeof updatedName !== "undefined" && updatedName !== null) {
      section.name = updatedName;
    }

    await quality.save();
    res
      .status(200)
      .json({
        message: "Section updated successfully",
        sections: quality.sections,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
