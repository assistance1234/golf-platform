import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  value: { type: Number, min: 1, max: 45 },
  date: { type: Date, required: true }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  subscription: {
    type: String,
    enum: ["monthly", "yearly", "none"],
    default: "none"
  },

  charity: {
    type: String,
    default: "default-charity"
  },

  scores: [scoreSchema]
}, { timestamps: true });

export default mongoose.model("User", userSchema);