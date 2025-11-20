const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    pageTitle: { type: String, required: true, default: "Let's Work Together" },
    description: {
      type: String,
      required: true,
      default:
        "At Salvia, we're always ready to connect with distributors, importers, and manufacturers worldwide. Reach out today and let's grow together.",
    },
    address: { type: String, required: true, default: "Fayoum, Egypt" },
    phone: { type: String, required: true, default: "01211901946" },
    email: { type: String, required: true, default: "info@Salvianaturals.com" },
    inquiries: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
