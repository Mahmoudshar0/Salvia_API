const AboutUs = require('../models/aboutUs.model');

exports.getPage = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs({
        sections: [
          { name: 'Our History', details: 'A brief overview of our company’s journey...' },
          { name: 'Our Mission', details: 'Dedicated to delivering excellence and innovation...' },
          { name: 'Our Team', details: 'A talented group driving our success...' },
          { name: 'Our Values', details: 'Guided by integrity and quality...' }
        ]
      });
      await about.save();
      console.log('Created default About Us document');
    }
    res.status(200).json({ pageTitle: about.pageTitle, intro: about.intro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const { pageTitle, intro } = req.body;
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs({ pageTitle, intro });
    } else {
      about.pageTitle = pageTitle || about.pageTitle;
      about.intro = intro || about.intro;
    }
    await about.save();
    res.status(200).json({ message: 'Page updated successfully', pageTitle: about.pageTitle, intro: about.intro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const about = await AboutUs.findOne();
    if (!about || !about.sections || about.sections.length === 0) {
      return res.status(200).json({ sections: [] });
    }
    res.status(200).json({ sections: about.sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    console.log(req.body.sectionId);
    const { sectionName, newDetails, sectionId } = req.body;
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs({
        sections: [
          { name: 'Our History', details: 'Default history details...' },
          { name: 'Our Mission', details: 'Default mission details...' },
          { name: 'Our Team', details: 'Default team details...' },
          { name: 'Our Values', details: 'Default values details...' }
        ]
      });
      await about.save();
      console.log('Created default About Us document with default sections');
    }
    console.log(about.sections[0]._id);
    const section = about.sections.find(sec => sec._id == sectionId);
    console.log(section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    section.details = newDetails || section.details;
    section.name = sectionName || section.name;
    await about.save();
    res.status(200).json({ message: 'Section updated successfully', sections: about.sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};