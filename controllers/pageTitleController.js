const PageTitle = require('../models/pageTitle.model');

exports.getPageTitle = async (req, res) => {
  try {
    const title = await PageTitle.findOne();
    if (!title) {
      const newTitle = new PageTitle();
      await newTitle.save();
      return res.status(200).json({ eventsPageTitle: 'Events' });
    }
    res.status(200).json({ eventsPageTitle: title.eventsPageTitle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePageTitle = async (req, res) => {
  try {
    console.log(req.body);
    const { eventsPageTitle } = req.body;
    let title = await PageTitle.findOne();
    if (!title) {
      title = new PageTitle({ eventsPageTitle });
      await title.save();
    } else {
      title.eventsPageTitle = eventsPageTitle;
      await title.save();
    }
    res.status(200).json({ message: 'Page title updated successfully', eventsPageTitle: title.eventsPageTitle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};