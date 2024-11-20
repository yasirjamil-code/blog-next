import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },

    serviceImage: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const ServiceCardModel =
  mongoose.models.serviceCard || mongoose.model("serviceCard", Schema);

export default ServiceCardModel;
