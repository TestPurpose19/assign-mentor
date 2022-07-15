import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

// mentor model
export const Mentor = mongoose.model("Mentor", mentorSchema);

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mentor: { type: mongoose.SchemaTypes.ObjectId, ref: Mentor },
});

// student model
export const Student = mongoose.model("Student", studentSchema);
