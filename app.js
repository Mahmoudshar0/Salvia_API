require('dotenv').config();
const express = require('express');
const app = express();
const productRouter = require('./routes/products.route');
const adminRouter = require('./routes/admin.route');
const eventRouter = require('./routes/events.route');
const rndRouter = require('./routes/rnd.route'); 
const ourQualityCommitmentRouter = require('./routes/ourQualityCommitment.route')
const certificateRouter = require('./routes/certificate.route')
const aboutUsRouter = require('./routes/aboutUs.route')
const contactUsRouter = require('./routes/contactUs.route')
const siteShowcaseRouter = require('./routes/siteShowcase.route');
const siteShowcaseTwoRouter = require('./routes/siteShowcaseTwo.route');
const pageTitleRouter = require('./routes/pageTitle.route');
const connectDB = require('./Config/db');

app.use(express.json());

const connect = async () => {
    try {
        await connectDB();
        console.log("Database Connected Successfully ✔");
    } catch (error) {
        console.error("Can't connect to database ❌");
        console.error(error.message);
    }
};
connect();

app.use('/api/products', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/events', eventRouter);
app.use('/api/page-title', pageTitleRouter);
app.use('/api/rnd', rndRouter);
app.use('/api/our-quality-commitment', ourQualityCommitmentRouter);
app.use('/api/about-us', aboutUsRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/contact-us', contactUsRouter);
app.use('/api/site-showcase', siteShowcaseRouter);
app.use('/api/site-showcase-two', siteShowcaseTwoRouter);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});