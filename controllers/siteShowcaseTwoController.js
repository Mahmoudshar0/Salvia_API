const SiteShowcaseTwo = require('../models/siteShowcaseTwo.model');
const { upload, cloudinary } = require('../middleware/upload');

exports.getShowcaseTwo = async (req, res) => {
  try {
    let showcase = await SiteShowcaseTwo.findOne();
    if (!showcase) {
      showcase = new SiteShowcaseTwo();
      await showcase.save();
      console.log('Created default Site Showcase Two document');
    }
    res.status(200).json({ pageTitle: showcase.pageTitle, description: showcase.description, mainImageUrl: showcase.mainImageUrl, active: showcase.active });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateShowcaseTwo = async (req, res) => {
  try {
    let showcase = await SiteShowcaseTwo.findOne();
    if (!showcase) {
      showcase = new SiteShowcaseTwo();
    }

    // جلب البيانات من form-data
    const pageTitle = req.body.pageTitle || showcase.pageTitle;
    const description = req.body.description || showcase.description;
    const active = req.body.active !== undefined ? JSON.parse(req.body.active) : showcase.active; // تحويل string لـ boolean

    // معالجة الصورة إذا موجودة
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'site_showcase_two', transformation: [{ width: 800, height: 400, crop: 'fill' }] },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        uploadStream.end(req.file.buffer); // أرسل البيانات
      });
      showcase.mainImageUrl = await uploadPromise; // انتظر الرفع
    } else {
      showcase.mainImageUrl = showcase.mainImageUrl; // يبقى زي ما هو لو مفيش صورة جديدة
    }

    // تحديث البيانات
    showcase.pageTitle = pageTitle;
    showcase.description = description;
    showcase.active = active;

    await showcase.save();
    res.status(200).json({ message: 'Showcase Two updated successfully', pageTitle: showcase.pageTitle, description: showcase.description, mainImageUrl: showcase.mainImageUrl, active: showcase.active });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};