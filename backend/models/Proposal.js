import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    vehicle: {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["car", "truck", "bike","minibus", "bus", "Other"],
        required: true,
      },
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
          },
          message: "Invalid image URL",
        },
      },
      year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1, // future year check
      },
      price: {
        type: Number,
        required: true,
      },
    },

    buyer: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        match: /.+\@.+\..+/,
      },
      phone: {
        type: String,
        required: true,
        match: /^\+?[0-9]{10,15}$/,
      },
      city: {
        type: String,
        required: true,
      },
      preferredContact: {
        type: String,
        enum: ["email", "phone", "whatsapp"],
        default: "email",
      },
      contactTime: {
        type: String,
      },
    },

    offer: {
      budget: {
        type: Number,
        required: true,
      },
      offerAmount: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        default: "",
        trim: true,
      },
      when: {
        type: Date,
        default: Date.now,
      },
    },
    seller: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      }
    }
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
