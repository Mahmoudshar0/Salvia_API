const Rnd = require('../models/rnd.model');

exports.getPage = async (req, res) => {
  try {
    const rnd = await Rnd.findOne();
    if (!rnd) {
      const newRnd = new Rnd({
        sections: [
          { name: 'Innovation in Agriculture', details: 'Default details for Innovation in Agriculture...' },
          { name: 'Product Development', details: 'Default details for Product Development...' },
          { name: 'Quality & Safety Research', details: 'Default details for Quality & Safety Research...' },
          { name: 'Packaging & Shelf-Life Studies', details: 'Default details for Packaging & Shelf-Life Studies...' },
          { name: 'Pyrrolizidine Alkaloids (PAs) & PAHs', details: 'Default details for PAs & PAHs...' },
          { name: 'Packaging & Integrity', details: 'Default details for Packaging & Integrity...' },
          { name: 'Commitment to Progress', details: 'Default details for Commitment to Progress...' }
        ]
      });
      await newRnd.save();
      return res.status(200).json({ pageTitle: newRnd.pageTitle, intro: newRnd.intro });
    }
    res.status(200).json({ pageTitle: rnd.pageTitle, intro: rnd.intro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { pageTitle, intro } = req.body;
    let rnd = await Rnd.findOne();
    if (!rnd) {
      rnd = new Rnd({ pageTitle, intro });
    } else {
      rnd.pageTitle = pageTitle || rnd.pageTitle;
      rnd.intro = intro || rnd.intro;
    }
    await rnd.save();
    res.status(200).json({ message: 'Page updated successfully', pageTitle: rnd.pageTitle, intro: rnd.intro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const rnd = await Rnd.findOne();
    if (!rnd || !rnd.sections || rnd.sections.length === 0) {
      return res.status(200).json({ sections: [] });
    }
    res.status(200).json({ sections: rnd.sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, newDetails, sectionId } = req.body;
    let rnd = await Rnd.findOne();
    if (!rnd) {
      return res.status(404).json({ message: 'R&D not found' });
    }
    const section = rnd.sections.find(sec => sec._id == sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    section.details = newDetails || section.details;
    section.name = sectionName || section.name;
    await rnd.save();
    res.status(200).json({ message: 'Section updated successfully', sections: rnd.sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};